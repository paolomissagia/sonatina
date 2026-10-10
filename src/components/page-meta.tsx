import { site } from '../site'

export type PageImage = {
  /** Absolute, or relative to the site. Ideally 1200 × 630, PNG or JPEG. */
  url: string
  width?: number
  height?: number
  /** What the image shows, for people who can't see it. */
  alt: string
}

export type PageMetaProps = {
  title: string
  /** For search results and link previews: 50 to 160 characters. */
  description: string
  /** The page's own path, e.g. `/works/goldberg-variations`; the canonical link points here. */
  path: string
  image?: PageImage
  /** Open Graph type: website, article or profile. */
  type?: 'website' | 'article' | 'profile'
  /** schema.org structured data describing what the page is about. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  /** For pages that shouldn't appear in search results, such as search or 404. */
  noindex?: boolean
}

const absolute = (url: string) => new URL(url, site.url).href

/**
 * A page's title, description, canonical link, share card and structured data. Render it
 * once per page: React moves the tags into the head, and scripts/prerender.mjs does the
 * same for the static HTML.
 */
export function PageMeta({ title, description, path, image, type = 'website', jsonLd, noindex }: PageMetaProps) {
  const url = absolute(path)

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content={site.locale} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image ? (
        <>
          <meta property="og:image" content={absolute(image.url)} />
          {image.width ? <meta property="og:image:width" content={String(image.width)} /> : null}
          {image.height ? <meta property="og:image:height" content={String(image.height)} /> : null}
          <meta property="og:image:alt" content={image.alt} />
        </>
      ) : null}
      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      {jsonLd ? (
        <script
          type="application/ld+json"
          // Escaped so text in the data can't close the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
      ) : null}
    </>
  )
}
