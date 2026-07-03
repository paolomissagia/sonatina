import type { ReactNode } from 'react'

type RecommendationSectionProps = {
  children: ReactNode
  title: string
}

export function RecommendationSection({ children, title }: RecommendationSectionProps) {
  return (
    <section className="recommendation-section">
      <div className="recommendation-section-heading">
        <h2>{title}</h2>
      </div>
      <div className="recommendation-grid">{children}</div>
    </section>
  )
}
