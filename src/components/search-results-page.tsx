import { catalogAssets } from '@/assets/catalog-assets'
import { useState } from 'react'
import { Link } from 'react-router'
import { catalogPageMeta } from '@/data/catalog'
import { searchCatalog, searchCategories, type SearchResult } from '@/data/search'
import type { CatalogSection } from '@/models/catalog'
import { SectionHeading } from './section-heading'

const previewLimit = 3

type SearchResultsPageProps = {
  query: string
}

function SearchResultRow({ result }: { result: SearchResult }) {
  return (
    <Link className="search-result-row" to={`/${result.category}/${result.id}`}>
      <div className="search-result-image">
        <img src={catalogAssets[result.asset]} alt="" loading="lazy" decoding="async" />
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
    </Link>
  )
}

export function SearchResultsPage({ query }: SearchResultsPageProps) {
  const [activeCategory, setActiveCategory] = useState<CatalogSection | 'all'>('all')
  const trimmedQuery = query.trim()
  const results = searchCatalog(trimmedQuery)
  const groupedResults = searchCategories.map((category) => ({
    category,
    results: results.filter((result) => result.category === category),
  }))
  const visibleGroups =
    activeCategory === 'all'
      ? groupedResults
      : groupedResults.filter((group) => group.category === activeCategory)
  const totalResults = results.length
  const visibleResultCount = visibleGroups.reduce((count, group) => count + group.results.length, 0)

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
            {catalogPageMeta[category].title} ({categoryResults.length})
          </button>
        ))}
      </div>

      {visibleResultCount === 0 ? (
        <div className="empty-results">
          <h3>No results found</h3>
          <p>Try searching for a composer, work, or guide.</p>
        </div>
      ) : (
        visibleGroups.map(({ category, results: categoryResults }) => {
          const isPreview = activeCategory === 'all' && categoryResults.length > previewLimit
          const shownResults = isPreview ? categoryResults.slice(0, previewLimit) : categoryResults

          return categoryResults.length > 0 ? (
            <section className="search-result-section" key={category}>
              <div className="search-result-section-heading">
                <h3>{catalogPageMeta[category].title}</h3>
                {isPreview ? (
                  <button type="button" onClick={() => setActiveCategory(category)}>
                    View all ({categoryResults.length})
                  </button>
                ) : null}
              </div>
              <div className="search-result-list">
                {shownResults.map((result) => (
                  <SearchResultRow result={result} key={`${result.category}-${result.id}`} />
                ))}
              </div>
            </section>
          ) : null
        })
      )}
    </section>
  )
}
