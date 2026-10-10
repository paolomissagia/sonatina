import { describe, expect, it } from 'vitest'
import { notFoundPath, render, routes, site, unlisted } from './entry-server'

/*
 * Checks every prerendered page the way a search engine would read it. Copied unchanged
 * from the template (dotfiles/templates/vite-react).
 */

const headTags = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)+/

function head(path: string) {
  const html = render(path).match(headTags)?.[0] ?? ''
  const attribute = (pattern: RegExp) => [...html.matchAll(pattern)].map((match) => decode(match[1]))
  return {
    titles: attribute(/<title>([\s\S]*?)<\/title>/g),
    descriptions: attribute(/<meta name="description" content="([^"]*)"/g),
    canonical: attribute(/<link rel="canonical" href="([^"]*)"/g),
    images: attribute(/<meta property="og:image" content="([^"]*)"/g),
    noindex: html.includes('<meta name="robots" content="noindex"/>'),
  }
}

const decode = (text: string) =>
  text.replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')

describe('pages for search engines', () => {
  const listed = routes().map((route) => route.path)

  it('lists each page once', () => {
    expect(new Set(listed).size).toBe(listed.length)
    expect(listed).toContain('/')
  })

  it.each(listed)('%s has one title, a description, a canonical link and a share image', (path) => {
    const page = head(path)
    expect(page.titles).toHaveLength(1)
    expect(page.descriptions).toHaveLength(1)
    expect(page.descriptions[0].length).toBeGreaterThanOrEqual(50)
    expect(page.descriptions[0].length).toBeLessThanOrEqual(160)
    expect(page.canonical).toEqual([new URL(path, site.url).href])
    expect(page.images).toHaveLength(1)
    expect(page.noindex).toBe(false)
  })

  it('gives every listed page its own title', () => {
    const titles = listed.map((path) => head(path).titles[0])
    expect(new Set(titles).size).toBe(titles.length)
  })

  it.each([...unlisted, ...(notFoundPath ? [notFoundPath] : [])])('%s stays out of search results', (path) => {
    const page = head(path)
    expect(page.titles).toHaveLength(1)
    expect(page.noindex).toBe(true)
  })
})
