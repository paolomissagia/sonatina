import { collectionPages } from '@/data/collections'
import type { ViewId } from '@/data/navigation'
import { CollectionCard } from './collection-card'
import { SectionHeading } from './section-heading'

type CollectionPageProps = {
  view: Exclude<ViewId, 'discover'>
}

export function CollectionPage({ view }: CollectionPageProps) {
  const page = collectionPages[view]

  return (
    <section className="collection-page">
      <div className="page-intro">
        <SectionHeading title={page.title} />
        <p>{page.description}</p>
      </div>

      <div className="collection-grid">
        {page.items.map((item) => (
          <CollectionCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  )
}
