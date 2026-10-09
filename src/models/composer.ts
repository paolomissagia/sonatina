import type { CatalogAssetKey } from '@/assets/catalog-assets'

/** A public-domain portrait, credited on the composer page. */
export type Portrait = {
  artist: string
  year: string
  source: string
}

export type Composer = {
  id: string
  name: string
  period: string
  bio: string
  asset: CatalogAssetKey
  portrait: Portrait
  years: string
  nationality: string
  knownFor: string[]
  quote: string
  overview: string
}
