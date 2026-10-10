import { catalogAssets, type CatalogAssetKey } from '@/assets/catalog-assets'
import type { Article } from '@/models/article'
import type { Composer } from '@/models/composer'
import type { Work } from '@/models/work'
import { articles } from './articles'
import { catalogPageMeta } from './catalog'
import { composers, getComposerName } from './composers'
import { getWorkAsset, works } from './works'

/** Where the site lives. Links in search results and shared cards are built from it. */
export const siteUrl = 'https://sonatina.vercel.app'

export const siteName = 'Sonatina'

export type PageMeta = {
  title: string
  /** For search results and link previews; about 160 characters at most. */
  description: string
  /** The page's own address, e.g. `/works/bach-goldberg-variations`. */
  path: string
  image?: CatalogAssetKey
  type?: 'website' | 'article' | 'profile'
  /** Structured data (schema.org) describing what the page is about. */
  jsonLd?: Record<string, unknown>
  /** Pages that shouldn't appear in search results, such as search itself. */
  noindex?: boolean
}

const descriptionLength = 160

/** Joins sentences and cuts them at a word boundary, so the description fits in a result. */
function summarize(...parts: string[]) {
  const text = parts.join(' ').replace(/\s+/g, ' ').trim()
  if (text.length <= descriptionLength) {
    return text
  }

  const cut = text.slice(0, descriptionLength - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.]$/, '')}…`
}

export const absoluteUrl = (path: string) => new URL(path, siteUrl).href

const imageUrl = (key: CatalogAssetKey) => absoluteUrl(catalogAssets[key])

export const homeMeta: PageMeta = {
  title: 'Sonatina · Discover classical music',
  description:
    'A friendly guide to classical music: explore composers and their essential works, read short articles, and listen to great recordings or leave the radio on.',
  path: '/',
  image: 'burgtheaterAuditorium',
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: absoluteUrl('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absoluteUrl('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
}

export function listingMeta(view: 'works' | 'composers' | 'articles'): PageMeta {
  const page = catalogPageMeta[view]
  return { title: `${page.title} · ${siteName}`, description: page.description, path: `/${view}` }
}

export const radioMeta: PageMeta = {
  title: `Radio · ${siteName}`,
  description: 'Free classical music radio: pick a station by genre, era or country and let the catalogue play, one movement at a time.',
  path: '/radio',
}

export const aboutMeta: PageMeta = {
  title: `About · ${siteName}`,
  description: 'Why Sonatina exists, where its recordings and paintings come from, and how it is made.',
  path: '/about',
}

export const searchMeta: PageMeta = {
  title: `Search · ${siteName}`,
  description: 'Find works, composers and articles.',
  path: '/search',
  noindex: true,
}

export const notFoundMeta: PageMeta = {
  title: `Page not found · ${siteName}`,
  description: 'This page doesn’t exist. It may have moved, or the link may be incorrect.',
  path: '/404',
  noindex: true,
}

export function workMeta(work: Work): PageMeta {
  const composer = getComposerName(work.composerId)
  const path = `/works/${work.id}`
  return {
    title: `${work.title} · ${composer} · ${siteName}`,
    description: summarize(work.description, work.overview),
    path,
    image: getWorkAsset(work),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MusicComposition',
      name: work.title,
      alternateName: work.nickname,
      composer: { '@type': 'Person', name: composer, url: absoluteUrl(`/composers/${work.composerId}`) },
      dateCreated: String(work.year),
      genre: work.genre,
      musicalKey: work.key,
      description: work.description,
      url: absoluteUrl(path),
      image: imageUrl(getWorkAsset(work)),
      identifier: work.catalogue,
    },
  }
}

export function composerMeta(composer: Composer): PageMeta {
  const path = `/composers/${composer.id}`
  return {
    title: `${composer.name} · ${siteName}`,
    description: summarize(composer.bio, composer.overview),
    path,
    image: composer.asset,
    type: 'profile',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: composer.name,
      birthDate: String(composer.born.year),
      birthPlace: composer.born.place,
      deathDate: String(composer.died.year),
      deathPlace: composer.died.place,
      nationality: composer.nationality,
      jobTitle: 'Composer',
      description: composer.bio,
      url: absoluteUrl(path),
      image: imageUrl(composer.asset),
    },
  }
}

export function articleMeta(article: Article): PageMeta {
  const path = `/articles/${article.id}`
  return {
    title: `${article.title} · ${siteName}`,
    description: summarize(article.description),
    path,
    image: article.asset,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: imageUrl(article.asset),
      url: absoluteUrl(path),
      publisher: { '@type': 'Organization', name: siteName, url: absoluteUrl('/') },
    },
  }
}

/** Every page worth listing in the sitemap, in a stable order. */
export function getIndexablePages(): PageMeta[] {
  return [
    homeMeta,
    listingMeta('works'),
    listingMeta('composers'),
    listingMeta('articles'),
    radioMeta,
    aboutMeta,
    ...works.map(workMeta),
    ...composers.map(composerMeta),
    ...articles.map(articleMeta),
  ]
}
