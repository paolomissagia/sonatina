import type { MetaDescriptor } from 'react-router'
import { site } from './site'

export type PageImage = {
  /** Absolute, or relative to the site. */
  url: string
  /** What the image shows, for people who can't see it. */
  alt: string
}

/** What search engines and link previews read about a page. */
export type PageMeta = {
  title: string
  /** For search results and link previews: 50 to 160 characters. */
  description: string
  /** The page's own path, e.g. `/works/bach-goldberg-variations`; the canonical link points here. */
  path: string
  image?: PageImage
  /** Open Graph type. */
  type?: 'website' | 'article' | 'profile'
  /** schema.org structured data describing what the page is about. */
  jsonLd?: Record<string, unknown>
  /** For pages that shouldn't appear in search results, such as search or 404. */
  noindex?: boolean
}

export const absoluteUrl = (path: string) => new URL(path, site.url).href

/** A route's `meta` tags: title, description, canonical link, share card and structured data. */
export function metaTags({ title, description, path, image, type = 'website', jsonLd, noindex }: PageMeta): MetaDescriptor[] {
  const url = absoluteUrl(path)
  return [
    { title },
    { name: 'description', content: description },
    noindex ? { name: 'robots', content: 'noindex' } : { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:site_name', content: site.name },
    { property: 'og:locale', content: site.locale },
    { property: 'og:type', content: type },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    ...(image
      ? [
          { property: 'og:image', content: absoluteUrl(image.url) },
          { property: 'og:image:alt', content: image.alt },
        ]
      : []),
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    ...(jsonLd ? [{ 'script:ld+json': jsonLd }] : []),
  ]
}
