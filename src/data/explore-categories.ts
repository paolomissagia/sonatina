import type { HomeExploreCategory } from '@/models/home'

export const exploreCategories: HomeExploreCategory[] = [
  {
    title: 'Opera',
    description: 'Voices, drama, and stage works',
    asset: 'categoryOpera',
    to: '/works?genre=opera',
  },
  {
    title: 'Piano',
    description: 'Sonatas, miniatures, and keyboard classics',
    asset: 'categoryPiano',
    to: '/works?genre=keyboard',
  },
  {
    title: 'Symphonies',
    description: 'Large-scale orchestral landmarks',
    asset: 'categorySymphony',
    to: '/works?genre=symphony',
  },
  {
    title: 'Chamber Music',
    description: 'Trios, serenades, and intimate forms',
    asset: 'categoryChamber',
    to: '/works?genre=chamber',
  },
]
