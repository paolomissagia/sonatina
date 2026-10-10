import { works } from '@/data/works'
import type { Station } from '@/data/stations'
import type { Recording } from '@/models/recording'
import type { Work } from '@/models/work'

/** A stretch of a recording: the tracks `first` to `last` that make up one movement. */
export type RadioSegment = {
  work: Work
  recording: Recording
  first: number
  last: number
}

/** How many recent works the radio avoids repeating. */
export const radioMemory = 8

/**
 * A random movement from a random work on the station, skipping recently played works
 * while there are others to choose from. Null if the station has nothing to play.
 */
export function pickRadioSegment(
  station: Station,
  recordings: Record<string, Recording>,
  recent: string[] = [],
  random: () => number = Math.random,
): RadioSegment | null {
  const playable = works.filter((work) => recordings[work.id] && station.matches(work))
  const fresh = playable.filter((work) => !recent.includes(work.id))
  const pool = fresh.length > 0 ? fresh : playable

  if (pool.length === 0) {
    return null
  }

  const work = pool[Math.floor(random() * pool.length)]
  const recording = recordings[work.id]
  const movements = [...new Set(recording.tracks.map((track) => track.movement))]
  const movement = movements[Math.floor(random() * movements.length)]
  const first = recording.tracks.findIndex((track) => track.movement === movement)
  let last = first

  while (recording.tracks[last + 1]?.movement === movement) {
    last += 1
  }

  return { work, recording, first, last }
}
