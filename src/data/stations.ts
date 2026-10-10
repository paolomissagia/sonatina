import type { CatalogAssetKey } from '@/assets/catalog-assets'
import { periods } from '@/models/composer'
import type { Genre, Work } from '@/models/work'
import { composers, findComposer } from './composers'
import { getWorkPeriod, works } from './works'

/** Main stations lead the Radio page; eras and countries are the alternatives below them. */
export type StationGroup = 'main' | 'era' | 'country'

export type Station = {
  /** URL-safe id, e.g. `baroque` or `country-italy`. */
  id: string
  name: string
  description: string
  group: StationGroup
  asset: CatalogAssetKey
  matches: (work: Work) => boolean
}

const inGenres = (...genres: Genre[]) => (work: Work) => genres.includes(work.genre)

const mainStations: Station[] = [
  {
    id: 'everything',
    name: 'Everything',
    description: 'From Classical symphonies to grand opera',
    group: 'main',
    asset: 'burgtheaterAuditorium',
    matches: () => true,
  },
  {
    id: 'concert',
    name: 'Classical music',
    description: 'Symphonies, concertos, piano and chamber music',
    group: 'main',
    asset: 'categorySymphony',
    matches: (work) => work.genre !== 'Opera' && work.genre !== 'Ballet',
  },
  {
    id: 'opera',
    name: 'Opera',
    description: 'Arias, duets and great scenes',
    group: 'main',
    asset: 'categoryOpera',
    matches: inGenres('Opera'),
  },
  {
    id: 'ballet',
    name: 'Ballet',
    description: 'From Swan Lake to The Rite of Spring',
    group: 'main',
    asset: 'genreBallet',
    matches: inGenres('Ballet'),
  },
]

/** One station per era; its id is also the era's id on the Composers page. */
const eraStations: Station[] = periods.map((period) => ({
  id: period.toLowerCase(),
  name: period,
  description: `${period} composers`,
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

/** A smaller country would keep repeating the same few works. */
const minimumCountryWorks = 3

const countryOf = (work: Work) => {
  const nationality = findComposer(work.composerId)?.nationality
  return nationality ? countryNames[nationality] : undefined
}

const countryStations: Station[] = [...new Set(composers.map((composer) => countryNames[composer.nationality]))]
  .filter((country): country is string => Boolean(country))
  .filter((country) => works.filter((work) => countryOf(work) === country).length >= minimumCountryWorks)
  .sort()
  .map((country) => ({
    id: `country-${country.toLowerCase()}`,
    name: country,
    description: `Composers from ${country}`,
    group: 'country',
    asset: 'burgtheaterAuditorium',
    matches: (work: Work) => countryOf(work) === country,
  }))

export const stations: Station[] = [...mainStations, ...eraStations, ...countryStations]

export function getStations(group: StationGroup) {
  return stations.filter((station) => station.group === group)
}

export function findStation(id: string | undefined) {
  return stations.find((station) => station.id === id)
}
