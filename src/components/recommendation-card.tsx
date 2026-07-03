import { Link } from 'react-router'

type RecommendationCardProps = {
  imageSrc: string
  meta?: string
  subtitle: string
  title: string
  to: string
}

export function RecommendationCard({
  imageSrc,
  meta,
  subtitle,
  title,
  to,
}: RecommendationCardProps) {
  return (
    <Link className="recommendation-card" to={to}>
      <div className="recommendation-card-image">
        <img src={imageSrc} alt="" />
      </div>
      <div className="recommendation-card-copy">
        <strong>{title}</strong>
        <small>{subtitle}</small>
        {meta ? <span>{meta}</span> : null}
      </div>
    </Link>
  )
}
