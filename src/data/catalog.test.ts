import { describe, expect, it } from 'vitest'
import { catalogAssets } from '@/assets/catalog-assets'
import { findCatalogItem, getCatalogItems, matchesWorkFilter, workFilters } from './catalog'
import { composers, findComposer } from './composers'
import { exploreCategories } from './explore-categories'
import { guides } from './guides'
import { editorPicks } from './home'
import { works } from './works'

const sections = ['works', 'composers', 'guides'] as const

describe('catalog data', () => {
  for (const section of sections) {
    describe(section, () => {
      const items = getCatalogItems(section)

      it('has unique ids', () => {
        expect(new Set(items.map((item) => item.id)).size).toBe(items.length)
      })

      it('only uses registered artwork', () => {
        for (const item of items) {
          expect(catalogAssets, item.title).toHaveProperty(item.asset)
        }
      })
    })
  }

  it('links every work to a known composer', () => {
    for (const work of works) {
      expect(findComposer(work.composerId), work.title).toBeDefined()
    }
  })

  it('numbers every work’s movements', () => {
    for (const work of works) {
      expect(work.movements.length, work.title).toBeGreaterThan(0)
    }
  })

  it('gives every composer an overview and something they are known for', () => {
    for (const composer of composers) {
      expect(composer.overview, composer.name).not.toBe('')
      expect(composer.knownFor.length, composer.name).toBeGreaterThan(0)
    }
  })

  it('gives every composer their own credited portrait', () => {
    expect(new Set(composers.map((composer) => composer.asset)).size).toBe(composers.length)

    for (const composer of composers) {
      expect(composer.portrait.artist, composer.name).not.toBe('')
      expect(composer.portrait.source, composer.name).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
    }
  })

  it('gives every guide at least one section', () => {
    for (const guide of guides) {
      expect(guide.sections.length, guide.title).toBeGreaterThan(0)
    }
  })
})

describe('findCatalogItem', () => {
  it('finds an item by section and id', () => {
    expect(findCatalogItem('works', '1')?.title).toBe('Symphony No. 5')
  })

  it('returns undefined for unknown or missing ids', () => {
    expect(findCatalogItem('works', 'nope')).toBeUndefined()
    expect(findCatalogItem('works', undefined)).toBeUndefined()
  })
})

describe('home page data', () => {
  it('resolves every editor’s pick to a catalog item', () => {
    expect(editorPicks).toHaveLength(4)

    for (const pick of editorPicks) {
      const [, section, id] = pick.to.split('/')
      expect(findCatalogItem(section as (typeof sections)[number], id)?.title).toBe(pick.title)
    }
  })

  it('points every explore category at a works filter with results', () => {
    const items = getCatalogItems('works')

    for (const category of exploreCategories) {
      const type = new URL(category.to, 'http://localhost').searchParams.get('type') ?? ''
      expect(workFilters.map((filter) => filter.value), category.title).toContain(type)
      expect(items.filter((item) => matchesWorkFilter(item, type)).length, category.title).toBeGreaterThan(0)
    }
  })
})

describe('matchesWorkFilter', () => {
  const items = getCatalogItems('works')
  const titlesFor = (type: string) =>
    items.filter((item) => matchesWorkFilter(item, type)).map((item) => item.title)

  it('matches everything without a filter', () => {
    expect(titlesFor('')).toHaveLength(items.length)
  })

  it('groups piano forms under Piano', () => {
    expect(titlesFor('Piano')).toEqual(['Clair de lune', 'Piano Sonata No. 14', 'Goldberg Variations'])
  })

  it('treats single and collected concertos alike', () => {
    expect(titlesFor('Concerto')).toEqual(['The Four Seasons', 'Brandenburg Concertos'])
  })

  it('matches nothing for an unknown filter', () => {
    expect(titlesFor('Polka')).toEqual([])
  })
})
