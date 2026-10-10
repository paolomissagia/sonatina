import type { ReactNode } from 'react'
import { Link } from 'react-router'
import type { ImageCredit } from '@/assets/catalog-assets'
import type { Quote } from '@/models/composer'
import { ImageCreditLink } from './image-credit-link'
import type { FactListItem } from './fact-list'
import { FactList } from './fact-list'

type DetailHeroBreadcrumb = {
  label: string
  to?: string
}

type DetailHeroProps = {
  breadcrumb: DetailHeroBreadcrumb[]
  description?: string
  actions?: ReactNode
  facts?: FactListItem[]
  factsTitle?: string
  imageAlt?: string
  imageCredit?: ImageCredit
  imageSrc: string
  meta?: ReactNode
  quote?: Quote
  subtitle?: string
  title: string
}

/** Keeps keys and catalogue numbers on one line: "D major, Op. 35", never "D" then "major". */
function keepNumbersTogether(title: string) {
  return title
    .replace(/\b(Op\.|No\.|K\.|BWV|D\.|S\.|L\.|SV|WAB|Hob\.) /g, '$1\u00a0')
    .replace(/\b([A-G](?:-flat|-sharp)?) (major|minor)\b/g, '$1\u00a0$2')
}

export function DetailHero({
  actions,
  breadcrumb,
  description,
  facts,
  factsTitle,
  imageAlt = '',
  imageCredit,
  imageSrc,
  meta,
  quote,
  subtitle,
  title,
}: DetailHeroProps) {
  return (
    <section className="detail-visual-hero">
      <img src={imageSrc} alt={imageAlt} />
      {imageCredit ? <ImageCreditLink credit={imageCredit} imageSrc={imageSrc} /> : null}
      <div className="detail-visual-hero-copy">
        <nav className="detail-visual-breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((item, index) => (
            <span className="detail-visual-breadcrumb-item" key={`${item.label}-${index}`}>
              {item.to ? <Link to={item.to}>{item.label}</Link> : <strong>{item.label}</strong>}
              {/* The separator trails its item, so a wrapped line never starts with one. */}
              {index < breadcrumb.length - 1 ? <span aria-hidden="true">›</span> : null}
            </span>
          ))}
        </nav>

        <h1>{keepNumbersTogether(title)}</h1>
        {subtitle ? <p className="detail-visual-subtitle">{subtitle}</p> : null}
        {quote ? (
          <figure className="detail-visual-quote">
            <blockquote>“{quote.text}”</blockquote>
            <figcaption>{quote.source}</figcaption>
          </figure>
        ) : null}
        {description ? <p className="detail-visual-description">{description}</p> : null}
        {meta ? <div className="detail-visual-meta">{meta}</div> : null}
        {actions ? <div className="detail-visual-actions">{actions}</div> : null}
        {facts ? <FactList items={facts} title={factsTitle} /> : null}
      </div>
    </section>
  )
}
