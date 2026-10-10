import { describe, expect, it } from 'vitest'
import { recordings } from '@/data/recordings'
import { findStation } from '@/data/stations'
import { findWork } from '@/data/works'
import { pickRadioSegment } from './radio'

/** A seeded generator, so the tests are repeatable. */
function seeded(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

describe('pickRadioSegment', () => {
  const random = seeded(42)

  it('plays one whole movement from a work on the station', () => {
    const station = findStation('baroque')!
    for (let i = 0; i < 50; i += 1) {
      const segment = pickRadioSegment(station, recordings, [], random)!
      const { tracks } = segment.recording
      const movement = tracks[segment.first].movement

      expect(station.matches(segment.work)).toBe(true)
      expect(tracks.slice(segment.first, segment.last + 1).every((track) => track.movement === movement)).toBe(true)
      expect(tracks[segment.first - 1]?.movement).not.toBe(movement)
      expect(tracks[segment.last + 1]?.movement).not.toBe(movement)
    }
  })

  /** A station limited to the given works, so the outcome is predictable. */
  const only = (...ids: string[]) => ({ ...findStation('everything')!, matches: (work: { id: string }) => ids.includes(work.id) })

  it('avoids recently played works while others remain', () => {
    const recent = ['dvorak-symphony-9', 'dvorak-cello-concerto']
    const segment = pickRadioSegment(only(...recent, 'dvorak-slavonic-dances'), recordings, recent, random)!
    expect(segment.work.id).toBe('dvorak-slavonic-dances')
  })

  it('falls back to repeats when every work was played recently', () => {
    const all = ['grieg-piano-concerto', 'grieg-peer-gynt']
    expect(all).toContain(pickRadioSegment(only(...all), recordings, all, random)!.work.id)
  })

  it('returns null when nothing on the station has a recording', () => {
    const work = findWork('clara-schumann-three-romances')!
    const station = { ...findStation('everything')!, matches: (candidate: typeof work) => candidate.id === work.id }
    expect(pickRadioSegment(station, recordings, [], random)).toBeNull()
  })
})
