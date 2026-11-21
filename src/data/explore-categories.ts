import type { HomeExploreCategory } from '@/models/home'
import { t } from '@/i18n'

export const exploreCategories: HomeExploreCategory[] = [
  {
    get title() {
      return t('explore_opera')
    },
    get description() {
      return t('explore_opera_text')
    },
    asset: 'categoryOpera',
    to: '/works?genre=opera',
  },
  {
    get title() {
      return t('explore_piano')
    },
    get description() {
      return t('explore_piano_text')
    },
    asset: 'categoryPiano',
    to: '/works?genre=piano',
  },
  {
    get title() {
      return t('explore_symphonies')
    },
    get description() {
      return t('explore_symphonies_text')
    },
    asset: 'categorySymphony',
    to: '/works?genre=symphony',
  },
  {
    get title() {
      return t('explore_chamber')
    },
    get description() {
      return t('explore_chamber_text')
    },
    asset: 'categoryChamber',
    to: '/works?genre=chamber',
  },
]
