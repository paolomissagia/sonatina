import { useState } from 'react'
import { Link } from 'react-router'
import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { getRecommendedComposers } from '@/data/composers'
import type { Composer } from '@/models/composer'
import { getWorksByComposer } from '@/data/works'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type ComposerDetailPageProps = {
  composer: Composer
}

const tabs = ['Overview', 'Works'] as const
type ComposerTab = (typeof tabs)[number]

export function ComposerDetailPage({ composer }: ComposerDetailPageProps) {
  const [activeTab, setActiveTab] = useState<ComposerTab>('Overview')
  const composerWorks = getWorksByComposer(composer.id)
  const essentialWorks = composerWorks.slice(0, 4)
  const recommendedComposers = getRecommendedComposers(composer)
  const facts = [
    { label: 'Nationality', value: composer.nationality },
    { label: 'Period', value: composer.period },
    { label: 'Lived', value: composer.years },
    { label: 'Known for', value: composer.knownFor.join(', ') },
  ]

  return (
    <article className="composer-page">
      <title>{`${composer.name} · Sonatina`}</title>
      <DetailHero
        breadcrumb={[
          { label: 'Composers', to: '/composers' },
          { label: composer.name },
        ]}
        facts={facts}
        factsTitle="Quick facts"
        imageAlt={`Portrait of ${composer.name}`}
        imageCredit={assetCredits[composer.asset]}
        imageSrc={catalogAssets[composer.asset]}
        quote={composer.quote}
        subtitle={composer.years}
        title={composer.name}
      />

      <DetailTabs
        activeTab={activeTab}
        ariaLabel={`${composer.name} sections`}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {activeTab === 'Overview' ? (
        <>
          <div className="composer-content-grid">
            <section className="composer-overview">
              <h2>About {composer.name.split(' ').at(-1)}</h2>
              <p>{composer.overview}</p>
            </section>

            <section className="essential-works">
              <div className="essential-works-heading">
                <h2>Essential works</h2>
                {composerWorks.length > essentialWorks.length ? (
                  <button className="text-action" type="button" onClick={() => setActiveTab('Works')}>
                    View all
                  </button>
                ) : null}
              </div>

              {essentialWorks.length > 0 ? (
                <div className="essential-works-list">
                  {essentialWorks.map((work) => (
                    <Link className="essential-work-row" to={`/works/${work.id}`} key={work.id}>
                      <span>›</span>
                      <strong>{work.title}</strong>
                      <small>{work.year}</small>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="essential-works-empty">No works in the catalog yet.</p>
              )}
            </section>
          </div>

          {recommendedComposers.length > 0 ? (
            <RecommendationSection title="Recommended composers">
              {recommendedComposers.map((recommendedComposer) => (
                <RecommendationCard
                  imageSrc={catalogAssets[recommendedComposer.asset]}
                  key={recommendedComposer.id}
                  meta={recommendedComposer.years}
                  subtitle={recommendedComposer.period}
                  title={recommendedComposer.name}
                  to={`/composers/${recommendedComposer.id}`}
                />
              ))}
            </RecommendationSection>
          ) : null}
        </>
      ) : null}

      {activeTab === 'Works' ? (
        composerWorks.length > 0 ? (
          <RecommendationSection title={`Works by ${composer.name}`}>
            {composerWorks.map((work) => (
              <RecommendationCard
                imageSrc={catalogAssets[work.asset]}
                key={work.id}
                meta={work.year}
                subtitle={work.form}
                title={work.title}
                to={`/works/${work.id}`}
              />
            ))}
          </RecommendationSection>
        ) : (
          <p className="essential-works-empty">No works in the catalog yet.</p>
        )
      ) : null}
    </article>
  )
}
