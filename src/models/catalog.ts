import type { CatalogAssetKey } from '@/assets/catalog-assets'

export type CatalogSection = 'works' | 'composers' | 'guides'

export type CatalogItem = {
  id: string
  title: string
  subtitle: string
  detail: string
  asset: CatalogAssetKey
  form?: string
  meta?: string
  period?: string
}
