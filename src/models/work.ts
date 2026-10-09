import type { CatalogAssetKey } from '@/assets/catalog-assets'

export const genres = ['Symphony', 'Concerto', 'Orchestral', 'Piano', 'Chamber', 'Choral', 'Opera', 'Ballet'] as const

export type Genre = (typeof genres)[number]

export type Movement = {
  title: string
  /** A short gloss: the concerto a movement belongs to, the part of a ballet, what to listen for. */
  note?: string
}

export type Work = {
  /** URL slug, e.g. `beethoven-symphony-5`. */
  id: string
  title: string
  composerId: string
  /** Catalogue or opus number, e.g. "Op. 67", "BWV 1007", "K. 626". */
  catalogue?: string
  key?: string
  /** Popular name, e.g. "Moonlight". Searchable. */
  nickname?: string
  description: string
  /** Its own image, when a strong public-domain one exists; otherwise the genre cover is used. */
  asset?: CatalogAssetKey
  /** When it was written, for display: "1804–08", "c. 1720". */
  composed: string
  /** A single year to sort and compare by. */
  year: number
  durationMinutes: number
  genre: Genre
  /** A plain description of the form, e.g. "Symphony in four movements". */
  form: string
  premiere?: string
  instrumentation: string
  overview: string
  /** The larger set this piece belongs to; its movements are then the set's. */
  partOf?: string
  movements: Movement[]
}
