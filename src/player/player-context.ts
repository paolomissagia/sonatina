import { createContext, useContext } from 'react'
import type { Recording } from '@/models/recording'
import type { Work } from '@/models/work'

export type PlayerState = {
  work: Work | null
  recording: Recording | null
  index: number
  playing: boolean
  time: number
  duration: number
  error: boolean
}

export type PlayerActions = {
  /** Start playing a work's recording from a track. Call it from a click so browsers allow playback. */
  play: (work: Work, recording: Recording, index?: number) => void
  toggle: () => void
  next: () => void
  previous: () => void
  seek: (seconds: number) => void
  close: () => void
}

export const PlayerContext = createContext<(PlayerState & PlayerActions) | null>(null)

export function usePlayer() {
  const player = useContext(PlayerContext)

  if (!player) {
    throw new Error('usePlayer must be used inside PlayerProvider')
  }

  return player
}

/** "4:07" */
export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return '0:00'
  }

  const whole = Math.floor(seconds)
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`
}
