import { Asset } from 'expo-asset'
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer, type AudioStatus } from 'expo-audio'
import { useCallback, useEffect, useEffectEvent, useMemo, useRef, useState, type ReactNode } from 'react'
import { Platform } from 'react-native'
import { catalogAssets } from '@/assets/catalog-assets'
import { getComposerName } from '@/data/composers'
import { findStation, type Station } from '@/data/stations'
import { getWorkAsset } from '@/data/works'
import type { Recording, RecordingTrack } from '@/models/recording'
import type { Work } from '@/models/work'
import { PlayerContext, type Repeat } from './player-context'
import { pickRadioSegment, radioMemory, type RadioSegment } from './radio'
import { loadRecordings } from './use-recording'

/** The tracks `first` to `last` of a recording: the whole work, or one movement on the radio. */
type Queue = RadioSegment

/** Where the work's cover can be fetched from, for the lock screen and media keys. */
async function artworkUrl(work: Work) {
  try {
    const asset = Asset.fromModule(catalogAssets[getWorkAsset(work)])
    if (Platform.OS === 'web') {
      return new URL(asset.uri, window.location.href).href
    }
    await asset.downloadAsync()
    return asset.localUri ?? asset.uri
  } catch {
    return undefined
  }
}

/**
 * One audio player for the whole app, mounted above the navigator, so playback carries on
 * while you browse. Only the current track is ever loaded.
 */
export function PlayerProvider({ children }: { children: ReactNode }) {
  // The player is mutable and lives outside React state; it is created on first use.
  const audioRef = useRef<AudioPlayer | null>(null)
  const getAudio = useCallback(() => {
    audioRef.current ??= createAudioPlayer(null, { updateInterval: 250 })
    return audioRef.current
  }, [])
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
  // Status events read the playing track from refs: they can arrive before React re-renders.
  const trackRef = useRef<RecordingTrack | null>(null)
  const srcRef = useRef<string | null>(null)
  // A track that is part of a longer file: where to seek once the file loads, and which
  // track's end has already been handled, so a late status update can't skip the next one.
  const pendingSeekRef = useRef<number | null>(null)
  const endedTrackRef = useRef<RecordingTrack | null>(null)
  const failedTrackRef = useRef<RecordingTrack | null>(null)


  // Start a track imperatively, inside the tap that asked for it, so browsers allow playback.
  const start = useCallback(
    (next: Queue, trackIndex: number) => {
      const track = next.recording.tracks[trackIndex]
      if (!track) {
        return
      }

      const offset = track.start ?? 0
      if (srcRef.current === track.src && getAudio().isLoaded) {
        // The next part of the same file: carry on without reloading, unless it starts elsewhere.
        if (Math.abs(getAudio().currentTime - offset) > 1) {
          void getAudio().seekTo(offset)
        }
        setDuration((track.end ?? getAudio().duration) - offset)
      } else {
        getAudio().replace({ uri: track.src })
        srcRef.current = track.src
        pendingSeekRef.current = offset > 0 ? offset : null
        setDuration(0)
      }

      trackRef.current = track
      endedTrackRef.current = null
      failedTrackRef.current = null
      getAudio().play()
      setQueue(next)
      setIndex(trackIndex)
      setTime(0)
      setError(false)
    },
    [getAudio],
  )

  const play = useCallback(
    (work: Work, recording: Recording, trackIndex = 0) => {
      setStation(null)
      start({ work, recording, first: 0, last: recording.tracks.length - 1 }, trackIndex)
    },
    [start],
  )

  // The next movement on a station. The recordings table is usually loaded by now, so this
  // resolves straight away, still within the tap that asked for it.
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
    if (!queue) {
      return
    }

    if (getAudio().playing) {
      getAudio().pause()
    } else {
      getAudio().play()
    }
  }, [getAudio, queue])

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

  const setVolume = useCallback((value: number) => {
    setVolumeState(value)
    setMuted(value === 0)
  }, [])

  const toggleMute = useCallback(() => setMuted((on) => !on), [])

  // Repeat track is the player's own loop, unless the track is part of a longer file.
  const currentTrack = queue?.recording.tracks[index]
  const partOfFile = currentTrack?.start !== undefined || currentTrack?.end !== undefined
  useEffect(() => {
    getAudio().loop = repeat === 'track' && !partOfFile
    getAudio().volume = volume
    getAudio().muted = muted
  }, [getAudio, repeat, partOfFile, volume, muted])

  const previous = useCallback(() => {
    if (!queue) {
      return
    }

    // Like a CD player: back to the start of the track, unless it has only just begun.
    const offset = trackRef.current?.start ?? 0
    if (getAudio().currentTime - offset > 3 || index === queue.first) {
      void getAudio().seekTo(offset)
    } else {
      start(queue, index - 1)
    }
  }, [getAudio, queue, index, start])

  // Seconds from the start of the track, which may be partway into the file.
  const seek = useCallback(
    (seconds: number) => {
      void getAudio().seekTo((trackRef.current?.start ?? 0) + seconds)
    },
    [getAudio],
  )

  const close = useCallback(() => {
    getAudio().pause()
    getAudio().replace(null)
    try {
      getAudio().setActiveForLockScreen(false)
    } catch {
      // Not every platform has lock screen controls.
    }

    srcRef.current = null
    trackRef.current = null
    pendingSeekRef.current = null
    setQueue(null)
    setStation(null)
    setPlaying(false)
  }, [getAudio])

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
      // A track that ends partway through its file would otherwise play on into the next.
      getAudio().pause()
      setPlaying(false)
    }
  }

  // The end of a track that stops partway through its file, or the end of the file itself.
  // Repeating such a track goes back to its own start rather than the file's.
  const finishTrack = () => {
    const track = trackRef.current
    if (!track || endedTrackRef.current === track) {
      return
    }

    if (repeat === 'track') {
      void getAudio().seekTo(track.start ?? 0)
      getAudio().play()
      return
    }

    endedTrackRef.current = track
    handleEnded()
  }

  const handleError = () => {
    if (!queue || failedTrackRef.current === trackRef.current) {
      return
    }
    failedTrackRef.current = trackRef.current

    // The radio skips a broken stream, but gives up rather than loop if the network is down.
    failuresRef.current += 1
    if (station && failuresRef.current < 3) {
      tune(station)
      return
    }

    setError(true)
    setPlaying(false)
  }

  const handleStatus = (status: AudioStatus) => {
    const track = trackRef.current
    const offset = track?.start ?? 0

    if (status.error) {
      handleError()
      return
    }

    if (status.playing) {
      failuresRef.current = 0
    }
    setPlaying(status.playing)

    if (status.isLoaded && pendingSeekRef.current !== null) {
      void getAudio().seekTo(pendingSeekRef.current)
      pendingSeekRef.current = null
      return
    }

    if (status.duration > 0) {
      setDuration((track?.end ?? status.duration) - offset)
    }

    if (status.didJustFinish || (track?.end !== undefined && status.currentTime >= track.end)) {
      finishTrack()
    }
    setTime(Math.max(0, status.currentTime - offset))
  }

  const onStatus = useEffectEvent(handleStatus)

  useEffect(() => {
    // Keep playing with the screen locked or the app in the background, and in silent mode.
    setAudioModeAsync({ playsInSilentMode: true, shouldPlayInBackground: true, interruptionMode: 'doNotMix' }).catch(
      () => {},
    )
    // The listener is attached once; as an effect event, it always sees the latest state.
    const subscription = getAudio().addListener('playbackStatusUpdate', onStatus)
    return () => {
      subscription.remove()
      audioRef.current?.remove()
      audioRef.current = null
    }
  }, [getAudio])

  // Lock screen, notification and media keys.
  const actionsRef = useRef({ next, previous })
  useEffect(() => {
    actionsRef.current = { next, previous }
  })
  useEffect(() => {
    if (!queue) {
      return
    }

    let current = true
    const track = queue.recording.tracks[index]
    const metadata = {
      title: track.title,
      artist: getComposerName(queue.work.composerId),
      albumTitle: queue.work.title,
    }

    try {
      getAudio().setActiveForLockScreen(true, metadata, { showSeekForward: false, showSeekBackward: false })
    } catch {
      // Not every platform has lock screen controls.
    }

    void artworkUrl(queue.work).then((url) => {
      if (current && url) {
        try {
          getAudio().updateLockScreenMetadata({ ...metadata, artworkUrl: url })
        } catch {
          // Artwork is optional.
        }
      }
    })

    // Browsers also offer next and previous on media keys.
    if (Platform.OS === 'web' && typeof navigator !== 'undefined' && 'mediaSession' in navigator) {
      for (const [action, handler] of [
        ['nexttrack', () => actionsRef.current.next()],
        ['previoustrack', () => actionsRef.current.previous()],
      ] as const) {
        try {
          navigator.mediaSession.setActionHandler(action, handler)
        } catch {
          // Not every browser supports every action.
        }
      }
    }

    return () => {
      current = false
    }
  }, [getAudio, queue, index])

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

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
}
