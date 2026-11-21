import type { CatalogAssetKey } from '@/assets/catalog-assets'
import { periods } from '@/models/composer'
import { labels, periodLabels, t } from '@/i18n'
import type { Genre, Work } from '@/models/work'
import { composers, findComposer } from './composers'
import { getWorkPeriod, works } from './works'

/** Main stations lead the Radio page; eras and countries are the alternatives below them. */
export type StationGroup = 'main' | 'era' | 'country'

export type Station = {
  /** URL-safe id, e.g. `baroque` or `country-italy`. */
  id: string
  readonly name: string
  readonly description: string
  group: StationGroup
  asset: CatalogAssetKey
  matches: (work: Work) => boolean
}

const inGenres = (...genres: Genre[]) => (work: Work) => genres.includes(work.genre)

const mainStations: Station[] = [
  {
    id: 'everything',
    get name() {
      return t('station_everything')
    },
    get description() {
      return t('station_everything_text')
    },
    group: 'main',
    asset: 'burgtheaterAuditorium',
    matches: () => true,
  },
  {
    id: 'concert',
    get name() {
      return t('station_concert')
    },
    get description() {
      return t('station_concert_text')
    },
    group: 'main',
    asset: 'categorySymphony',
    matches: (work) => work.genre !== 'Opera' && work.genre !== 'Ballet',
  },
  {
    id: 'opera',
    get name() {
      return t('station_opera')
    },
    get description() {
      return t('station_opera_text')
    },
    group: 'main',
    asset: 'categoryOpera',
    matches: inGenres('Opera'),
  },
  {
    id: 'ballet',
    get name() {
      return t('station_ballet')
    },
    get description() {
      return t('station_ballet_text')
    },
    group: 'main',
    asset: 'genreBallet',
    matches: inGenres('Ballet'),
  },
]

/** One station per era; its id is also the era's id on the Composers page. */
const eraStations: Station[] = periods.map((period) => ({
  id: period.toLowerCase(),
  get name() {
    return periodLabels[period]
  },
  get description() {
    return t('station_era_text', { period: periodLabels[period] })
  },
  group: 'era',
  asset: 'burgtheaterAuditorium',
  matches: (work: Work) => getWorkPeriod(work) === period,
}))

/** Country names for composers' nationalities. */
const countryNames: Record<string, string> = {
  Austrian: 'Austria',
  Czech: 'Czechia',
  English: 'England',
  Finnish: 'Finland',
  French: 'France',
  German: 'Germany',
  'German-British': 'Germany',
  Hungarian: 'Hungary',
  Italian: 'Italy',
  Norwegian: 'Norway',
  Polish: 'Poland',
  Russian: 'Russia',
}

/** Countries as shown on the Radio page; the English names above stay the ids. */
const countryLabels = labels({
  Austria: 'country_austria',
  Czechia: 'country_czechia',
  England: 'country_england',
  Finland: 'country_finland',
  France: 'country_france',
  Germany: 'country_germany',
  Hungary: 'country_hungary',
  Italy: 'country_italy',
  Norway: 'country_norway',
  Poland: 'country_poland',
  Russia: 'country_russia',
}) as Readonly<Record<string, string>>

/** A smaller country would keep repeating the same few works. */
const minimumCountryWorks = 3

const countryOf = (work: Work) => {
  const nationality = findComposer(work.composerId)?.nationality
  return nationality ? countryNames[nationality] : undefined
}

const countryStations: Station[] = [...new Set(composers.map((composer) => countryNames[composer.nationality]))]
  .filter((country): country is string => Boolean(country))
  .filter((country) => works.filter((work) => countryOf(work) === country).length >= minimumCountryWorks)
  .map((country) => ({
    id: `country-${country.toLowerCase()}`,
    get name() {
      return countryLabels[country] ?? country
    },
    get description() {
      return t('station_country_text', { country: countryLabels[country] ?? country })
    },
    group: 'country',
    asset: 'burgtheaterAuditorium',
    matches: (work: Work) => countryOf(work) === country,
  }))

export const stations: Station[] = [...mainStations, ...eraStations, ...countryStations]

/** A group's stations; countries in alphabetical order in the current language. */
export function getStations(group: StationGroup) {
  const inGroup = stations.filter((station) => station.group === group)
  return group === 'country' ? inGroup.sort((a, b) => a.name.localeCompare(b.name)) : inGroup
}

export function findStation(id: string | undefined) {
  return stations.find((station) => station.id === id)
}
