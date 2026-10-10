import { Radio } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { catalogPageMeta, getCatalogItems, matchesWorkFilter, workFilters } from '@/data/catalog'
import { eras, findEra, getComposersByEra, getEraGuide, getEraStation } from '@/data/eras'
import { usePlayer } from '@/player/player-context'
import type { CatalogSection } from '@/models/catalog'
import { CollectionCard } from '@/components/collection-card'
import { SectionHeading } from '@/components/section-heading'
import { GuidesPage } from './guides-page'

type CollectionPageProps = {
  view: CatalogSection
}

export function CollectionPage({ view }: CollectionPageProps) {
  const [searchParams] = useSearchParams()
  const player = usePlayer()

  if (view === 'guides') {
    return <GuidesPage />
  }

  const page = catalogPageMeta[view]
  const items = getCatalogItems(view)
  const activeGenre = view === 'works' ? searchParams.get('genre') ?? '' : ''
  const activeEra = view === 'composers' ? findEra(searchParams.get('era')) : undefined
  const eraGuide = activeEra ? getEraGuide(activeEra) : undefined
  const eraStation = activeEra ? getEraStation(activeEra) : undefined
  // Within an era, composers are listed oldest first, so the list reads as a timeline.
  const visibleItems = view === 'works'
    ? items.filter((item) => matchesWorkFilter(item, activeGenre))
    : activeEra
      ? getComposersByEra(activeEra).flatMap((composer) => items.filter((item) => item.id === composer.id))
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

      {view === 'composers' ? (
        <div className="collection-filter-list" aria-label="Filter composers by era">
          <Link className={activeEra ? undefined : 'active'} to="/composers">
            All
          </Link>
          {eras.map((era) => (
            <Link
              className={activeEra?.id === era.id ? 'active' : undefined}
              key={era.id}
              to={`/composers?era=${era.id}`}
            >
              {era.period}
            </Link>
          ))}
        </div>
      ) : null}

      {activeEra ? (
        <div className="era-intro">
          {eraGuide ? <p>{eraGuide.description}</p> : null}
          <div className="era-intro-actions">
            {eraStation ? (
              <button className="primary-action" type="button" onClick={() => player.tune(eraStation)}>
                <Radio size={16} />
                Play {activeEra.period} radio
              </button>
            ) : null}
            {eraGuide ? <Link to={`/guides/${eraGuide.id}`}>Read the guide</Link> : null}
          </div>
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
