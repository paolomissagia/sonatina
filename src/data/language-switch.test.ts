import { changeLanguage } from 'i18next'
import { afterEach, describe, expect, it } from 'vitest'
import { genreLabels } from '@/i18n'
import { catalogPageMeta, workFilters } from './catalog'
import { navItems } from './navigation'
import { findStation, getStations } from './stations'

// Labels built when a module loads must follow a language switch, since the app switches
// without reloading.
describe('switching language', () => {
  afterEach(async () => {
    await changeLanguage('en')
  })

  it('relabels navigation, filters, page titles and stations', async () => {
    await changeLanguage('de')
    expect(navItems.map((item) => item.label)).toContain('Werke')
    expect(catalogPageMeta.works.title).toBe('Werke')
    expect(workFilters[0].label).toBe('Alle')
    expect(genreLabels.Opera).toBe('Oper')
    expect(findStation('baroque')?.name).toBe('Barock')
  })

  it('sorts country stations in the new language', async () => {
    await changeLanguage('de')
    const names = getStations('country').map((station) => station.name)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
    expect(names).toContain('Deutschland')
  })
})
