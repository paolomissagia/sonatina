import { describe, expect, it } from 'vitest'
import { composers, findComposer, getRecommendedComposers } from './composers'
import { findGuide, getRecommendedGuides, guides } from './guides'
import { findWork, getRecommendedWorks, getWorkPeriod, getWorksByComposer, works } from './works'

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
    expect(getRecommendedWorks(fifth).every((work) => work.composerId === 'beethoven')).toBe(true)

    const carmen = findWork('bizet-carmen')!
    const [first, ...rest] = getRecommendedWorks(carmen)
    expect(first.composerId).toBe('bizet')
    expect(rest.every((work) => getWorkPeriod(work) === 'Romantic')).toBe(true)
  })
})

describe('getWorksByComposer', () => {
  it('returns only that composer’s works', () => {
    const bach = getWorksByComposer('bach')
    expect(bach.length).toBeGreaterThan(3)
    expect(bach.every((work) => work.composerId === 'bach')).toBe(true)
    expect(bach.map((work) => work.title)).toContain('Goldberg Variations')
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
    const guide = findGuide('your-first-opera')!
    expect(getRecommendedGuides(guide)[0].category).toBe(guide.category)
  })
})
