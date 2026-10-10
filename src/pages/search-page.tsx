import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { SearchResultsPage } from '@/components/search-results-page'
import { useHydrated } from '@/use-hydrated'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  // The page was prerendered without a query; read ?q= once hydrated.
  const query = useHydrated() ? searchParams.get('q') ?? '' : ''
  const hasQuery = query.trim().length > 0

  return (
    <section className="search-route-page">
      <div className="search-route-header">
        <h1>Search</h1>
        <p>Find works, composers, and articles from one place.</p>
      </div>

      <label className="search-field search-route-field">
        <Search size={18} />
        <input
          autoFocus
          placeholder="Search works, composers, articles..."
          value={query}
          type="search"
          aria-label="Search Sonatina"
          onChange={(event) =>
            setSearchParams(event.target.value ? { q: event.target.value } : {}, { replace: true })
          }
        />
      </label>

      {hasQuery ? (
        <SearchResultsPage query={query} />
      ) : (
        <div className="search-empty-state">
          <h2>Start typing to search Sonatina</h2>
          <p>Search across works, composers and articles.</p>
        </div>
      )}
    </section>
  )
}
