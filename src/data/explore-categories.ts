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
    description: 'Sonatas, nocturnes, and miniatures',
    asset: 'categoryPiano',
    to: '/works?genre=piano',
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
