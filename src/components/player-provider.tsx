import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { catalogAssets } from '@/assets/catalog-assets'
import { getComposerName } from '@/data/composers'
import { getWorkAsset } from '@/data/works'
import type { Recording } from '@/models/recording'
import type { Work } from '@/models/work'
import { PlayerContext } from '@/player/player-context'

type Queue = {
  work: Work
  recording: Recording
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [queue, setQueue] = useState<Queue | null>(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [error, setError] = useState(false)

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
    (work: Work, recording: Recording, trackIndex = 0) => start({ work, recording }, trackIndex),
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

  const next = useCallback(() => {
    if (queue && index + 1 < queue.recording.tracks.length) {
      start(queue, index + 1)
    }
  }, [queue, index, start])

  const previous = useCallback(() => {
    const audio = audioRef.current

    if (!audio || !queue) {
      return
    }

    // Like a CD player: back to the start of the track, unless it has only just begun.
    if (audio.currentTime > 3 || index === 0) {
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
    setPlaying(false)
  }, [])

  const handleEnded = () => {
    if (queue && index + 1 < queue.recording.tracks.length) {
      start(queue, index + 1)
    } else {
      setPlaying(false)
    }
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
      playing,
      time,
      duration,
      error,
      play,
      toggle,
      next,
      previous,
      seek,
      close,
    }),
    [queue, index, playing, time, duration, error, play, toggle, next, previous, seek, close],
  )

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onEnded={handleEnded}
        onError={() => {
          if (queue) {
            setError(true)
            setPlaying(false)
          }
        }}
      />
    </PlayerContext.Provider>
  )
}
