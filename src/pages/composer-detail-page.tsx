import { Link } from 'react-router'
import { catalogAssets } from '@/assets/catalog-assets'
import { composers } from '@/data/composers'
import type { Composer } from '@/models/composer'
import { works } from '@/data/works'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

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

function getRecommendedComposers(composer: Composer) {
  const samePeriod = composers.filter(
    (candidate) => candidate.period === composer.period && candidate.id !== composer.id,
  )
  const otherComposers = composers.filter(
    (candidate) => candidate.period !== composer.period && candidate.id !== composer.id,
  )

  return [...samePeriod, ...otherComposers].slice(0, 4)
}

export function ComposerDetailPage({ composer }: ComposerDetailPageProps) {
  const essentialWorks = getEssentialWorks(composer)
  const recommendedComposers = getRecommendedComposers(composer)
  const facts = [
    { label: 'Nationality', value: composer.nationality },
    { label: 'Period', value: composer.period },
    { label: 'Active', value: composer.years },
    { label: 'Known for', value: composer.knownFor.join(', ') },
  ]

  return (
    <article className="composer-page">
      <DetailHero
        breadcrumb={[
          { label: 'Composers', to: '/composers' },
          { label: composer.name },
        ]}
        facts={facts}
        factsTitle="Quick facts"
        imageSrc={catalogAssets[composer.asset]}
        quote={composer.quote}
        subtitle={composer.years}
        title={composer.name}
      />

      <DetailTabs ariaLabel={`${composer.name} sections`} tabs={tabs} />

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
    </article>
  )
}
