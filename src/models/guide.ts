import type { CatalogAssetKey } from '@/data/catalog-assets'

export type Guide = {
  id: string
  title: string
  type: string
  category: string
  description: string
  asset: CatalogAssetKey
  readTime: string
}
