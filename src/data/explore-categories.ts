import type { HomeExploreCategory } from '@/models/home'
import { t } from '@/i18n'

export const exploreCategories: HomeExploreCategory[] = [
  {
    title: t('explore_opera'),
    description: t('explore_opera_text'),
    asset: 'categoryOpera',
    to: '/works?genre=opera',
  },
  {
    title: t('explore_piano'),
    description: t('explore_piano_text'),
    asset: 'categoryPiano',
    to: '/works?genre=piano',
  },
  {
    title: t('explore_symphonies'),
    description: t('explore_symphonies_text'),
    asset: 'categorySymphony',
    to: '/works?genre=symphony',
  },
  {
    title: t('explore_chamber'),
    description: t('explore_chamber_text'),
    asset: 'categoryChamber',
    to: '/works?genre=chamber',
  },
]
