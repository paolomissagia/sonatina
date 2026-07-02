import { catalogAssets } from '@/data/catalog-assets'
import type { CollectionItem } from '@/data/collections'
import type { ViewId } from '@/data/navigation'

type CollectionCardProps = {
  item: CollectionItem
  view: Exclude<ViewId, 'discover' | 'about'>
  onSelect: (view: Exclude<ViewId, 'discover' | 'about'>, item: CollectionItem) => void
}

export function CollectionCard({ item, onSelect, view }: CollectionCardProps) {
  return (
    <button className="collection-card" type="button" onClick={() => onSelect(view, item)}>
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
    </button>
  )
}
