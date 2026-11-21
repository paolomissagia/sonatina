import type { CatalogItem, CatalogSection } from '@/models/catalog'
import { catalogPageMeta, getCatalogItems } from './catalog'

export type SearchResult = CatalogItem & {
  category: CatalogSection
}

export const searchCategories: CatalogSection[] = ['works', 'composers', 'articles']

/** Built for each search, so labels such as a composer's period are in the current language. */
function getSearchableItems(): SearchResult[] {
  return searchCategories.flatMap((category) =>
    getCatalogItems(category).map((item) => ({
      ...item,
      category,
    })),
  )
}

function matchesQuery(result: SearchResult, terms: string[]) {
  const haystack =
    `${result.title} ${result.subtitle} ${result.detail} ${result.meta ?? ''} ${result.keywords ?? ''} ${catalogPageMeta[result.category].title}`.toLowerCase()

  return terms.every((term) => haystack.includes(term))
}

/** Items matching every whitespace-separated term of `query`, case-insensitively. */
export function searchCatalog(query: string): SearchResult[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean)

  if (terms.length === 0) {
    return []
  }

  return getSearchableItems().filter((result) => matchesQuery(result, terms))
}
