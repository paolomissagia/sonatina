import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { getComposerName } from '@/data/composers'
import { getReadTime, getRecommendedGuides } from '@/data/guides'
import { findWork } from '@/data/works'
import type { Guide } from '@/models/guide'
import type { Work } from '@/models/work'
import { DetailHero } from '@/components/detail-hero'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type GuideDetailPageProps = {
  guide: Guide
}

export function GuideDetailPage({ guide }: GuideDetailPageProps) {
  const readTime = getReadTime(guide)
  const recommendedGuides = getRecommendedGuides(guide)
  const guideWorks = guide.workIds.map(findWork).filter((work): work is Work => work !== undefined)
  const guideDetails = [
    { label: 'Type', value: guide.type },
    { label: 'Category', value: guide.category },
    { label: 'Audience', value: guide.audience },
    { label: 'Read time', value: readTime },
  ]

  return (
    <article className="guide-detail-page">
      <title>{`${guide.title} · Sonatina`}</title>
      <DetailHero
        breadcrumb={[
          { label: 'Guides', to: '/guides' },
          { label: guide.title },
        ]}
        description={guide.description}
        facts={guideDetails}
        factsTitle="Guide details"
        imageCredit={assetCredits[guide.asset]}
        imageSrc={catalogAssets[guide.asset]}
        meta={
          <>
            <span>{guide.category}</span>
            <span>{readTime}</span>
          </>
        }
        subtitle={guide.type}
        title={guide.title}
      />

      <div className="guide-article">
        <p className="guide-article-lead">{guide.overview}</p>

        {guide.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      {guideWorks.length > 0 ? (
        <RecommendationSection title="Works in this guide">
          {guideWorks.map((work) => (
            <RecommendationCard
              imageSrc={catalogAssets[work.asset]}
              key={work.id}
              meta={work.composed}
              subtitle={getComposerName(work.composerId)}
              title={work.title}
              to={`/works/${work.id}`}
            />
          ))}
        </RecommendationSection>
      ) : null}

      {recommendedGuides.length > 0 ? (
        <RecommendationSection title="Recommended guides">
          {recommendedGuides.map((recommendedGuide) => (
            <RecommendationCard
              imageSrc={catalogAssets[recommendedGuide.asset]}
              key={recommendedGuide.id}
              meta={getReadTime(recommendedGuide)}
              subtitle={recommendedGuide.category}
              title={recommendedGuide.title}
              to={`/guides/${recommendedGuide.id}`}
            />
          ))}
        </RecommendationSection>
      ) : null}
    </article>
  )
}
