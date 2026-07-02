import { catalogAssets, type CatalogAssetKey } from '@/data/catalog-assets'

type ExploreCardProps = {
  item: {
    title: string
    description: string
    asset: CatalogAssetKey
  }
}

export function ExploreCard({ item }: ExploreCardProps) {
  return (
    <article className="explore-card">
      <div className="image-tile">
        <img src={catalogAssets[item.asset]} alt="" />
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>
  )
}
