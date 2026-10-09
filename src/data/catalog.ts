import type { CatalogItem, CatalogSection } from '@/models/catalog'
import type { Composer } from '@/models/composer'
import type { Guide } from '@/models/guide'
import { genres, type Genre, type Work } from '@/models/work'
import { composers, formatLifespan, getComposerName } from './composers'
import { getReadTime, guides } from './guides'
import { getWorkAsset, getWorkPeriod, works } from './works'

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
    subtitle: composer.period,
    detail: composer.bio,
    asset: composer.asset,
    meta: formatLifespan(composer),
    keywords: [composer.nationality, ...composer.knownFor].join(' '),
  }
}

function guideToCatalogItem(guide: Guide): CatalogItem {
  return {
    id: guide.id,
    title: guide.title,
    subtitle: guide.type,
    detail: guide.description,
    asset: guide.asset,
    meta: getReadTime(guide),
    keywords: guide.category,
  }
}

const genreLabels: Record<Genre, string> = {
  Symphony: 'Symphonies',
  Concerto: 'Concertos',
  Orchestral: 'Orchestral',
  Keyboard: 'Piano & keyboard',
  Chamber: 'Chamber',
  Solo: 'Solo',
  Song: 'Song',
  Choral: 'Choral',
  Opera: 'Opera',
  Ballet: 'Ballet',
}

/** Works-page filters, linked as `/works?genre=<value>`. */
export const workFilters = [
  { label: 'All', value: '' },
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

  return catalogTables.guides.map(guideToCatalogItem)
}

export function findCatalogItem(section: CatalogSection, id: string | undefined) {
  if (!id) {
    return undefined
  }

  return getCatalogItems(section).find((item) => item.id === id)
}
