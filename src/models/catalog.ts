import type { CatalogAssetKey } from '@/data/catalog-assets'
import type { Composer } from './composer'
import type { Guide } from './guide'
import type { Work } from './work'

export type CatalogSection = 'works' | 'composers' | 'guides'

export type CatalogRecord = Work | Composer | Guide

export type CatalogItem = {
  id: string
  title: string
  subtitle: string
  detail: string
  asset: CatalogAssetKey
  meta?: string
  period?: string
}
