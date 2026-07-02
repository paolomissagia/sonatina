import chamberSonata from '@/assets/catalog/chamber-sonata.png'
import composerAvatar from '@/assets/catalog/composer-avatar.png'
import composerBaroque from '@/assets/catalog/composer-baroque.png'
import composerModern from '@/assets/catalog/composer-modern.png'
import composerRomantic from '@/assets/catalog/composer-romantic.png'
import pianoConcerto from '@/assets/catalog/piano-concerto.png'
import symphony from '@/assets/catalog/symphony.png'
import violinConcerto from '@/assets/catalog/violin-concerto.png'
import heroArtwork from '@/assets/classical-dashboard-hero.png'

export const catalogAssets = {
  chamberSonata,
  composerAvatar,
  composerBaroque,
  composerModern,
  composerRomantic,
  heroArtwork,
  pianoConcerto,
  symphony,
  violinConcerto,
}

export type CatalogAssetKey = keyof typeof catalogAssets
