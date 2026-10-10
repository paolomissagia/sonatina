export const genres = ['Symphony', 'Concerto', 'Orchestral', 'Piano', 'Chamber', 'Choral', 'Song', 'Opera', 'Ballet'] as const

export type Genre = (typeof genres)[number]

export type Movement = {
  title: string
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
