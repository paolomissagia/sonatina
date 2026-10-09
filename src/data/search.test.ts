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
    expect(titles('beethoven')).toEqual([
      'Symphony No. 5',
      'Piano Sonata No. 14, “Moonlight”',
      'Fidelio',
      'Ludwig van Beethoven',
    ])
  })

  it('finds works by catalogue number, key and nickname', () => {
    expect(titles('op. 67')).toEqual(['Symphony No. 5'])
    expect(titles('BWV 988')).toEqual(['Goldberg Variations'])
    expect(titles('moonlight')).toContain('Piano Sonata No. 14, “Moonlight”')
    expect(titles('minor op. 17')).toEqual(['Piano Trio'])
  })

  it('requires every term to match', () => {
    expect(titles('beethoven sonata')).toEqual(['Piano Sonata No. 14, “Moonlight”', 'Ludwig van Beethoven'])
  })

  it('handles accented names', () => {
    expect(titles('dvořák')).toContain('Antonín Dvořák')
  })

  it('tags each result with its section', () => {
    const categories = searchCatalog('bach').map((result) => result.category)
    expect(new Set(categories)).toEqual(new Set(['works', 'composers', 'guides']))
  })

  it('returns nothing when no item matches', () => {
    expect(searchCatalog('xylophone')).toEqual([])
  })
})
