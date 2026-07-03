import type { CatalogAssetKey } from './catalog-assets'

export type CatalogSection = 'works' | 'composers' | 'guides'

export type Work = {
  id: string
  title: string
  composerName: string
  description: string
  asset: CatalogAssetKey
  year: string
  period: string
}

export type Composer = {
  id: string
  name: string
  period: string
  bio: string
  asset: CatalogAssetKey
  years: string
}

export type Guide = {
  id: string
  title: string
  type: string
  description: string
  asset: CatalogAssetKey
  readTime: string
}

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
