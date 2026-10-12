import type { CatalogItem, CatalogSection } from '@/models/catalog'
import type { Composer } from '@/models/composer'
import type { Article } from '@/models/article'
import { genres, type Work } from '@/models/work'
import { genreLabels, periodLabels, t } from '@/i18n'
import { composers, formatLifespan, getComposerName } from './composers'
import { getReadTime, articles } from './articles'
import { getWorkAsset, getWorkPeriod, works } from './works'

export type CatalogPageMeta = {
  title: string
  description: string
}

export const catalogPageMeta: Record<CatalogSection, CatalogPageMeta> = {
  works: {
    title: t('nav_works'),
    description: t('works_intro'),
  },
  composers: {
    title: t('nav_composers'),
    description: t('composers_intro'),
  },
  articles: {
    title: t('nav_articles'),
    description: t('articles_intro'),
  },
}

const catalogTables = {
  works,
  composers,
  articles,
}

function workToCatalogItem(work: Work): CatalogItem {
  return {
    id: work.id,
    title: work.title,
    subtitle: getComposerName(work.composerId),
    detail: work.description,
    asset: getWorkAsset(work),
    genre: work.genre,
    meta: work.composed,
    keywords: [work.catalogue, work.key, work.nickname, work.genre, getWorkPeriod(work)].filter(Boolean).join(' '),
  }
}

function composerToCatalogItem(composer: Composer): CatalogItem {
  return {
    id: composer.id,
    title: composer.name,
    subtitle: periodLabels[composer.period],
    detail: composer.bio,
    asset: composer.asset,
    meta: formatLifespan(composer),
    keywords: [composer.nationality, ...composer.knownFor].join(' '),
  }
}

function articleToCatalogItem(article: Article): CatalogItem {
  return {
    id: article.id,
    title: article.title,
    subtitle: article.type,
    detail: article.description,
    asset: article.asset,
    meta: getReadTime(article),
    keywords: article.category,
  }
}

/** Works-page filters, linked as `/works?genre=<value>`. */
export const workFilters = [
  { label: t('filter_all'), value: '' },
  ...genres.map((genre) => ({ label: genreLabels[genre], value: genre.toLowerCase() })),
]

/** Whether a work belongs under a works-page filter. An empty filter matches everything. */
export function matchesWorkFilter(item: CatalogItem, filter: string) {
  return !filter || item.genre?.toLowerCase() === filter
}

export function getCatalogItems(section: CatalogSection): CatalogItem[] {
  if (section === 'works') {
    return catalogTables.works.map(workToCatalogItem)
  }

  if (section === 'composers') {
    return catalogTables.composers.map(composerToCatalogItem)
  }

  return catalogTables.articles.map(articleToCatalogItem)
}

export function findCatalogItem(section: CatalogSection, id: string | undefined) {
  if (!id) {
    return undefined
  }

  return getCatalogItems(section).find((item) => item.id === id)
}
