import type { CatalogAssetKey } from '@/assets/catalog-assets'
import type { Genre, Work } from '@/models/work'
import { countries, findCountry, isWorkFromCountry, type Country } from './countries'
import { getWorkPeriod } from './works'

export type Station = {
  /** URL-safe id, e.g. `baroque` or `country-italy`. */
  id: string
  name: string
  description: string
  asset: CatalogAssetKey
  matches: (work: Work) => boolean
}

const inGenres = (...genres: Genre[]) => (work: Work) => genres.includes(work.genre)

export const stations: Station[] = [
  {
    id: 'everything',
    name: 'Everything',
    description: 'The whole catalogue, from Monteverdi to Stravinsky',
    asset: 'burgtheaterAuditorium',
    matches: () => true,
  },
  {
    id: 'baroque',
    name: 'Baroque',
    description: 'Bach, Handel, Vivaldi and Monteverdi',
    asset: 'concertAtSanssouci',
    matches: (work) => getWorkPeriod(work) === 'Baroque',
  },
  {
    id: 'classical',
    name: 'Classical',
    description: 'Haydn, Mozart, Beethoven and Schubert',
    asset: 'categoryChamber',
    matches: (work) => getWorkPeriod(work) === 'Classical',
  },
  {
    id: 'romantic',
    name: 'Romantic',
    description: 'From Chopin and Brahms to Puccini and Mahler',
    asset: 'genreOrchestral',
    matches: (work) => getWorkPeriod(work) === 'Romantic',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Debussy, Ravel, Stravinsky and Rachmaninoff',
    asset: 'genreBallet',
    matches: (work) => getWorkPeriod(work) === 'Modern',
  },
  {
    id: 'opera',
    name: 'Opera',
    description: 'Arias, duets and great scenes',
    asset: 'categoryOpera',
    matches: inGenres('Opera'),
  },
  {
    id: 'piano',
    name: 'Piano',
    description: 'Sonatas, nocturnes and showpieces',
    asset: 'categoryPiano',
    matches: inGenres('Piano'),
  },
  {
    id: 'orchestra',
    name: 'Orchestra',
    description: 'Symphonies, concertos and ballet',
    asset: 'categorySymphony',
    matches: inGenres('Symphony', 'Concerto', 'Orchestral', 'Ballet'),
  },
  {
    id: 'voices',
    name: 'Voices',
    description: 'Choirs, masses and song',
    asset: 'genreChoral',
    matches: (work) => work.genre === 'Choral' || work.id === 'schubert-winterreise',
  },
]

function getCountryStation(country: Country): Station {
  return {
    id: `country-${country.id}`,
    name: country.name,
    description: `Composers from ${country.name}`,
    asset: 'burgtheaterAuditorium',
    matches: (work) => isWorkFromCountry(work, country),
  }
}

export const countryStations = countries.map(getCountryStation)

export function findStation(id: string | undefined) {
  return [...stations, ...countryStations].find((station) => station.id === id)
}

export function getCountryStationFor(countryId: string) {
  const country = findCountry(countryId)
  return country ? findStation(`country-${country.id}`) : undefined
}
