import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { catalogAssets } from '@/assets/catalog-assets'
import { getComposerName } from '@/data/composers'
import { getWorkAsset } from '@/data/works'
import { findStation, type Station } from '@/data/stations'
import type { Recording } from '@/models/recording'
import type { Work } from '@/models/work'
import { PlayerContext, type Repeat } from '@/player/player-context'
import { pickRadioSegment, radioMemory, type RadioSegment } from '@/player/radio'
import { loadRecordings } from '@/player/use-recording'

/** The tracks `first` to `last` of a recording: the whole work, or one movement on the radio. */
type Queue = RadioSegment

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [queue, setQueue] = useState<Queue | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(false)
  const [station, setStation] = useState<Station | null>(null)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState<Repeat>('off')
  const [volume, setVolumeState] = useState(1)
  const [muted, setMuted] = useState(false)
  const recentRef = useRef<string[]>([])
  const failuresRef = useRef(0)

  // Start a track imperatively, inside the click that asked for it, so browsers allow playback.
  const start = useCallback((next: Queue, trackIndex: number) => {
    const audio = audioRef.current
    const track = next.recording.tracks[trackIndex]

    if (!audio || !track) {
      return
    }

    audio.src = track.src
    void audio.play().catch(() => setPlaying(false))
    setQueue(next)
    setIndex(trackIndex)
    setTime(0)
    setDuration(0)
    setError(false)
  }, [])

  const play = useCallback(
    (work: Work, recording: Recording, trackIndex = 0) => {
      setStation(null)
      start({ work, recording, first: 0, last: recording.tracks.length - 1 }, trackIndex)
    },
    [start],
  )

  // The next movement on a station. The recordings table is usually warm by now, so this
  // resolves straight away, still within the click that asked for it.
  const tune = useCallback(
    (next: Station) => {
      void loadRecordings().then((recordings) => {
        const segment = pickRadioSegment(next, recordings, recentRef.current)
        if (!segment) {
          return
        }

        recentRef.current = [segment.work.id, ...recentRef.current].slice(0, radioMemory)
        setStation(next)
        start(segment, segment.first)
      })
    },
    [start],
  )

  const toggle = useCallback(() => {
    const audio = audioRef.current

    if (!audio || !queue) {
      return
    }

    if (audio.paused) {
      void audio.play().catch(() => setPlaying(false))
    } else {
      audio.pause()
    }
  }, [queue])

  // Shuffle moves on to a random piece from the current station, or from everything when
  // a single work is playing, which turns the player into the Everything radio.
  const playRandomPiece = useCallback(() => {
    const target = station ?? findStation('everything')
    if (target) {
      tune(target)
    }
  }, [station, tune])

  const next = useCallback(() => {
    if (shuffle) {
      playRandomPiece()
    } else if (queue && index < queue.last) {
      start(queue, index + 1)
    } else if (station) {
      tune(station)
    }
  }, [shuffle, playRandomPiece, queue, index, station, start, tune])

  const toggleShuffle = useCallback(() => {
    setShuffle((on) => !on)
    setRepeat('off')
  }, [])

  const cycleRepeat = useCallback(() => {
    setRepeat((current) => (current === 'off' ? 'work' : current === 'work' ? 'track' : 'off'))
    setShuffle(false)
  }, [])

  const setVolume = useCallback((next: number) => {
    setVolumeState(next)
    setMuted(next === 0)
  }, [])

  const toggleMute = useCallback(() => setMuted((on) => !on), [])

  // Repeat track is the audio element's own loop.
  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.loop = repeat === 'track'
      audio.volume = volume
      audio.muted = muted
    }
  }, [repeat, volume, muted])

  const previous = useCallback(() => {
    const audio = audioRef.current

    if (!audio || !queue) {
      return
    }

    // Like a CD player: back to the start of the track, unless it has only just begun.
    if (audio.currentTime > 3 || index === queue.first) {
      audio.currentTime = 0
    } else {
      start(queue, index - 1)
    }
  }, [queue, index, start])

  const seek = useCallback((seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds
    }
  }, [])

  const close = useCallback(() => {
    const audio = audioRef.current

    if (audio) {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }

    setQueue(null)
    setStation(null)
    setPlaying(false)
  }, [])

  const handleEnded = () => {
    failuresRef.current = 0
    const tracks = queue?.recording.tracks
    // With shuffle on, finish the movement, then move on to a random piece.
    const movementEnds = !queue || !tracks || index >= queue.last || tracks[index + 1].movement !== tracks[index].movement
    if (repeat === 'work' && queue && tracks && index >= queue.last) {
      // On the radio the queue is one movement; repeating carries on through the whole work.
      const whole = { ...queue, first: 0, last: tracks.length - 1 }
      start(whole, index + 1 < tracks.length ? index + 1 : 0)
    } else if (shuffle && movementEnds) {
      playRandomPiece()
    } else if (queue && index < queue.last) {
      start(queue, index + 1)
    } else if (station) {
      tune(station)
    } else {
      setPlaying(false)
    }
  }

  const handleError = () => {
    if (!queue) {
      return
    }

    // The radio skips a broken stream, but gives up rather than loop if the network is down.
    failuresRef.current += 1
    if (station && failuresRef.current < 3) {
      tune(station)
      return
    }

    setError(true)
    setPlaying(false)
  }

  // Lock screen and media keys.
  useEffect(() => {
    if (!('mediaSession' in navigator) || !queue) {
      return
    }

    const track = queue.recording.tracks[index]
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: getComposerName(queue.work.composerId),
      album: queue.work.title,
      artwork: [{ src: new URL(catalogAssets[getWorkAsset(queue.work)], window.location.href).href }],
    })

    const handlers: [MediaSessionAction, MediaSessionActionHandler][] = [
      ['play', toggle],
      ['pause', toggle],
      ['nexttrack', next],
      ['previoustrack', previous],
      ['seekto', (details) => seek(details.seekTime ?? 0)],
    ]
    for (const [action, handler] of handlers) {
      try {
        navigator.mediaSession.setActionHandler(action, handler)
      } catch {
        // Not every browser supports every action.
      }
    }
  }, [queue, index, toggle, next, previous, seek])

  const value = useMemo(
    () => ({
      work: queue?.work ?? null,
      recording: queue?.recording ?? null,
      index,
      last: queue?.last ?? 0,
      playing,
      time,
      duration,
      error,
      station,
      shuffle,
      repeat,
      volume,
      muted,
      play,
      tune,
      toggleShuffle,
      cycleRepeat,
      setVolume,
      toggleMute,
      toggle,
      next,
      previous,
      seek,
      close,
    }),
    [queue, index, playing, time, duration, error, station, shuffle, repeat, volume, muted, play, tune, toggleShuffle, cycleRepeat, setVolume, toggleMute, toggle, next, previous, seek, close],
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => {
          failuresRef.current = 0
          setPlaying(true)
        }}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={handleEnded}
        onError={handleError}
      />
    </PlayerContext.Provider>
  )
}
