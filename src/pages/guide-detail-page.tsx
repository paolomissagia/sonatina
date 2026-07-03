import { useState } from 'react'
import { catalogAssets } from '@/assets/catalog-assets'
import { guides } from '@/data/guides'
import type { Guide } from '@/models/guide'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type GuideDetailPageProps = {
  guide: Guide
}

const tabs = ['Overview', 'Sections', 'Details'] as const
type GuideTab = (typeof tabs)[number]

function getRecommendedGuides(guide: Guide) {
  const sameCategory = guides.filter(
    (candidate) => candidate.category === guide.category && candidate.id !== guide.id,
  )
  const otherGuides = guides.filter(
    (candidate) => candidate.category !== guide.category && candidate.id !== guide.id,
  )

  return [...sameCategory, ...otherGuides].slice(0, 4)
}

export function GuideDetailPage({ guide }: GuideDetailPageProps) {
  const [activeTab, setActiveTab] = useState<GuideTab>('Overview')
  const recommendedGuides = getRecommendedGuides(guide)
  const guideDetails = [
    { label: 'Type', value: guide.type },
    { label: 'Category', value: guide.category },
    { label: 'Audience', value: guide.audience },
    { label: 'Read time', value: guide.readTime },
  ]

  return (
    <article className="guide-detail-page">
      <DetailHero
        breadcrumb={[
          { label: 'Guides', to: '/guides' },
          { label: guide.title },
        ]}
        description={guide.description}
        facts={guideDetails}
        factsTitle="Guide details"
        imageSrc={catalogAssets[guide.asset]}
        meta={
          <>
            <span>{guide.category}</span>
            <span>{guide.readTime}</span>
          </>
        }
        subtitle={guide.type}
        title={guide.title}
      />

      <DetailTabs
        activeTab={activeTab}
        ariaLabel={`${guide.title} sections`}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {activeTab === 'Overview' ? (
        <div className="work-tab-panel">
          <section className="work-listen">
            <h2>About this guide</h2>
            <p>{guide.overview}</p>
          </section>

          {recommendedGuides.length > 0 ? (
            <RecommendationSection title="Recommended guides">
              {recommendedGuides.map((recommendedGuide) => (
                <RecommendationCard
                  imageSrc={catalogAssets[recommendedGuide.asset]}
                  key={recommendedGuide.id}
                  meta={recommendedGuide.readTime}
                  subtitle={recommendedGuide.category}
                  title={recommendedGuide.title}
                  to={`/guides/${recommendedGuide.id}`}
                />
              ))}
            </RecommendationSection>
          ) : null}
        </div>
      ) : null}

      {activeTab === 'Sections' ? (
        <section className="movement-card movement-tab-card">
          <h2>Sections</h2>
          <div className="movement-list">
            {guide.sections.map((section, index) => (
              <div className="movement-row" key={section}>
                <span>{index + 1}.</span>
                <strong>{section}</strong>
                <small>{guide.category}</small>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === 'Details' ? (
        <section className="work-details-panel">
          <h2>Details</h2>
          <dl>
            {guideDetails.map((detail) => (
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
