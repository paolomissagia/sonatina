import chamberSonata from '@/assets/catalog/chamber-sonata.webp'
import chamberMusicCategory from '@/assets/home/chamber-music.webp'
import composerAvatar from '@/assets/catalog/composer-avatar.webp'
import composerBaroque from '@/assets/catalog/composer-baroque.webp'
import composerBeethoven from '@/assets/catalog/composer-beethoven.webp'
import composerDebussy from '@/assets/catalog/composer-debussy.webp'
import composerRomantic from '@/assets/catalog/composer-romantic.webp'
import composerStravinsky from '@/assets/catalog/composer-stravinsky.webp'
import operaCurtain from '@/assets/home/opera-curtain.webp'
import pianoKeys from '@/assets/home/piano-keys.webp'
import pianoConcerto from '@/assets/catalog/piano-concerto.webp'
import symphony from '@/assets/catalog/symphony.webp'
import symphonyOrchestra from '@/assets/home/symphony-orchestra.webp'
import violinConcerto from '@/assets/catalog/violin-concerto.webp'
import aboutConcertHall from '@/assets/about-concert-hall.webp'
import workConcerto from '@/assets/catalog/work-concerto.webp'
import workSacred from '@/assets/catalog/work-sacred.webp'
import workSerenade from '@/assets/catalog/work-serenade.webp'
import workSuite from '@/assets/catalog/work-suite.webp'

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
  operaCurtain,
  pianoKeys,
  pianoConcerto,
  symphony,
  symphonyOrchestra,
  violinConcerto,
  workConcerto,
  workSacred,
  workSerenade,
  workSuite,
}

export type CatalogAssetKey = keyof typeof catalogAssets
