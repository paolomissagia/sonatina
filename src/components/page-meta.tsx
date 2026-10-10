import { catalogAssets } from '@/assets/catalog-assets'
import { absoluteUrl, siteName, type PageMeta as Meta } from '@/data/page-meta'

/**
 * A page's title, description, canonical link, share card and structured data. React moves
 * the tags into the document head; the build does the same for the prerendered HTML.
 */
export function PageMeta({ title, description, path, image, type = 'website', jsonLd, noindex }: Meta) {
  const url = absoluteUrl(path)
  const imageUrl = image ? absoluteUrl(catalogAssets[image]) : undefined

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      <meta name="twitter:card" content={imageUrl ? 'summary_large_image' : 'summary'} />
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
