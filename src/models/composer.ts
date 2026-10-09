import type { CatalogAssetKey } from '@/assets/catalog-assets'

export const periods = ['Baroque', 'Classical', 'Romantic', 'Modern'] as const

/** Baroque c. 1600–1750, Classical c. 1750–1820, Romantic c. 1820–1900, Modern c. 1900 onwards. */
export type Period = (typeof periods)[number]

export type LifeEvent = {
  year: number
  place: string
}

/** A quote we can source. Commonly misattributed quotes are left out. */
export type Quote = {
  text: string
  source: string
}

export type Composer = {
  /** URL slug, e.g. `bach`. */
  id: string
  name: string
  /** How the composer is referred to in running text, e.g. "Bach", "Clara Schumann". */
  shortName: string
  period: Period
  born: LifeEvent
  died: LifeEvent
  nationality: string
  bio: string
  asset: CatalogAssetKey
  knownFor: string[]
  quote?: Quote
  overview: string
}
