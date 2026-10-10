import { describe, expect, it } from 'vitest'
import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { findCatalogItem, getCatalogItems, matchesWorkFilter, workFilters } from './catalog'
import { composers, findComposer, formatLifespan } from './composers'
import { exploreCategories } from './explore-categories'
import { findGuide, getReadTime, guides } from './guides'
import { editorPicks } from './home'
import { genres } from '@/models/work'
import { findWork, formatDuration, formatKeyAndCatalogue, genreCovers, getWorkAsset, getWorkPeriod, works } from './works'

const sections = ['works', 'composers', 'guides'] as const
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

describe('catalog data', () => {
  for (const section of sections) {
    describe(section, () => {
      const items = getCatalogItems(section)

      it('has unique, URL-safe slugs', () => {
        expect(new Set(items.map((item) => item.id)).size).toBe(items.length)
        for (const item of items) {
          expect(item.id, item.title).toMatch(slug)
        }
      })

      it('only uses registered artwork', () => {
        for (const item of items) {
          expect(catalogAssets, item.title).toHaveProperty(item.asset)
        }
      })
    })
  }

  it('gives every composer their own portrait', () => {
    expect(new Set(composers.map((composer) => composer.asset)).size).toBe(composers.length)
  })

  it('shows every work with its genre cover, and a different cover for each genre', () => {
    for (const work of works) {
      expect(getWorkAsset(work), work.title).toBe(genreCovers[work.genre])
    }
    expect(new Set(Object.values(genreCovers)).size).toBe(genres.length)
  })

  it('has a credited cover for every genre', () => {
    for (const genre of genres) {
      expect(assetCredits[genreCovers[genre]], genre).toBeDefined()
    }
  })

  it('credits every image to its public-domain source', () => {
    for (const [key, credit] of Object.entries(assetCredits)) {
      expect(credit.artist, key).not.toBe('')
      expect(credit.year, key).not.toBe('')
      expect(credit.source, key).toMatch(/^https:\/\/commons\.wikimedia\.org\/wiki\/File:/)
    }
  })
})

describe('composers', () => {
  it('have plausible lives', () => {
    for (const composer of composers) {
      expect(composer.died.year - composer.born.year, composer.name).toBeGreaterThan(20)
      expect(composer.died.year - composer.born.year, composer.name).toBeLessThan(100)
      expect(composer.born.place, composer.name).not.toBe('')
      expect(composer.died.place, composer.name).not.toBe('')
    }
  })

  it('only quote with a source', () => {
    for (const composer of composers) {
      if (composer.quote) {
        expect(composer.quote.text, composer.name).not.toBe('')
        expect(composer.quote.source, composer.name).not.toBe('')
      }
    }
  })

  it('each have at least one work', () => {
    for (const composer of composers) {
      expect(works.some((work) => work.composerId === composer.id), composer.name).toBe(true)
    }
  })

  it('formats a lifespan with an en dash', () => {
    expect(formatLifespan(findComposer('bach')!)).toBe('1685–1750')
  })
})

describe('works', () => {
  it('link to a known composer', () => {
    for (const work of works) {
      expect(findComposer(work.composerId), work.title).toBeDefined()
    }
  })

  it('were written during their composer’s life', () => {
    for (const work of works) {
      const composer = findComposer(work.composerId)!
      expect(work.year, work.title).toBeGreaterThan(composer.born.year)
      expect(work.year, work.title).toBeLessThanOrEqual(composer.died.year)
    }
  })

  it('list their movements and a duration', () => {
    for (const work of works) {
      expect(work.movements.length, work.title).toBeGreaterThan(0)
      expect(work.durationMinutes, work.title).toBeGreaterThan(0)
    }
  })

  it('take their period from their composer', () => {
    expect(getWorkPeriod(findWork('debussy-clair-de-lune')!)).toBe('Modern')
    expect(getWorkPeriod(findWork('bach-goldberg-variations')!)).toBe('Baroque')
  })

  it('format durations and catalogue details', () => {
    expect(formatDuration(33)).toBe('33 min')
    expect(formatDuration(120)).toBe('2 h')
    expect(formatDuration(130)).toBe('2 h 10 min')
    expect(formatKeyAndCatalogue(findWork('beethoven-symphony-5')!)).toBe('C minor, Op. 67')
    expect(formatKeyAndCatalogue(findWork('stravinsky-rite-of-spring')!)).toBe('')
  })
})

describe('guides', () => {
  it('have sections with text', () => {
    for (const guide of guides) {
      expect(guide.sections.length, guide.title).toBeGreaterThan(0)
      for (const section of guide.sections) {
        expect(section.body.length, `${guide.title}: ${section.title}`).toBeGreaterThan(0)
      }
    }
  })

  it('only link to works that exist', () => {
    for (const guide of guides) {
      for (const workId of guide.workIds) {
        expect(findWork(workId), `${guide.title} → ${workId}`).toBeDefined()
      }
    }
  })

  it('estimate reading time from their length', () => {
    expect(getReadTime(findGuide('where-to-start')!)).toMatch(/^\d+ min read$/)
  })
})

describe('findCatalogItem', () => {
  it('finds an item by section and slug', () => {
    expect(findCatalogItem('works', 'beethoven-symphony-5')?.title).toBe('Symphony No. 5')
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

  it('points every explore category at a genre filter with results', () => {
    const items = getCatalogItems('works')

    for (const category of exploreCategories) {
      const genre = new URL(category.to, 'http://localhost').searchParams.get('genre') ?? ''
      expect(workFilters.map((filter) => filter.value), category.title).toContain(genre)
      expect(items.filter((item) => matchesWorkFilter(item, genre)).length, category.title).toBeGreaterThan(0)
    }
  })
})

describe('matchesWorkFilter', () => {
  const items = getCatalogItems('works')
  const titlesFor = (genre: string) =>
    items.filter((item) => matchesWorkFilter(item, genre)).map((item) => item.title)

  it('matches everything without a filter', () => {
    expect(titlesFor('')).toHaveLength(items.length)
  })

  it('has at least one work for every genre filter', () => {
    for (const filter of workFilters) {
      expect(titlesFor(filter.value).length, filter.label).toBeGreaterThan(0)
    }
  })

  it('groups works by genre', () => {
    expect(titlesFor('piano')).toEqual(
      expect.arrayContaining(['Clair de lune', 'Piano Sonata No. 14, “Moonlight”', 'Goldberg Variations']),
    )
    expect(titlesFor('concerto')).toEqual(expect.arrayContaining(['The Four Seasons', 'Brandenburg Concertos']))
    expect(titlesFor('chamber')).toEqual(expect.arrayContaining(['Cello Suite No. 1']))
    expect(items.filter((item) => matchesWorkFilter(item, 'opera')).every((item) => item.genre === 'Opera')).toBe(true)
  })

  it('matches nothing for an unknown filter', () => {
    expect(titlesFor('polka')).toEqual([])
  })
})
