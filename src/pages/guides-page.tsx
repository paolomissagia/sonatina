import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { catalogAssets } from '@/assets/catalog-assets'
import { getReadTime, guides } from '@/data/guides'
import { guideCategories } from '@/models/guide'

const guideFilters = ['All', ...guideCategories]

export function GuidesPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleGuides = useMemo(() => {
    if (activeFilter === 'All') {
      return guides
    }

    return guides.filter((guide) => guide.category === activeFilter)
  }, [activeFilter])

  return (
    <section className="guides-page">
      <title>Guides · Sonatina</title>
      <header className="guides-header">
        <h1>Guides</h1>
        <p>In-depth guides to help you explore, understand, and enjoy classical music.</p>
      </header>

      <div className="guide-filter-list" aria-label="Guide categories">
        {guideFilters.map((filter) => (
          <button
            className={filter === activeFilter ? 'active' : undefined}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="guide-list">
        {visibleGuides.map((guide) => (
          <Link className="guide-row" to={`/guides/${guide.id}`} key={guide.id}>
            <div className="guide-row-image">
              <img src={catalogAssets[guide.asset]} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="guide-row-copy">
              <span>{guide.category}</span>
              <h2>{guide.title}</h2>
              <p>{guide.description}</p>
              <small>{getReadTime(guide)}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
