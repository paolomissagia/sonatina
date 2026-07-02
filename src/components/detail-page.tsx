import { catalogAssets } from '@/data/catalog-assets'
import type { CollectionItem } from '@/data/collections'
import { collectionPages } from '@/data/collections'
import type { ViewId } from '@/data/navigation'

type DetailView = Exclude<ViewId, 'discover' | 'about'>

type DetailPageProps = {
  item: CollectionItem
  view: DetailView
  onBack: () => void
}

const detailLabels: Record<DetailView, string> = {
  works: 'About the work',
  composers: 'About the composer',
  guides: 'About this guide',
}

const tabLabels: Record<DetailView, string[]> = {
  works: ['Overview', 'Recordings', 'Details'],
  composers: ['Overview', 'Works', 'Recordings'],
  guides: ['Overview', 'Related works', 'Notes'],
}

function getTags(view: DetailView, item: CollectionItem) {
  if (view === 'works') {
    return [item.period, item.meta, item.title.includes('Symphony') ? 'Symphony' : 'Work'].filter(Boolean)
  }

  if (view === 'composers') {
    return [item.subtitle, item.meta, 'Composer'].filter(Boolean)
  }

  return [item.subtitle, item.meta, 'Guide'].filter(Boolean)
}

export function DetailPage({ item, onBack, view }: DetailPageProps) {
  const page = collectionPages[view]

  return (
    <article className="detail-page">
      <nav className="detail-breadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={onBack}>
          {page.title}
        </button>
        <span>›</span>
        <span>{item.subtitle}</span>
        <span>›</span>
        <strong>{item.title}</strong>
      </nav>

      <div className="detail-hero">
        <div className="detail-copy">
          <h1>{item.title}</h1>
          <p>{item.subtitle}</p>
          <div className="detail-tags">
            {getTags(view, item).map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="detail-media">
          <img src={catalogAssets[item.asset]} alt="" />
        </div>
      </div>

      <div className="detail-tabs" aria-label={`${item.title} sections`}>
        {tabLabels[view].map((label, index) => (
          <button className={index === 0 ? 'active' : undefined} type="button" key={label}>
            {label}
          </button>
        ))}
      </div>

      <section className="detail-section">
        <h2>{detailLabels[view]}</h2>
        <p>
          {item.detail} This early Sonatina view gives the item a focused reading surface with
          enough context to support future recordings, relationships, and editorial notes.
        </p>
      </section>
    </article>
  )
}
