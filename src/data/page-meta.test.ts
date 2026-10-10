import { describe, expect, it } from 'vitest'
import { getIndexablePages } from './page-meta'

// Titles, descriptions and canonical links are checked for every page in src/seo.test.ts.
describe('structured data', () => {
  it('describes works, composers and articles', () => {
    const types = new Set(getIndexablePages().map((page) => (page.jsonLd as Record<string, unknown> | undefined)?.['@type']))
    expect([...types]).toEqual(expect.arrayContaining(['WebSite', 'MusicComposition', 'Person', 'Article']))
  })
})
