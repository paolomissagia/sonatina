import { describe, expect, it } from 'vitest'
import { metaTags } from '@/seo'
import { site } from '@/site'
import { getIndexablePages, notFoundMeta, searchMeta } from './page-meta'

describe('page metadata for search engines and link previews', () => {
  const pages = getIndexablePages()

  it('gives every page its own path and title', () => {
    expect(new Set(pages.map((page) => page.path)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length)
  })

  it.each(pages.map((page) => [page.path, page] as const))('%s has a 50 to 160 character description and a share image', (_, page) => {
    expect(page.description.length).toBeGreaterThanOrEqual(50)
    expect(page.description.length).toBeLessThanOrEqual(160)
    expect(page.image?.alt.length).toBeGreaterThan(10)
    expect(page.noindex).toBeUndefined()
  })

  it('links each page to its canonical address', () => {
    const tags = metaTags(pages[1])
    expect(tags).toContainEqual({ tagName: 'link', rel: 'canonical', href: new URL(pages[1].path, site.url).href })
    expect(tags).toContainEqual({ property: 'og:url', content: new URL(pages[1].path, site.url).href })
  })

  it('keeps search and 404 out of search results', () => {
    for (const meta of [searchMeta('bach'), notFoundMeta()]) {
      const tags = metaTags(meta)
      expect(tags).toContainEqual({ name: 'robots', content: 'noindex' })
      expect(tags.some((tag) => 'rel' in tag && tag.rel === 'canonical')).toBe(false)
    }
  })

  it('describes works, composers and articles with structured data', () => {
    const types = new Set(pages.map((page) => page.jsonLd?.['@type']))
    expect([...types]).toEqual(expect.arrayContaining(['WebSite', 'MusicComposition', 'Person', 'Article']))
  })
})
