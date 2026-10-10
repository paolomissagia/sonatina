import { describe, expect, it } from 'vitest'
import { composers } from './composers'
import { eras, findEra, getComposersByEra, getEraArticle, getEraStation } from './eras'

describe('eras', () => {
  it('cover every composer exactly once', () => {
    const listed = eras.flatMap((era) => getComposersByEra(era).map((composer) => composer.id))
    expect(listed.sort()).toEqual(composers.map((composer) => composer.id).sort())
  })

  it('each have a article and a radio station', () => {
    for (const era of eras) {
      expect(getEraArticle(era), era.period).toBeDefined()
      expect(getEraStation(era)?.name, era.period).toBe(era.period)
    }
  })

  it('list composers oldest first', () => {
    const years = getComposersByEra(findEra('baroque')!).map((composer) => composer.born.year)
    expect(years).toEqual([...years].sort((a, b) => a - b))
  })

  it('are found by id', () => {
    expect(findEra('romantic')?.period).toBe('Romantic')
    expect(findEra('rococo')).toBeUndefined()
    expect(findEra(null)).toBeUndefined()
  })
})
