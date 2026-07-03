import { catalogPageMeta, getCatalogItems } from '@/data/catalog'
import type { CatalogSection } from '@/data/models'
import { CollectionCard } from './collection-card'
import { SectionHeading } from './section-heading'

type CollectionPageProps = {
  view: CatalogSection
}

export function CollectionPage({ view }: CollectionPageProps) {
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
