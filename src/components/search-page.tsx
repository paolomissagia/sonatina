import { Search } from 'lucide-react'
import { useState } from 'react'
import { SearchResultsPage } from './search-results-page'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const hasQuery = query.trim().length > 0

  return (
    <section className="search-route-page">
      <div className="search-route-header">
        <h1>Search</h1>
        <p>Find works, composers, and guides from one place.</p>
      </div>

      <label className="search-field search-route-field">
        <Search size={18} />
        <input
          autoFocus
          placeholder="Search works, composers, guides..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      {hasQuery ? (
        <SearchResultsPage query={query} onNavigate={() => setQuery('')} />
      ) : (
        <div className="search-empty-state">
          <h2>Start typing to search Sonatina</h2>
          <p>Search across works, composers, and listening guides.</p>
        </div>
      )}
    </section>
  )
}
