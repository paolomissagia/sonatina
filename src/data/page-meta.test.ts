import { describe, expect, it } from 'vitest'
import { getIndexablePages } from './page-meta'

describe('page metadata', () => {
  const pages = getIndexablePages()

  it('gives every page its own path and title', () => {
    expect(new Set(pages.map((page) => page.path)).size).toBe(pages.length)
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length)
  })

  it('keeps descriptions short enough for search results', () => {
    for (const page of pages) {
      expect(page.description.length, page.path).toBeGreaterThan(30)
      expect(page.description.length, page.path).toBeLessThanOrEqual(160)
    }
  })

  it('describes works, composers and articles with structured data', () => {
    const types = new Set(pages.map((page) => page.jsonLd?.['@type']))
    expect([...types]).toEqual(expect.arrayContaining(['WebSite', 'MusicComposition', 'Person', 'Article']))
  })
})
