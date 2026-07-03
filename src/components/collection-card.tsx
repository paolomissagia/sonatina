import { Link } from 'react-router'
import { catalogAssets } from '@/data/catalog-assets'
import type { CollectionItem } from '@/data/collections'
import type { CollectionCategory } from '@/data/collections'

type CollectionCardProps = {
  item: CollectionItem
  view: CollectionCategory
}

export function CollectionCard({ item, view }: CollectionCardProps) {
  return (
    <Link className="collection-card" to={`/${view}/${item.id}`}>
      <div className="collection-card-image">
        <img src={catalogAssets[item.asset]} alt="" />
      </div>
      <div className="collection-card-copy">
        <div>
          <h3>{item.title}</h3>
          <p>{item.subtitle}</p>
        </div>
      </div>
    </Link>
  )
}
