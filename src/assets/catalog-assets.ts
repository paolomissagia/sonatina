import chamberSonata from '@/assets/catalog/chamber-sonata.webp'
import chamberMusicCategory from '@/assets/home/chamber-music.webp'
import composerBach from '@/assets/catalog/composer-bach.webp'
import composerBeethoven from '@/assets/catalog/composer-beethoven.webp'
import composerClaraSchumann from '@/assets/catalog/composer-clara-schumann.webp'
import composerDebussy from '@/assets/catalog/composer-debussy.webp'
import composerDvorak from '@/assets/catalog/composer-dvorak.webp'
import composerMozart from '@/assets/catalog/composer-mozart.webp'
import composerStravinsky from '@/assets/catalog/composer-stravinsky.webp'
import composerVivaldi from '@/assets/catalog/composer-vivaldi.webp'
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
  composerBach,
  composerBeethoven,
  composerClaraSchumann,
  composerDebussy,
  composerDvorak,
  composerMozart,
  composerStravinsky,
  composerVivaldi,
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
