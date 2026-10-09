import { composers, getComposerName } from './composers'
import { guides } from './guides'
import type { CatalogItem, CatalogSection } from '@/models/catalog'
import type { Composer } from '@/models/composer'
import type { Guide } from '@/models/guide'
import type { Work } from '@/models/work'
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
    subtitle: getComposerName(work.composerId),
    detail: work.description,
    asset: work.asset,
    form: work.form,
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

export const workFilters = [
  { label: 'All', value: '' },
  { label: 'Opera', value: 'Opera' },
  { label: 'Piano', value: 'Piano' },
  { label: 'Symphonies', value: 'Symphony' },
  { label: 'Chamber Music', value: 'Chamber Music' },
  { label: 'Concertos', value: 'Concerto' },
]

/** Whether a work belongs under a works-page filter. An empty filter matches everything. */
export function matchesWorkFilter(item: CatalogItem, activeType: string) {
  if (!activeType || !item.form) {
    return true
  }

  if (activeType === 'Piano') {
    return ['Piano miniature', 'Sonata', 'Variations'].includes(item.form)
  }

  if (activeType === 'Chamber Music') {
    return ['Suite', 'Serenade'].includes(item.form)
  }

  if (activeType === 'Symphony') {
    return item.form === 'Symphony'
  }

  if (activeType === 'Concerto') {
    return ['Concerto', 'Concertos'].includes(item.form)
  }

  return item.form === activeType
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
