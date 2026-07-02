import type { CatalogAssetKey } from './catalog-assets'

type ExploreItem = {
  title: string
  description: string
  asset: CatalogAssetKey
}

export const exploreItems: ExploreItem[] = [
  {
    title: 'Featured Works',
    description: 'Handpicked masterpieces',
    asset: 'symphony',
  },
  {
    title: 'Top Recordings',
    description: 'Highly rated by the community',
    asset: 'pianoConcerto',
  },
  {
    title: 'New Releases',
    description: 'The latest recordings',
    asset: 'chamberSonata',
  },
  {
    title: 'Composer Spotlight',
    description: 'Discover great composers',
    asset: 'composerAvatar',
  },
]
