import type { CatalogAssetKey } from '@/data/catalog-assets'

export type HomeExploreCategory = {
  title: string
  description: string
  asset: CatalogAssetKey
  to: string
}

export type EditorPick = {
  type: string
  title: string
  subtitle: string
  meta: string
  asset: CatalogAssetKey
  to: string
}
