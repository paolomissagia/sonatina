import { useState } from 'react'
import { catalogAssets } from '@/assets/catalog-assets'
import { composers, getComposerName } from '@/data/composers'
import type { Work } from '@/models/work'
import { works } from '@/data/works'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type WorkDetailPageProps = {
  work: Work
}

const tabs = ['Overview', 'Movements', 'Details'] as const
type WorkTab = (typeof tabs)[number]

function getComposer(work: Work) {
  return composers.find((composer) => composer.id === work.composerId)
}

function getRecommendedWorks(work: Work) {
  const sameComposer = works.filter(
    (candidate) => candidate.composerId === work.composerId && candidate.id !== work.id,
  )

  const samePeriod = works.filter(
    (candidate) =>
      candidate.period === work.period &&
      candidate.id !== work.id &&
      candidate.composerId !== work.composerId,
  )

  const otherWorks = works.filter(
    (candidate) =>
      candidate.id !== work.id &&
      candidate.composerId !== work.composerId &&
      candidate.period !== work.period,
  )

  return [...sameComposer, ...samePeriod, ...otherWorks].slice(0, 4)
}

export function WorkDetailPage({ work }: WorkDetailPageProps) {
  const [activeTab, setActiveTab] = useState<WorkTab>('Overview')
  const composer = getComposer(work)
  const composerName = getComposerName(work.composerId)
  const recommendedWorks = getRecommendedWorks(work)
  const workDetails = [
    { label: 'Composer', value: composerName },
    { label: 'Year', value: work.year },
    { label: 'Premiere', value: work.premiere },
    { label: 'Duration', value: work.duration },
    { label: 'Form', value: work.form },
    { label: 'Period', value: work.period },
    { label: 'Instrumentation', value: work.instrumentation },
  ]

  return (
    <article className="work-page">
      <DetailHero
        breadcrumb={[
          { label: 'Works', to: '/works' },
          ...(composer ? [{ label: composerName, to: `/composers/${composer.id}` }] : []),
          { label: work.title },
        ]}
        description={work.description}
        imageSrc={catalogAssets[work.asset]}
        meta={
          <>
            <span>{work.year}</span>
            <span>{work.duration}</span>
            <span>{work.form}</span>
          </>
        }
        subtitle={composerName}
        title={work.title}
      />

      <DetailTabs
        activeTab={activeTab}
        ariaLabel={`${work.title} sections`}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {activeTab === 'Overview' ? (
        <div className="work-tab-panel">
          <div className="work-overview-grid">
            <section className="work-listen">
              <h2>Why listen?</h2>
              <p>{work.overview}</p>
            </section>

            <section className="movement-card">
              <h2>Movements</h2>
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

          {recommendedWorks.length > 0 ? (
            <RecommendationSection title="Recommended works">
              {recommendedWorks.map((relatedWork) => (
                <RecommendationCard
                  imageSrc={catalogAssets[relatedWork.asset]}
                  key={relatedWork.id}
                  meta={relatedWork.year}
                  subtitle={getComposerName(relatedWork.composerId)}
                  title={relatedWork.title}
                  to={`/works/${relatedWork.id}`}
                />
              ))}
            </RecommendationSection>
          ) : null}
        </div>
      ) : null}

      {activeTab === 'Movements' ? (
        <section className="movement-card movement-tab-card">
          <h2>Movements</h2>
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
      ) : null}

      {activeTab === 'Details' ? (
        <section className="work-details-panel">
          <h2>Details</h2>
          <dl>
            {workDetails.map((detail) => (
              <div key={detail.label}>
                <dt>{detail.label}</dt>
                <dd>{detail.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
    </article>
  )
}
