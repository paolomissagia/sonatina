import { Link } from 'react-router'
import { catalogAssets } from '@/data/catalog-assets'
import type { Composer } from '@/models/composer'
import { works } from '@/data/works'

type ComposerDetailPageProps = {
  composer: Composer
}

const tabs = ['Overview', 'Life', 'Works', 'Timeline', 'Influences']

function getEssentialWorks(composer: Composer) {
  const composerWorks = works.filter((work) => work.composerId === composer.id)

  if (composerWorks.length > 0) {
    return composerWorks.slice(0, 4)
  }

  return works.slice(0, 4)
}

export function ComposerDetailPage({ composer }: ComposerDetailPageProps) {
  const essentialWorks = getEssentialWorks(composer)

  return (
    <article className="composer-page">
      <section className="composer-hero">
        <img src={catalogAssets[composer.asset]} alt="" />
        <div className="composer-hero-copy">
          <nav className="composer-breadcrumb" aria-label="Breadcrumb">
            <Link to="/composers">Composers</Link>
            <span>›</span>
            <strong>{composer.name}</strong>
          </nav>

          <h1>{composer.name}</h1>
          <p className="composer-years">{composer.years}</p>
          <blockquote>“{composer.quote}”</blockquote>

          <div className="composer-facts">
            <h2>Quick facts</h2>
            <dl>
              <div>
                <dt>Nationality</dt>
                <dd>{composer.nationality}</dd>
              </div>
              <div>
                <dt>Period</dt>
                <dd>{composer.period}</dd>
              </div>
              <div>
                <dt>Active</dt>
                <dd>{composer.years}</dd>
              </div>
              <div>
                <dt>Known for</dt>
                <dd>{composer.knownFor.join(', ')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <div className="composer-tabs" aria-label={`${composer.name} sections`}>
        {tabs.map((tab, index) => (
          <button className={index === 0 ? 'active' : undefined} type="button" key={tab}>
            {tab}
          </button>
        ))}
      </div>

      <div className="composer-content-grid">
        <section className="composer-overview">
          <h2>About {composer.name.split(' ').at(-1)}</h2>
          <p>{composer.overview}</p>
        </section>

        <section className="essential-works">
          <div className="essential-works-heading">
            <h2>Essential works</h2>
            <Link to="/works">View all</Link>
          </div>

          <div className="essential-works-list">
            {essentialWorks.map((work) => (
              <Link className="essential-work-row" to={`/works/${work.id}`} key={work.id}>
                <span>›</span>
                <strong>{work.title}</strong>
                <small>{work.year}</small>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}
