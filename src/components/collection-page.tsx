import { catalogAssets } from '@/data/catalog-assets'
import { collectionPages } from '@/data/collections'
import type { CollectionItem } from '@/data/collections'
import type { ViewId } from '@/data/navigation'
import { CollectionCard } from './collection-card'
import { SectionHeading } from './section-heading'

type CollectionPageProps = {
  view: Exclude<ViewId, 'discover'>
  onSelectItem: (view: Exclude<ViewId, 'discover' | 'about'>, item: CollectionItem) => void
}

export function CollectionPage({ onSelectItem, view }: CollectionPageProps) {
  const page = collectionPages[view]
  const canOpenDetail = view !== 'about'

  return (
    <section className="collection-page">
      <div className="page-intro">
        <SectionHeading title={page.title} />
        <p>{page.description}</p>
      </div>

      <div className="collection-grid">
        {page.items.map((item) => (
          canOpenDetail ? (
            <CollectionCard item={item} key={item.title} onSelect={onSelectItem} view={view} />
          ) : (
            <article className="collection-card static-card" key={item.title}>
              <div className="collection-card-image">
                <img src={catalogAssets[item.asset]} alt="" />
              </div>
              <div className="collection-card-copy">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
                {item.period ? <span>{item.period}</span> : null}
              </div>
            </article>
          )
        ))}
      </div>
    </section>
  )
}
