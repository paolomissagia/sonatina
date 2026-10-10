import { describe, expect, it } from 'vitest'
import { recordings } from './recordings'
import { findStation, stations } from './stations'
import { works } from './works'

describe('radio stations', () => {
  const playable = works.filter((work) => recordings[work.id])

  it('each have something to play', () => {
    for (const station of stations) {
      expect(playable.filter(station.matches).length, station.name).toBeGreaterThan(0)
    }
  })

  it('play the whole catalogue on Everything', () => {
    expect(playable.filter(findStation('everything')!.matches)).toHaveLength(playable.length)
  })

  it('are found by id', () => {
    expect(findStation('baroque')?.name).toBe('Baroque')
    expect(findStation('nope')).toBeUndefined()
  })
})
