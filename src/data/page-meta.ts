import { assetCredits, catalogAssets, type CatalogAssetKey } from '@/assets/catalog-assets'
import type { PageImage, PageMetaProps } from '@/components/page-meta'
import type { Article } from '@/models/article'
import type { Composer } from '@/models/composer'
import type { Work } from '@/models/work'
import { site } from '@/site'
import { articles } from './articles'
import { catalogPageMeta } from './catalog'
import { composers, getComposerName } from './composers'
import { getWorkAsset, works } from './works'

/*
 * Each page's title, description, share image and structured data, for <PageMeta>.
 * Built from the catalogue, so pages and the sitemap never drift from the content.
 */

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

const absolute = (path: string) => new URL(path, site.url).href

/** A catalogue painting or portrait as the share image, described from its credit. */
function image(key: CatalogAssetKey, alt?: string): PageImage {
  const credit = assetCredits[key]
  return {
    url: catalogAssets[key],
    alt: alt ?? (credit.title ? `${credit.title}, by ${credit.artist}` : `Portrait by ${credit.artist}`),
  }
}

const hall = image('burgtheaterAuditorium')

export const homeMeta: PageMetaProps = {
  title: 'Sonatina · Discover classical music',
  description:
    'A friendly guide to classical music: explore composers and their essential works, read short articles, and listen to great recordings or leave the radio on.',
  path: '/',
  image: hall,
  jsonLd: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: absolute('/'),
    potentialAction: {
      '@type': 'SearchAction',
      target: `${absolute('/search')}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  },
}

export function listingMeta(view: 'works' | 'composers' | 'articles'): PageMetaProps {
  const page = catalogPageMeta[view]
  return { title: `${page.title} · ${site.name}`, description: page.description, path: `/${view}`, image: hall }
}

export const radioMeta: PageMetaProps = {
  title: `Radio · ${site.name}`,
  description: 'Free classical music radio: pick a station by genre, era or country and let the catalogue play, one movement at a time.',
  path: '/radio',
  image: hall,
}

export const aboutMeta: PageMetaProps = {
  title: `About · ${site.name}`,
  description: 'Why Sonatina exists, where its recordings and paintings come from, and how it is made.',
  path: '/about',
  image: hall,
}

export const searchMeta: PageMetaProps = {
  title: `Search · ${site.name}`,
  description: 'Find works, composers and articles.',
  path: '/search',
  noindex: true,
}

export const notFoundMeta: PageMetaProps = {
  title: `Page not found · ${site.name}`,
  description: 'This page doesn’t exist. It may have moved, or the link may be incorrect.',
  path: '/404',
  noindex: true,
}

export function workMeta(work: Work): PageMetaProps {
  const composer = getComposerName(work.composerId)
  const path = `/works/${work.id}`
  const cover = getWorkAsset(work)
  return {
    title: `${work.title} · ${composer} · ${site.name}`,
    description: summarize(work.description, work.overview),
    path,
    image: image(cover),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'MusicComposition',
      name: work.title,
      alternateName: work.nickname,
      composer: { '@type': 'Person', name: composer, url: absolute(`/composers/${work.composerId}`) },
      dateCreated: String(work.year),
      genre: work.genre,
      musicalKey: work.key,
      identifier: work.catalogue,
      description: work.description,
      url: absolute(path),
      image: absolute(catalogAssets[cover]),
    },
  }
}

export function composerMeta(composer: Composer): PageMetaProps {
  const path = `/composers/${composer.id}`
  return {
    title: `${composer.name} · ${site.name}`,
    description: summarize(composer.bio, composer.overview),
    path,
    image: image(composer.asset, `Portrait of ${composer.name}`),
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
      url: absolute(path),
      image: absolute(catalogAssets[composer.asset]),
    },
  }
}

export function articleMeta(article: Article): PageMetaProps {
  const path = `/articles/${article.id}`
  return {
    title: `${article.title} · ${site.name}`,
    description: summarize(article.description),
    path,
    image: image(article.asset),
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      image: absolute(catalogAssets[article.asset]),
      url: absolute(path),
      publisher: { '@type': 'Organization', name: site.name, url: absolute('/') },
    },
  }
}

/** Every page for the sitemap, in a stable order. */
export function getIndexablePages(): PageMetaProps[] {
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
