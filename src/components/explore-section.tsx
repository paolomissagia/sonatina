import { exploreItems } from '@/data/explore'
import { ExploreCard } from './explore-card'
import { SectionHeading } from './section-heading'

export function ExploreSection() {
  return (
    <section className="content-section">
      <SectionHeading title="Explore" />
      <div className="explore-grid">
        {exploreItems.map((item) => (
          <ExploreCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  )
}
