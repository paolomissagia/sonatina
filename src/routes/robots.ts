import { absoluteUrl } from '@/seo'

/** robots.txt, prerendered: crawl everything, and here is the sitemap. */
export function loader() {
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
