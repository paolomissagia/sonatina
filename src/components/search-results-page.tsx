import { catalogAssets } from '@/data/catalog-assets'
import { useState } from 'react'
import { collectionPages, type CollectionItem } from '@/data/collections'
import type { ViewId } from '@/data/navigation'
import { SectionHeading } from './section-heading'

type SearchCategory = Exclude<ViewId, 'discover' | 'about'>
type SearchResult = CollectionItem & {
  category: SearchCategory
}

const categoryOrder: SearchCategory[] = ['works', 'composers', 'guides']

type SearchResultsPageProps = {
  query: string
  onSelectResult: (view: SearchCategory, item: CollectionItem) => void
}

const searchableItems: SearchResult[] = categoryOrder.flatMap((category) =>
  collectionPages[category].items.map((item) => ({
    ...item,
    category,
  })),
)

function matchesQuery(result: SearchResult, query: string) {
  const terms = query
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)

  if (terms.length === 0) {
    return false
  }

  const haystack =
    `${result.title} ${result.subtitle} ${result.detail} ${result.meta ?? ''} ${collectionPages[result.category].title}`.toLowerCase()

  return terms.every((term) => haystack.includes(term))
}

function SearchResultRow({
  onSelectResult,
  result,
}: {
  result: SearchResult
  onSelectResult: (view: SearchCategory, item: CollectionItem) => void
}) {
  return (
    <button className="search-result-row" type="button" onClick={() => onSelectResult(result.category, result)}>
      <div className="search-result-image">
        <img src={catalogAssets[result.asset]} alt="" />
      </div>
      <div className="search-result-copy">
        <h3>{result.title}</h3>
        <p>{result.subtitle}</p>
        {result.detail ? <small>{result.detail}</small> : null}
      </div>
      <div className="search-result-meta">
        {result.meta ? <strong>{result.meta}</strong> : null}
      </div>
      <span className="search-result-arrow">›</span>
    </button>
  )
}

export function SearchResultsPage({ onSelectResult, query }: SearchResultsPageProps) {
  const [activeCategory, setActiveCategory] = useState<SearchCategory | 'all'>('all')
  const trimmedQuery = query.trim()
  const results = searchableItems.filter((result) => matchesQuery(result, trimmedQuery))
  const groupedResults = categoryOrder.map((category) => ({
    category,
    results: results.filter((result) => result.category === category),
  }))
  const visibleGroups =
    activeCategory === 'all'
      ? groupedResults
      : groupedResults.filter((group) => group.category === activeCategory)
  const totalResults = results.length

  return (
    <section className="search-page">
      <SectionHeading title={`Search results for "${trimmedQuery}"`} />

      <div className="search-tabs" aria-label="Search result categories">
        <button
          className={activeCategory === 'all' ? 'active' : undefined}
          type="button"
          onClick={() => setActiveCategory('all')}
        >
          All ({totalResults})
        </button>
        {groupedResults.map(({ category, results: categoryResults }) => (
          <button
            className={activeCategory === category ? 'active' : undefined}
            type="button"
            key={category}
            onClick={() => setActiveCategory(category)}
          >
            {collectionPages[category].title} ({categoryResults.length})
          </button>
        ))}
      </div>

      {totalResults === 0 ? (
        <div className="empty-results">
          <h3>No results found</h3>
          <p>Try searching for a composer, work, or guide.</p>
        </div>
      ) : (
        visibleGroups.map(({ category, results: categoryResults }) =>
          categoryResults.length > 0 ? (
            <section className="search-result-section" key={category}>
              <div className="search-result-section-heading">
                <h3>{collectionPages[category].title}</h3>
                {categoryResults.length > 2 ? (
                  <button type="button">View all ({categoryResults.length})</button>
                ) : null}
              </div>
              <div className="search-result-list">
                {categoryResults.slice(0, 3).map((result) => (
                  <SearchResultRow
                    onSelectResult={onSelectResult}
                    result={result}
                    key={`${result.category}-${result.title}`}
                  />
                ))}
              </div>
            </section>
          ) : null,
        )
      )}
    </section>
  )
}
