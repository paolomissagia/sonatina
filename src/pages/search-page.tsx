import { Search } from 'lucide-react'
import { useSearchParams } from 'react-router'
import { SearchResultsPage } from '@/components/search-results-page'
import { t } from '@/i18n'

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const hasQuery = query.trim().length > 0

  return (
    <section className="search-route-page">
      <title>{`${hasQuery ? t('search_query_title', { query: query.trim() }) : t('search_title')} · Sonatina`}</title>
      <div className="search-route-header">
        <h1>{t('search_title')}</h1>
        <p>{t('search_intro')}</p>
      </div>

      <label className="search-field search-route-field">
        <Search size={18} />
        <input
          autoFocus
          placeholder={t('search_placeholder')}
          value={query}
          type="search"
          aria-label={t('search_label')}
          onChange={(event) =>
            setSearchParams(event.target.value ? { q: event.target.value } : {}, { replace: true })
          }
        />
      </label>

      {hasQuery ? (
        <SearchResultsPage query={query} />
      ) : (
        <div className="search-empty-state">
          <h2>{t('search_empty_title')}</h2>
          <p>{t('search_empty_text')}</p>
        </div>
      )}
    </section>
  )
}
