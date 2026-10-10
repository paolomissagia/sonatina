import { describe, expect, it } from 'vitest'
import { recordings } from './recordings'
import { findStation, getStations, stations } from './stations'
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

  it('lead with the main stations, then eras and countries', () => {
    expect(getStations('main').map((station) => station.id)).toEqual(['everything', 'concert', 'opera', 'ballet'])
    expect(getStations('era').map((station) => station.name)).toEqual(['Baroque', 'Classical', 'Romantic', 'Modern'])
    for (const station of getStations('country')) {
      expect(works.filter(station.matches).length, station.name).toBeGreaterThanOrEqual(3)
    }
  })

  it('split concert music from the stage', () => {
    const concert = findStation('concert')!
    expect(works.filter(concert.matches).some((work) => work.genre === 'Opera' || work.genre === 'Ballet')).toBe(false)
  })

  it('are found by id', () => {
    expect(findStation('baroque')?.name).toBe('Baroque')
    expect(findStation('nope')).toBeUndefined()
  })
})
