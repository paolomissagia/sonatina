import { useState } from 'react'
import { Link } from 'react-router'
import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { formatLifespan, getRecommendedComposers } from '@/data/composers'
import { findEra } from '@/data/eras'
import type { Composer } from '@/models/composer'
import { periodLabels, t } from '@/i18n'
import { getWorkAsset, getWorksByComposer } from '@/data/works'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type ComposerDetailPageProps = {
  composer: Composer
}

const tabs = ['overview', 'works'] as const
type ComposerTab = (typeof tabs)[number]
const tabLabels: Record<ComposerTab, string> = { overview: t('tab_overview'), works: t('tab_works') }

export function ComposerDetailPage({ composer }: ComposerDetailPageProps) {
  const [activeTab, setActiveTab] = useState<ComposerTab>('overview')
  const composerWorks = getWorksByComposer(composer.id)
  const essentialWorks = composerWorks.slice(0, 4)
  const recommendedComposers = getRecommendedComposers(composer)
  const era = findEra(composer.period.toLowerCase())
  const period = periodLabels[composer.period]
  const facts = [
    { label: t('composer_born'), value: `${composer.born.year}, ${composer.born.place}` },
    { label: t('composer_died'), value: `${composer.died.year}, ${composer.died.place}` },
    { label: t('composer_nationality'), value: composer.nationality },
    { label: t('composer_period'), value: era ? <Link to={`/composers?era=${era.id}`}>{period}</Link> : period },
    { label: t('composer_known_for'), value: composer.knownFor.join(', ') },
  ]

  return (
    <article className="composer-page">
      <title>{`${composer.name} · Sonatina`}</title>
      <DetailHero
        breadcrumb={[
          { label: t('nav_composers'), to: '/composers' },
          { label: composer.name },
        ]}
        facts={facts}
        factsTitle={t('composer_facts')}
        imageAlt={t('composer_portrait', { name: composer.name })}
        imageCredit={assetCredits[composer.asset]}
        imageSrc={catalogAssets[composer.asset]}
        quote={composer.quote}
        subtitle={formatLifespan(composer)}
        title={composer.name}
      />

      <DetailTabs
        activeTab={activeTab}
        ariaLabel={t('sections_label', { title: composer.name })}
        labels={tabLabels}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {activeTab === 'overview' ? (
        <>
          <div className="composer-content-grid">
            <section className="composer-overview">
              <h2>{t('composer_about', { name: composer.shortName })}</h2>
              <p>{composer.overview}</p>
            </section>

            <section className="essential-works">
              <div className="essential-works-heading">
                <h2>{t('composer_essential')}</h2>
                {composerWorks.length > essentialWorks.length ? (
                  <button className="text-action" type="button" onClick={() => setActiveTab('works')}>
                    {t('view_all')}
                  </button>
                ) : null}
              </div>

              {essentialWorks.length > 0 ? (
                <div className="essential-works-list">
                  {essentialWorks.map((work) => (
                    <Link className="essential-work-row" to={`/works/${work.id}`} key={work.id}>
                      <span>›</span>
                      <strong>{work.title}</strong>
                      <small>{work.composed}</small>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="essential-works-empty">{t('composer_no_works')}</p>
              )}
            </section>
          </div>

          {recommendedComposers.length > 0 ? (
            <RecommendationSection title={t('composer_recommended')}>
              {recommendedComposers.map((recommendedComposer) => (
                <RecommendationCard
                  imageSrc={catalogAssets[recommendedComposer.asset]}
                  key={recommendedComposer.id}
                  meta={formatLifespan(recommendedComposer)}
                  subtitle={periodLabels[recommendedComposer.period]}
                  title={recommendedComposer.name}
                  to={`/composers/${recommendedComposer.id}`}
                />
              ))}
            </RecommendationSection>
          ) : null}
        </>
      ) : null}

      {activeTab === 'works' ? (
        composerWorks.length > 0 ? (
          <RecommendationSection title={t('composer_works_by', { name: composer.name })}>
            {composerWorks.map((work) => (
              <RecommendationCard
                imageSrc={catalogAssets[getWorkAsset(work)]}
                key={work.id}
                meta={work.composed}
                subtitle={work.form}
                title={work.title}
                to={`/works/${work.id}`}
              />
            ))}
          </RecommendationSection>
        ) : (
          <p className="essential-works-empty">{t('composer_no_works')}</p>
        )
      ) : null}
    </article>
  )
}
