import composerBach from '@/assets/catalog/composer-bach.webp'
import composerBeethoven from '@/assets/catalog/composer-beethoven.webp'
import composerClaraSchumann from '@/assets/catalog/composer-clara-schumann.webp'
import composerDebussy from '@/assets/catalog/composer-debussy.webp'
import composerDvorak from '@/assets/catalog/composer-dvorak.webp'
import composerMozart from '@/assets/catalog/composer-mozart.webp'
import composerStravinsky from '@/assets/catalog/composer-stravinsky.webp'
import composerVivaldi from '@/assets/catalog/composer-vivaldi.webp'
import workBeethoven5 from '@/assets/catalog/work-beethoven-5.webp'
import workBrandenburg from '@/assets/catalog/work-brandenburg.webp'
import workCelloSuite from '@/assets/catalog/work-cello-suite.webp'
import workClairDeLune from '@/assets/catalog/work-clair-de-lune.webp'
import workFidelio from '@/assets/catalog/work-fidelio.webp'
import workFourSeasons from '@/assets/catalog/work-four-seasons.webp'
import workGoldberg from '@/assets/catalog/work-goldberg.webp'
import workMoonlight from '@/assets/catalog/work-moonlight.webp'
import workNachtmusik from '@/assets/catalog/work-nachtmusik.webp'
import workNewWorld from '@/assets/catalog/work-new-world.webp'
import workRequiem from '@/assets/catalog/work-requiem.webp'
import workRiteOfSpring from '@/assets/catalog/work-rite-of-spring.webp'
import burgtheaterAuditorium from '@/assets/home/burgtheater-auditorium.webp'
import categoryChamber from '@/assets/home/category-chamber.webp'
import categoryOpera from '@/assets/home/category-opera.webp'
import categoryPiano from '@/assets/home/category-piano.webp'
import categorySymphony from '@/assets/home/category-symphony.webp'
import concertAtSanssouci from '@/assets/home/concert-at-sanssouci.webp'

export const catalogAssets = {
  burgtheaterAuditorium,
  categoryChamber,
  categoryOpera,
  categoryPiano,
  categorySymphony,
  composerBach,
  composerBeethoven,
  composerClaraSchumann,
  composerDebussy,
  composerDvorak,
  composerMozart,
  composerStravinsky,
  composerVivaldi,
  concertAtSanssouci,
  workBeethoven5,
  workBrandenburg,
  workCelloSuite,
  workClairDeLune,
  workFidelio,
  workFourSeasons,
  workGoldberg,
  workMoonlight,
  workNachtmusik,
  workNewWorld,
  workRequiem,
  workRiteOfSpring,
}

export type CatalogAssetKey = keyof typeof catalogAssets

/** Where a public-domain image comes from. Portraits omit `title`. */
export type ImageCredit = {
  title?: string
  artist: string
  year: string
  source: string
}

const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`

export const assetCredits: Record<CatalogAssetKey, ImageCredit> = {
  burgtheaterAuditorium: {
    title: 'Auditorium of the Old Burgtheater',
    artist: 'Gustav Klimt',
    year: '1888',
    source: commons('Klimt_-_Zuschauerraum_im_alten_Burgtheater_-_1888.jpeg'),
  },
  categoryChamber: {
    title: 'The String Quartet',
    artist: 'Richard Winternitz',
    year: '1899',
    source: commons('Richard_Winternitz_-_Das_Streichquartett_(1899).jpg'),
  },
  categoryOpera: {
    title: 'La Loge',
    artist: 'Pierre-Auguste Renoir',
    year: '1874',
    source: commons('La_Loge_Pierre-Auguste_Renoir_1874.jpg'),
  },
  categoryPiano: {
    title: 'Young Girls at the Piano',
    artist: 'Pierre-Auguste Renoir',
    year: '1892',
    source: commons('Auguste_Renoir_-_Young_Girls_at_the_Piano_-_Google_Art_Project.jpg'),
  },
  categorySymphony: {
    title: 'The Orchestra at the Opera',
    artist: 'Edgar Degas',
    year: 'c. 1870',
    source: commons('Edgar_Degas_-_The_Orchestra_at_the_Opera_-_Google_Art_Project.jpg'),
  },
  composerBach: {
    artist: 'Elias Gottlob Haussmann',
    year: '1748',
    source: commons('Johann_Sebastian_Bach.jpg'),
  },
  composerBeethoven: {
    artist: 'Joseph Karl Stieler',
    year: '1820',
    source: commons('Beethoven.jpg'),
  },
  composerClaraSchumann: {
    artist: 'Franz Hanfstaengl',
    year: '1857',
    source: commons('Franz_Hanfstaengl_-_Clara_Schumann_(1857)_(cropped).jpg'),
  },
  composerDebussy: {
    artist: 'Nadar',
    year: 'c. 1908',
    source: commons('Claude_Debussy_ca_1908,_foto_av_F%C3%A9lix_Nadar.jpg'),
  },
  composerDvorak: {
    artist: 'Unknown photographer',
    year: '1882',
    source: commons('Dvorak.jpg'),
  },
  composerMozart: {
    artist: 'Barbara Krafft',
    year: '1819',
    source: commons('Wolfgang-amadeus-mozart_1.jpg'),
  },
  composerStravinsky: {
    artist: 'Bain News Service',
    year: 'c. 1920–25',
    source: commons('Igor_Stravinsky_LOC_32392u.jpg'),
  },
  composerVivaldi: {
    artist: 'Unidentified painter',
    year: '1723',
    source: commons('Vivaldi.jpg'),
  },
  concertAtSanssouci: {
    title: 'Flute Concert of Frederick the Great at Sanssouci',
    artist: 'Adolph Menzel',
    year: '1850–52',
    source: commons('Adolph_Menzel_-_Fl%C3%B6tenkonzert_Friedrichs_des_Gro%C3%9Fen_in_Sanssouci_-_Google_Art_Project.jpg'),
  },
  workBeethoven5: {
    title: 'Theater an der Wien, where the symphony premiered',
    artist: 'Unknown artist',
    year: '1831',
    source: commons('Theater_an_der_Wien_1831.jpg'),
  },
  workBrandenburg: {
    title: 'Autograph title page',
    artist: 'Johann Sebastian Bach',
    year: '1721',
    source: commons('Title_page_of_Brandenburg_Concertos.png'),
  },
  workCelloSuite: {
    title: 'The Cellist Franz Wödl',
    artist: 'Peter Fendi',
    year: '1827',
    source: commons('Peter_Fendi_-_Der_Cellist_Franz_W%C3%B6dl_-_2828_-_%C3%96sterreichische_Galerie_Belvedere.jpg'),
  },
  workClairDeLune: {
    title: 'The Embarkation for Cythera',
    artist: 'Jean-Antoine Watteau',
    year: '1717',
    source: commons('L%27Embarquement_pour_Cyth%C3%A8re,_by_Antoine_Watteau,_from_C2RMF_retouched.jpg'),
  },
  workFidelio: {
    title: 'Theater an der Wien, where Fidelio premiered',
    artist: 'Unknown artist',
    year: '1831',
    source: commons('Theater_an_der_Wien_1831.jpg'),
  },
  workFourSeasons: {
    title: 'The Grand Canal in Venice',
    artist: 'Canaletto',
    year: '1722–23',
    source: commons('Canaletto_-_The_Grand_Canal_in_Venice_with_the_Palazzo_Corner_Ca%27Grande_-_Google_Art_Project.jpg'),
  },
  workGoldberg: {
    title: 'Fourteen Canons on the Goldberg ground, in Bach’s copy of the print',
    artist: 'Johann Sebastian Bach',
    year: '1740s',
    source: commons(
      'Clavier_Ubung_bestehend_in_einer_Aria_mit_verschiedenen_Ver%C3%A6nderungen_vors_Clavicimbal_mit_2_Manualen_._Denen_Liebhabern_zur_Gem%C3%BCths-Ergetzung_verfertiget_von_Johann_Sebastian_Bach_k%C3%B6nigl._Pohl._u...._-_btv1b550059626_(39_of_47).jpg',
    ),
  },
  workMoonlight: {
    title: 'First edition title page',
    artist: 'Giovanni Cappi, publisher',
    year: '1802',
    source: commons('Beethoven_Piano_Sonata_14_-_title_page_1802.jpg'),
  },
  workNachtmusik: {
    title: 'Autograph score',
    artist: 'Wolfgang Amadeus Mozart',
    year: '1787',
    source: commons('Mozart_-_Eine_kleine_Nachtmusik_K.525_autograph.png'),
  },
  workNewWorld: {
    title: 'Autograph title page',
    artist: 'Antonín Dvořák',
    year: '1893',
    source: commons('The_title_page_of_the_autograph_score_of_Dvo%C5%99%C3%A1k%27s_ninth_symphony.jpg'),
  },
  workRequiem: {
    title: 'Autograph score',
    artist: 'Wolfgang Amadeus Mozart',
    year: '1791',
    source: commons('K626_Requiem_Mozart.jpg'),
  },
  workRiteOfSpring: {
    title: 'Dancers in the original production',
    artist: 'Unknown photographer',
    year: '1913',
    source: commons('RiteofSpringDancers.jpg'),
  },
}
