import { Link } from 'react-router'
import { catalogAssets, type CatalogAssetKey } from '@/data/catalog-assets'
import { composers } from '@/data/composers'
import type { Work } from '@/data/models'
import { works } from '@/data/works'

type WorkDetailPageProps = {
  work: Work
}

const tabs = ['Overview', 'Recordings', 'Movements', 'Details']

const recordingHighlights = [
  {
    conductor: 'Herbert von Karajan',
    ensemble: 'Berlin Philharmonic',
    year: '1963',
    asset: 'composerBeethoven',
  },
  {
    conductor: 'Leonard Bernstein',
    ensemble: 'New York Philharmonic',
    year: '1961',
    asset: 'symphonyOrchestra',
  },
  {
    conductor: 'Carlos Kleiber',
    ensemble: 'Vienna Philharmonic',
    year: '1975',
    asset: 'composerStravinsky',
  },
] satisfies Array<{
  conductor: string
  ensemble: string
  year: string
  asset: CatalogAssetKey
}>

function getComposer(work: Work) {
  return composers.find((composer) => composer.id === work.composerId)
}

function getRelatedWorks(work: Work) {
  const sameComposer = works.filter(
    (candidate) => candidate.composerId === work.composerId && candidate.id !== work.id,
  )

  if (sameComposer.length >= 3) {
    return sameComposer.slice(0, 3)
  }

  const samePeriod = works.filter(
    (candidate) =>
      candidate.period === work.period &&
      candidate.id !== work.id &&
      candidate.composerId !== work.composerId,
  )

  return [...sameComposer, ...samePeriod].slice(0, 3)
}

export function WorkDetailPage({ work }: WorkDetailPageProps) {
  const composer = getComposer(work)
  const relatedWorks = getRelatedWorks(work)

  return (
    <article className="work-page">
      <section className="work-hero">
        <img src={catalogAssets[work.asset]} alt="" />
        <div className="work-hero-copy">
          <nav className="work-breadcrumb" aria-label="Breadcrumb">
            <Link to="/works">Works</Link>
            <span>›</span>
            {composer ? (
              <>
                <Link to={`/composers/${composer.id}`}>{work.composerName}</Link>
                <span>›</span>
              </>
            ) : null}
            <strong>{work.title}</strong>
          </nav>

          <h1>{work.title}</h1>
          <p className="work-composer">{work.composerName}</p>
          <p className="work-description">{work.description}</p>

          <div className="work-meta-list">
            <span>{work.year}</span>
            <span>{work.duration}</span>
            <span>{work.form}</span>
          </div>
        </div>
      </section>

      <div className="work-tabs" aria-label={`${work.title} sections`}>
        {tabs.map((tab, index) => (
          <button className={index === 0 ? 'active' : undefined} type="button" key={tab}>
            {tab}
          </button>
        ))}
      </div>

      <div className="work-overview-grid">
        <section className="work-listen">
          <h2>Why listen?</h2>
          <p>{work.overview}</p>
        </section>

        <section className="movement-card">
          <h2>What you’ll hear</h2>
          <div className="movement-list">
            {work.movements.map((movement) => (
              <div className="movement-row" key={`${work.id}-${movement.number}`}>
                <span>{movement.number}</span>
                <strong>{movement.title}</strong>
                <small>{movement.character}</small>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="recordings-section">
        <div className="work-section-heading">
          <h2>Recommended recordings</h2>
        </div>
        <div className="recording-grid">
          {recordingHighlights.map((recording) => (
            <article className="recording-card" key={recording.conductor}>
              <div className="recording-image">
                <img src={catalogAssets[recording.asset]} alt="" />
              </div>
              <div className="recording-copy">
                <h3>{recording.conductor}</h3>
                <p>{recording.ensemble}</p>
                <span>{recording.year}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {relatedWorks.length > 0 ? (
        <section className="related-works-section">
          <div className="work-section-heading">
            <h2>You may also enjoy</h2>
          </div>
          <div className="related-work-list">
            {relatedWorks.map((relatedWork) => (
              <Link className="related-work-card" to={`/works/${relatedWork.id}`} key={relatedWork.id}>
                <img src={catalogAssets[relatedWork.asset]} alt="" />
                <span>
                  <strong>{relatedWork.title}</strong>
                  <small>{relatedWork.composerName}</small>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
