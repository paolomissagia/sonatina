import { getIndexablePages } from '@/data/page-meta'
import { absoluteUrl } from '@/seo'

/** The sitemap, prerendered to sitemap.xml from the same pages the site renders. */
export function loader() {
  const today = new Date().toISOString().slice(0, 10)
  const urls = getIndexablePages()
    .map(({ path }) => `  <url>\n    <loc>${absoluteUrl(path)}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n')
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
