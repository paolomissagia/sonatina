import { Link, useSearchParams } from 'react-router'
import { catalogPageMeta, getCatalogItems, matchesWorkFilter, workFilters } from '@/data/catalog'
import type { CatalogSection } from '@/models/catalog'
import { CollectionCard } from '@/components/collection-card'
import { SectionHeading } from '@/components/section-heading'
import { GuidesPage } from './guides-page'

type CollectionPageProps = {
  view: CatalogSection
}

export function CollectionPage({ view }: CollectionPageProps) {
  const [searchParams] = useSearchParams()

  if (view === 'guides') {
    return <GuidesPage />
  }

  const page = catalogPageMeta[view]
  const items = getCatalogItems(view)
  const activeGenre = view === 'works' ? searchParams.get('genre') ?? '' : ''
  const visibleItems = view === 'works'
    ? items.filter((item) => matchesWorkFilter(item, activeGenre))
    : items

  return (
    <section className="collection-page">
      <title>{`${page.title} · Sonatina`}</title>
      <div className="page-intro">
        <SectionHeading title={page.title} />
        <p>{page.description}</p>
      </div>

      {view === 'works' ? (
        <div className="collection-filter-list" aria-label="Filter works by genre">
          {workFilters.map((filter) => (
            <Link
              className={activeGenre === filter.value ? 'active' : undefined}
              key={filter.label}
              to={filter.value ? `/works?genre=${filter.value}` : '/works'}
            >
              {filter.label}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="collection-grid">
        {visibleItems.map((item) => (
          <CollectionCard item={item} key={item.id} view={view} />
        ))}
      </div>
    </section>
  )
}
