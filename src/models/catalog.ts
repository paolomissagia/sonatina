import type { CatalogAssetKey } from '@/assets/catalog-assets'
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
  form?: string
  meta?: string
  period?: string
}
