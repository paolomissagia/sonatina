import { Radio } from 'lucide-react'
import { Link, useSearchParams } from 'react-router'
import { catalogPageMeta, getCatalogItems, matchesWorkFilter, workFilters } from '@/data/catalog'
import { countries, findCountry, getComposersByCountry } from '@/data/countries'
import { getCountryStationFor } from '@/data/stations'
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
  const activeCountry = view === 'composers' ? findCountry(searchParams.get('country')) : undefined
  const countryComposerIds = activeCountry ? getComposersByCountry(activeCountry).map((composer) => composer.id) : []
  const countryStation = activeCountry ? getCountryStationFor(activeCountry.id) : undefined
  const visibleItems = view === 'works'
    ? items.filter((item) => matchesWorkFilter(item, activeGenre))
    : items.filter((item) => !activeCountry || countryComposerIds.includes(item.id))

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
        <div className="collection-filter-list" aria-label="Filter composers by country">
          <Link className={activeCountry ? undefined : 'active'} to="/composers">
            All
          </Link>
          {countries.map((country) => (
            <Link
              className={activeCountry?.id === country.id ? 'active' : undefined}
              key={country.id}
              to={`/composers?country=${country.id}`}
            >
              {country.name}
            </Link>
          ))}
        </div>
      ) : null}

      {activeCountry ? (
        <div className="country-intro">
          <p>{activeCountry.overview}</p>
          {countryStation ? (
            <button className="primary-action" type="button" onClick={() => player.tune(countryStation)}>
              <Radio size={16} />
              Play {activeCountry.name} radio
            </button>
          ) : null}
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
