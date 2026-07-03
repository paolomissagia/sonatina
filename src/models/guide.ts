import type { CatalogAssetKey } from '@/assets/catalog-assets'

export type Guide = {
  id: string
  title: string
  type: string
  category: string
  description: string
  asset: CatalogAssetKey
  readTime: string
  audience: string
  overview: string
  sections: string[]
}
