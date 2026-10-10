import { describe, expect, it } from 'vitest'
import { composers, findComposer, getRecommendedComposers } from './composers'
import { findArticle, getRecommendedArticles, articles } from './articles'
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

    const cello = findWork('dvorak-cello-concerto')!
    const [first, ...rest] = getRecommendedWorks(cello)
    expect(first.composerId).toBe('dvorak')
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

describe('getRecommendedArticles', () => {
  it('never recommends the article itself', () => {
    for (const article of articles) {
      expect(getRecommendedArticles(article).map((candidate) => candidate.id)).not.toContain(article.id)
    }
  })

  it('puts articles from the same category first', () => {
    const article = findArticle('your-first-opera')!
    expect(getRecommendedArticles(article)[0].category).toBe(article.category)
  })
})
