import chamberSonata from '@/assets/catalog/chamber-sonata.png'
import chamberMusicCategory from '@/assets/home/chamber-music.png'
import composerAvatar from '@/assets/catalog/composer-avatar.png'
import composerBaroque from '@/assets/catalog/composer-baroque.png'
import composerBeethoven from '@/assets/catalog/composer-beethoven.png'
import composerDebussy from '@/assets/catalog/composer-debussy.png'
import composerRomantic from '@/assets/catalog/composer-romantic.png'
import composerStravinsky from '@/assets/catalog/composer-stravinsky.png'
import operaCurtain from '@/assets/home/opera-curtain.png'
import pianoKeys from '@/assets/home/piano-keys.png'
import pianoConcerto from '@/assets/catalog/piano-concerto.png'
import symphony from '@/assets/catalog/symphony.png'
import symphonyOrchestra from '@/assets/home/symphony-orchestra.png'
import violinConcerto from '@/assets/catalog/violin-concerto.png'
import aboutConcertHall from '@/assets/about-concert-hall.png'
import heroArtwork from '@/assets/classical-dashboard-hero.png'

export const catalogAssets = {
  aboutConcertHall,
  chamberSonata,
  chamberMusicCategory,
  composerAvatar,
  composerBaroque,
  composerBeethoven,
  composerDebussy,
  composerRomantic,
  composerStravinsky,
  heroArtwork,
  operaCurtain,
  pianoKeys,
  pianoConcerto,
  symphony,
  symphonyOrchestra,
  violinConcerto,
}

export type CatalogAssetKey = keyof typeof catalogAssets
