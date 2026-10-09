import { describe, expect, it } from 'vitest'
import { composers, findComposer, getRecommendedComposers } from './composers'
import { findGuide, getRecommendedGuides, guides } from './guides'
import { findWork, getRecommendedWorks, getWorksByComposer, works } from './works'

describe('getRecommendedWorks', () => {
  it('never recommends the work itself, and returns at most four', () => {
    for (const work of works) {
      const recommended = getRecommendedWorks(work)
      expect(recommended.map((candidate) => candidate.id)).not.toContain(work.id)
      expect(recommended.length).toBeLessThanOrEqual(4)
    }
  })

  it('puts the same composer first, then the same period', () => {
    const fifth = findWork('beethoven-symphony-5')!
    expect(getRecommendedWorks(fifth).map((work) => work.title)).toEqual([
      'Piano Sonata No. 14, “Moonlight”',
      'Fidelio',
      'Requiem',
      'Eine kleine Nachtmusik',
    ])
  })
})

describe('getWorksByComposer', () => {
  it('returns only that composer’s works', () => {
    expect(getWorksByComposer('bach').map((work) => work.title)).toEqual([
      'Cello Suite No. 1',
      'Goldberg Variations',
      'Brandenburg Concertos',
    ])
  })

  it('returns nothing for an unknown composer', () => {
    expect(getWorksByComposer('nobody')).toEqual([])
  })
})

describe('getRecommendedComposers', () => {
  it('never recommends the composer themselves', () => {
    for (const composer of composers) {
      expect(getRecommendedComposers(composer).map((candidate) => candidate.id)).not.toContain(composer.id)
    }
  })

  it('puts composers from the same period first', () => {
    expect(getRecommendedComposers(findComposer('bach')!)[0].name).toBe('Antonio Vivaldi')
  })
})

describe('getRecommendedGuides', () => {
  it('never recommends the guide itself', () => {
    for (const guide of guides) {
      expect(getRecommendedGuides(guide).map((candidate) => candidate.id)).not.toContain(guide.id)
    }
  })

  it('puts guides from the same category first', () => {
    expect(getRecommendedGuides(findGuide('your-first-opera')!)[0].category).toBe('Genres')
  })
})
