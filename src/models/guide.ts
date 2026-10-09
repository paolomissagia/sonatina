import type { CatalogAssetKey } from '@/assets/catalog-assets'

export const guideCategories = ['Getting started', 'Composers', 'Genres', 'Periods', 'Listening'] as const

export type GuideCategory = (typeof guideCategories)[number]

export type GuideSection = {
  title: string
  /** Paragraphs. */
  body: string[]
}

export type Guide = {
  /** URL slug. */
  id: string
  title: string
  type: string
  category: GuideCategory
  description: string
  asset: CatalogAssetKey
  audience: string
  overview: string
  sections: GuideSection[]
  /** Works the guide talks about, linked at the end. */
  workIds: string[]
}
