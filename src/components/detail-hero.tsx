import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { FactListItem } from './fact-list'
import { FactList } from './fact-list'

type DetailHeroBreadcrumb = {
  label: string
  to?: string
}

type DetailHeroProps = {
  breadcrumb: DetailHeroBreadcrumb[]
  description?: string
  facts?: FactListItem[]
  factsTitle?: string
  imageAlt?: string
  imageSrc: string
  meta?: ReactNode
  quote?: string
  subtitle?: string
  title: string
}

export function DetailHero({
  breadcrumb,
  description,
  facts,
  factsTitle,
  imageAlt = '',
  imageSrc,
  meta,
  quote,
  subtitle,
  title,
}: DetailHeroProps) {
  return (
    <section className="detail-visual-hero">
      <img src={imageSrc} alt={imageAlt} />
      <div className="detail-visual-hero-copy">
        <nav className="detail-visual-breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => (
            <span className="detail-visual-breadcrumb-item" key={`${item.label}-${index}`}>
              {index > 0 ? <span aria-hidden="true">›</span> : null}
              {item.to ? <Link to={item.to}>{item.label}</Link> : <strong>{item.label}</strong>}
            </span>
          ))}
        </nav>

        <h1>{title}</h1>
        {subtitle ? <p className="detail-visual-subtitle">{subtitle}</p> : null}
        {quote ? <blockquote>“{quote}”</blockquote> : null}
        {description ? <p className="detail-visual-description">{description}</p> : null}
        {meta ? <div className="detail-visual-meta">{meta}</div> : null}
        {facts ? <FactList items={facts} title={factsTitle} /> : null}
      </div>
    </section>
  )
}
