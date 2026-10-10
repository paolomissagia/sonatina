import { describe, expect, it } from 'vitest'
import { searchCatalog } from './search'

const titles = (query: string) => searchCatalog(query).map((result) => result.title)

describe('searchCatalog', () => {
  it('returns nothing for a blank query', () => {
    expect(searchCatalog('')).toEqual([])
    expect(searchCatalog('   ')).toEqual([])
  })

  it('ignores case and surrounding whitespace', () => {
    expect(titles('  BEETHOVEN ')).toEqual(titles('beethoven'))
  })

  it('finds works by their composer’s name', () => {
    expect(titles('beethoven')).toEqual(
      expect.arrayContaining(['Symphony No. 5 in C minor, Op. 67', 'Piano Sonata No. 14, “Moonlight”', 'Fidelio', 'Ludwig van Beethoven']),
    )
    // Works by other composers can match too, when their description mentions Beethoven.
    const ownWorks = searchCatalog('beethoven').filter((result) => result.subtitle === 'Ludwig van Beethoven')
    expect(ownWorks.length).toBeGreaterThanOrEqual(7)
  })

  it('finds works by catalogue number, key and nickname', () => {
    expect(titles('op. 67')).toEqual(expect.arrayContaining(['Symphony No. 5 in C minor, Op. 67', 'Peter and the Wolf']))
    expect(titles('BWV 988')).toEqual(['Goldberg Variations'])
    expect(titles('moonlight')).toContain('Piano Sonata No. 14, “Moonlight”')
    expect(titles('d minor bwv 1043')).toEqual(['Concerto for Two Violins in D minor, BWV 1043'])
  })

  it('requires every term to match', () => {
    const results = titles('beethoven sonata')
    expect(results).toEqual(expect.arrayContaining(['Piano Sonata No. 14, “Moonlight”', 'Piano Sonata No. 8, “Pathétique”']))
    expect(results).not.toContain('Symphony No. 5 in C minor, Op. 67')
  })

  it('handles accented names', () => {
    expect(titles('dvořák')).toContain('Antonín Dvořák')
  })

  it('tags each result with its section', () => {
    const categories = searchCatalog('bach').map((result) => result.category)
    expect(new Set(categories)).toEqual(new Set(['works', 'composers', 'articles']))
  })

  it('returns nothing when no item matches', () => {
    expect(searchCatalog('xylophone')).toEqual([])
  })
})
