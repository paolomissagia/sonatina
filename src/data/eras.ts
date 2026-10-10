import type { Composer, Period } from '@/models/composer'
import { periods } from '@/models/composer'
import { composers } from './composers'
import { findArticle } from './articles'
import { findStation } from './stations'

export type Era = {
  /** URL value, e.g. `baroque` in `/composers?era=baroque`. Also the era's radio station id. */
  id: string
  period: Period
  /** The period article this era links to. */
  articleId: string
}

const articleIds: Record<Period, string> = {
  Baroque: 'the-baroque-period',
  Classical: 'the-classical-period',
  Romantic: 'the-romantic-period',
  Modern: 'into-the-twentieth-century',
}

export const eras: Era[] = periods.map((period) => ({ id: period.toLowerCase(), period, articleId: articleIds[period] }))

export function findEra(id: string | null | undefined) {
  return eras.find((era) => era.id === id)
}

export function getEraArticle(era: Era) {
  return findArticle(era.articleId)
}

export function getEraStation(era: Era) {
  return findStation(era.id)
}

/** The era's composers, oldest first, so the list reads as a timeline. */
export function getComposersByEra(era: Era): Composer[] {
  return composers
    .filter((composer) => composer.period === era.period)
    .sort((a, b) => a.born.year - b.born.year)
}
