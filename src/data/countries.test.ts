import { describe, expect, it } from 'vitest'
import { composers } from './composers'
import { countries, findCountry, getComposerCountry, getComposersByCountry } from './countries'
import { recordings } from './recordings'
import { countryStations, findStation, stations } from './stations'
import { works } from './works'

describe('countries', () => {
  it('place every composer in exactly one country', () => {
    for (const composer of composers) {
      const matches = countries.filter((country) => country.nationalities.includes(composer.nationality))
      expect(matches, composer.name).toHaveLength(1)
      expect(getComposerCountry(composer), composer.name).toBe(matches[0])
    }
  })

  it('each have at least one composer and a unique id', () => {
    for (const country of countries) {
      expect(getComposersByCountry(country).length, country.name).toBeGreaterThan(0)
      expect(findCountry(country.id)).toBe(country)
    }
  })
})

describe('radio stations', () => {
  const playable = works.filter((work) => recordings[work.id])

  it('each have something to play', () => {
    for (const station of [...stations, ...countryStations]) {
      expect(playable.filter(station.matches).length, station.name).toBeGreaterThan(0)
    }
  })

  it('play the whole catalogue on Everything', () => {
    expect(playable.filter(findStation('everything')!.matches)).toHaveLength(playable.length)
  })

  it('are found by id, including country stations', () => {
    expect(findStation('baroque')?.name).toBe('Baroque')
    expect(findStation('country-italy')?.name).toBe('Italy')
    expect(findStation('nope')).toBeUndefined()
  })
})
