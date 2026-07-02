import { catalogAssets } from '@/data/catalog-assets'
import type { CollectionItem } from '@/data/collections'

type CollectionCardProps = {
  item: CollectionItem
}

export function CollectionCard({ item }: CollectionCardProps) {
  return (
    <article className="collection-card">
      <div className="collection-card-image">
        <img src={catalogAssets[item.asset]} alt="" />
      </div>
      <div className="collection-card-copy">
        <div>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>
        {item.meta ? <span>{item.meta}</span> : null}
      </div>
      <p>{item.detail}</p>
    </article>
  )
}
