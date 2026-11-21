import type { CatalogAssetKey } from '@/assets/catalog-assets'
import type { Genre } from './work'

export type CatalogSection = 'works' | 'composers' | 'articles'

export type CatalogItem = {
  id: string
  title: string
  readonly subtitle: string
  detail: string
  asset: CatalogAssetKey
  genre?: Genre
  readonly meta?: string
  /** Extra searchable text: catalogue numbers, keys, nicknames, nationality. */
  keywords?: string
}
