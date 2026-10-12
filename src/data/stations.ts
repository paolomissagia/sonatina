import type { CatalogAssetKey } from '@/assets/catalog-assets'
import { periods } from '@/models/composer'
import { periodLabels, t } from '@/i18n'
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
    name: t('station_everything'),
    description: t('station_everything_text'),
    group: 'main',
    asset: 'burgtheaterAuditorium',
    matches: () => true,
  },
  {
    id: 'concert',
    name: t('station_concert'),
    description: t('station_concert_text'),
    group: 'main',
    asset: 'categorySymphony',
    matches: (work) => work.genre !== 'Opera' && work.genre !== 'Ballet',
  },
  {
    id: 'opera',
    name: t('station_opera'),
    description: t('station_opera_text'),
    group: 'main',
    asset: 'categoryOpera',
    matches: inGenres('Opera'),
  },
  {
    id: 'ballet',
    name: t('station_ballet'),
    description: t('station_ballet_text'),
    group: 'main',
    asset: 'genreBallet',
    matches: inGenres('Ballet'),
  },
]

/** One station per era; its id is also the era's id on the Composers page. */
const eraStations: Station[] = periods.map((period) => ({
  id: period.toLowerCase(),
  name: periodLabels[period],
  description: t('station_era_text', { period: periodLabels[period] }),
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
const countryLabels: Record<string, string> = {
  Austria: t('country_austria'),
  Czechia: t('country_czechia'),
  England: t('country_england'),
  Finland: t('country_finland'),
  France: t('country_france'),
  Germany: t('country_germany'),
  Hungary: t('country_hungary'),
  Italy: t('country_italy'),
  Norway: t('country_norway'),
  Poland: t('country_poland'),
  Russia: t('country_russia'),
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
  .map((country) => ({ country, label: countryLabels[country] ?? country }))
  .sort((a, b) => a.label.localeCompare(b.label))
  .map(({ country, label }) => ({
    id: `country-${country.toLowerCase()}`,
    name: label,
    description: t('station_country_text', { country: label }),
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
