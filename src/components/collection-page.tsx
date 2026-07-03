import { catalogPageMeta, getCatalogItems } from '@/data/catalog'
import type { CatalogSection } from '@/models/catalog'
import { CollectionCard } from './collection-card'
import { GuidesPage } from './guides-page'
import { SectionHeading } from './section-heading'

type CollectionPageProps = {
  view: CatalogSection
}

export function CollectionPage({ view }: CollectionPageProps) {
  if (view === 'guides') {
    return <GuidesPage />
  }

  const page = catalogPageMeta[view]
  const items = getCatalogItems(view)

  return (
    <section className="collection-page">
      <div className="page-intro">
        <SectionHeading title={page.title} />
        <p>{page.description}</p>
      </div>

      <div className="collection-grid">
        {items.map((item) => (
          <CollectionCard item={item} key={item.id} view={view} />
        ))}
      </div>
    </section>
  )
}
