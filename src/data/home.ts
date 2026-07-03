import type { CatalogAssetKey } from './catalog-assets'

export type HomeExploreCategory = {
  title: string
  description: string
  asset: CatalogAssetKey
  to: string
}

export type EditorPick = {
  type: string
  title: string
  subtitle: string
  meta: string
  asset: CatalogAssetKey
  to: string
}

export const homeExploreCategories: HomeExploreCategory[] = [
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

export const editorPicks: EditorPick[] = [
  {
    type: 'Work',
    title: 'Symphony No. 5',
    subtitle: 'Ludwig van Beethoven',
    meta: '1808',
    asset: 'symphony',
    to: '/works/1',
  },
  {
    type: 'Composer',
    title: 'Wolfgang Amadeus Mozart',
    subtitle: 'Classical',
    meta: '1756-1791',
    asset: 'composerAvatar',
    to: '/composers/2',
  },
  {
    type: 'Guide',
    title: 'Where to start with symphonies',
    subtitle: 'Listening guide',
    meta: '8 min read',
    asset: 'violinConcerto',
    to: '/guides/1',
  },
  {
    type: 'Work',
    title: 'Clair de lune',
    subtitle: 'Claude Debussy',
    meta: '1905',
    asset: 'pianoConcerto',
    to: '/works/5',
  },
]
