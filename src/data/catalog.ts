import { composers } from './composers'
import { guides } from './guides'
import type { CatalogItem, CatalogSection, Composer, Guide, Work } from './models'
import { works } from './works'

export type CatalogPageMeta = {
  title: string
  description: string
}

export const catalogPageMeta: Record<CatalogSection, CatalogPageMeta> = {
  works: {
    title: 'Works',
    description: 'Essential pieces and repertoire landmarks from across classical music.',
  },
  composers: {
    title: 'Composers',
    description: 'Browse major composers by style, period, and influence.',
  },
  guides: {
    title: 'Guides',
    description: 'Short paths into repertoire, listening habits, and classical music history.',
  },
}

const catalogTables = {
  works,
  composers,
  guides,
}

function workToCatalogItem(work: Work): CatalogItem {
  return {
    id: work.id,
    title: work.title,
    subtitle: work.composerName,
    detail: work.description,
    asset: work.asset,
    meta: work.year,
    period: work.period,
  }
}

function composerToCatalogItem(composer: Composer): CatalogItem {
  return {
    id: composer.id,
    title: composer.name,
    subtitle: composer.period,
    detail: composer.bio,
    asset: composer.asset,
    meta: composer.years,
  }
}

function guideToCatalogItem(guide: Guide): CatalogItem {
  return {
    id: guide.id,
    title: guide.title,
    subtitle: guide.type,
    detail: guide.description,
    asset: guide.asset,
    meta: guide.readTime,
  }
}

export function getCatalogItems(section: CatalogSection): CatalogItem[] {
  if (section === 'works') {
    return catalogTables.works.map(workToCatalogItem)
  }

  if (section === 'composers') {
    return catalogTables.composers.map(composerToCatalogItem)
  }

  return catalogTables.guides.map(guideToCatalogItem)
}

export function findCatalogItem(section: CatalogSection, id: string | undefined) {
  if (!id) {
    return undefined
  }

  return getCatalogItems(section).find((item) => item.id === id)
}
