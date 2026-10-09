import type { CatalogAssetKey } from '@/assets/catalog-assets'

export type Composer = {
  id: string
  name: string
  period: string
  bio: string
  asset: CatalogAssetKey
  years: string
  nationality: string
  knownFor: string[]
  quote: string
  overview: string
}
