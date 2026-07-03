import type { HomeExploreCategory } from '@/models/home'

export const exploreCategories: HomeExploreCategory[] = [
  {
    title: 'Opera',
    description: 'Voices, drama, and stage works',
    asset: 'operaCurtain',
    to: '/works',
  },
  {
    title: 'Piano',
    description: 'Sonatas, concertos, and miniatures',
    asset: 'pianoKeys',
    to: '/works/5',
  },
  {
    title: 'Symphonies',
    description: 'Large-scale orchestral landmarks',
    asset: 'symphonyOrchestra',
    to: '/works/1',
  },
  {
    title: 'Chamber Music',
    description: 'Quartets, suites, and intimate forms',
    asset: 'chamberMusicCategory',
    to: '/guides/3',
  },
]
