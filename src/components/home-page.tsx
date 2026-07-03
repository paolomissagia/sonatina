import { Clock3 } from 'lucide-react'
import { Link } from 'react-router'
import { catalogAssets } from '@/data/catalog-assets'
import { editorPicks, homeExploreCategories } from '@/data/home'

export function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <img src={catalogAssets.pianoConcerto} alt="" />
        <div className="home-hero-copy">
          <h1>
            Discover
            <span>the world of</span>
            <em>classical music.</em>
          </h1>
          <p>Explore works, composers and guides that make classical music easier to approach.</p>
          <div className="home-hero-actions">
            <Link className="primary-action" to="/works">
              Start exploring
            </Link>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <h2>Explore</h2>
        </div>
        <div className="home-explore-grid">
          {homeExploreCategories.map((category) => (
            <Link className="home-category-card" to={category.to} key={category.title}>
              <img src={catalogAssets[category.asset]} alt="" />
              <span>{category.title}</span>
              <p>{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-heading">
          <h2>Editor&apos;s picks</h2>
        </div>
        <div className="editor-picks-grid">
          {editorPicks.map((pick) => (
            <Link className="editor-pick-card" to={pick.to} key={`${pick.type}-${pick.title}`}>
              <div className="editor-pick-image">
                <img src={catalogAssets[pick.asset]} alt="" />
              </div>
              <div className="editor-pick-copy">
                <small>{pick.type}</small>
                <h3>{pick.title}</h3>
                <p>{pick.subtitle}</p>
                <div className="editor-pick-meta">
                  <span>
                    <Clock3 size={14} />
                    {pick.meta}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
