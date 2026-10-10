import type { CatalogAssetKey } from '@/assets/catalog-assets'

export const articleCategories = ['Guides', 'Composers', 'Genres', 'Periods', 'Listening'] as const

export type ArticleCategory = (typeof articleCategories)[number]

export type ArticleSection = {
  title: string
  /** Paragraphs. */
  body: string[]
}

export type Article = {
  /** URL slug. */
  id: string
  title: string
  type: string
  category: ArticleCategory
  description: string
  asset: CatalogAssetKey
  audience: string
  overview: string
  sections: ArticleSection[]
  /** Works the article talks about, linked at the end. */
  workIds: string[]
}
