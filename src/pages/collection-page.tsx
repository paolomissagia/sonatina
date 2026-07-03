import { Link, useSearchParams } from 'react-router'
import { catalogPageMeta, getCatalogItems } from '@/data/catalog'
import type { CatalogSection } from '@/models/catalog'
import { CollectionCard } from '@/components/collection-card'
import { SectionHeading } from '@/components/section-heading'
import { GuidesPage } from './guides-page'

type CollectionPageProps = {
  view: CatalogSection
}

const workFilters = [
  { label: 'All', value: '' },
  { label: 'Opera', value: 'Opera' },
  { label: 'Piano', value: 'Piano' },
  { label: 'Symphonies', value: 'Symphony' },
  { label: 'Chamber Music', value: 'Chamber Music' },
  { label: 'Concertos', value: 'Concerto' },
]

function isWorkFilterMatch(item: ReturnType<typeof getCatalogItems>[number], activeType: string) {
  if (!activeType || !item.form) {
    return true
  }

  if (activeType === 'Piano') {
    return ['Piano miniature', 'Sonata', 'Variations'].includes(item.form)
  }

  if (activeType === 'Chamber Music') {
    return ['Suite', 'Serenade'].includes(item.form)
  }

  if (activeType === 'Symphony') {
    return item.form === 'Symphony'
  }

  if (activeType === 'Concerto') {
    return ['Concerto', 'Concertos'].includes(item.form)
  }

  return item.form === activeType
}

export function CollectionPage({ view }: CollectionPageProps) {
  const [searchParams] = useSearchParams()

  if (view === 'guides') {
    return <GuidesPage />
  }

  const page = catalogPageMeta[view]
  const items = getCatalogItems(view)
  const activeType = view === 'works' ? searchParams.get('type') ?? '' : ''
  const visibleItems = view === 'works'
    ? items.filter((item) => isWorkFilterMatch(item, activeType))
    : items

  return (
    <section className="collection-page">
      <div className="page-intro">
        <SectionHeading title={page.title} />
        <p>{page.description}</p>
      </div>

      {view === 'works' ? (
        <div className="collection-filter-list" aria-label="Work type filters">
          {workFilters.map((filter) => (
            <Link
              className={activeType === filter.value ? 'active' : undefined}
              key={filter.label}
              to={filter.value ? `/works?type=${encodeURIComponent(filter.value)}` : '/works'}
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
