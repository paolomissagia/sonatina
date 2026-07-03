import { Link } from 'react-router'
import { catalogAssets } from '@/assets/catalog-assets'
import type { CatalogItem, CatalogSection } from '@/models/catalog'

type CollectionCardProps = {
  item: CatalogItem
  view: CatalogSection
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
