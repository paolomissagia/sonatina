import type { CatalogAssetKey } from '@/assets/catalog-assets'
import type { Genre, Work } from '@/models/work'
import { getWorkPeriod } from './works'

export type Station = {
  /** URL-safe id, e.g. `baroque`. */
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
    description: 'From Classical symphonies to grand opera',
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
    description: 'Choirs, masses and oratorios',
    asset: 'genreChoral',
    matches: inGenres('Choral'),
  },
]

export function findStation(id: string | undefined) {
  return stations.find((station) => station.id === id)
}
