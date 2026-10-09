import type { HomeExploreCategory } from '@/models/home'

export const exploreCategories: HomeExploreCategory[] = [
  {
    title: 'Opera',
    description: 'Voices, drama, and stage works',
    asset: 'categoryOpera',
    to: '/works?type=Opera',
  },
  {
    title: 'Piano',
    description: 'Sonatas, concertos, and miniatures',
    asset: 'categoryPiano',
    to: '/works?type=Piano',
  },
  {
    title: 'Symphonies',
    description: 'Large-scale orchestral landmarks',
    asset: 'categorySymphony',
    to: '/works?type=Symphony',
  },
  {
    title: 'Chamber Music',
    description: 'Quartets, suites, and intimate forms',
    asset: 'categoryChamber',
    to: '/works?type=Chamber%20Music',
  },
]
