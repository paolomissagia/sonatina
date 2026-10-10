import composerBach from '@/assets/catalog/composer-bach.webp'
import composerBeethoven from '@/assets/catalog/composer-beethoven.webp'
import composerClaraSchumann from '@/assets/catalog/composer-clara-schumann.webp'
import composerDebussy from '@/assets/catalog/composer-debussy.webp'
import composerDvorak from '@/assets/catalog/composer-dvorak.webp'
import composerMonteverdi from '@/assets/catalog/composer-monteverdi.webp'
import composerLiszt from '@/assets/catalog/composer-liszt.webp'
import composerRachmaninoff from '@/assets/catalog/composer-rachmaninoff.webp'
import composerMahler from '@/assets/catalog/composer-mahler.webp'
import composerWagner from '@/assets/catalog/composer-wagner.webp'
import composerMozart from '@/assets/catalog/composer-mozart.webp'
import composerStravinsky from '@/assets/catalog/composer-stravinsky.webp'
import composerVivaldi from '@/assets/catalog/composer-vivaldi.webp'
import composerHandel from '@/assets/catalog/composer-handel.webp'
import composerHaydn from '@/assets/catalog/composer-haydn.webp'
import composerSchubert from '@/assets/catalog/composer-schubert.webp'
import composerChopin from '@/assets/catalog/composer-chopin.webp'
import composerMendelssohn from '@/assets/catalog/composer-mendelssohn.webp'
import composerBrahms from '@/assets/catalog/composer-brahms.webp'
import composerTchaikovsky from '@/assets/catalog/composer-tchaikovsky.webp'
import composerVerdi from '@/assets/catalog/composer-verdi.webp'
import composerPuccini from '@/assets/catalog/composer-puccini.webp'
import composerRavel from '@/assets/catalog/composer-ravel.webp'
import composerGrieg from '@/assets/catalog/composer-grieg.webp'
import genreOrchestral from '@/assets/home/genre-orchestral.webp'
import burgtheaterAuditorium from '@/assets/home/burgtheater-auditorium.webp'
import categoryChamber from '@/assets/home/category-chamber.webp'
import categoryOpera from '@/assets/home/category-opera.webp'
import categoryPiano from '@/assets/home/category-piano.webp'
import categorySymphony from '@/assets/home/category-symphony.webp'
import concertAtSanssouci from '@/assets/home/concert-at-sanssouci.webp'
import genreBallet from '@/assets/home/genre-ballet.webp'
import genreChoral from '@/assets/home/genre-choral.webp'

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
  composerMonteverdi,
  composerLiszt,
  composerRachmaninoff,
  composerMahler,
  composerWagner,
  composerMozart,
  composerStravinsky,
  composerVivaldi,
  concertAtSanssouci,
  genreBallet,
  genreChoral,
  composerHandel,
  composerHaydn,
  composerSchubert,
  composerChopin,
  composerMendelssohn,
  composerBrahms,
  composerTchaikovsky,
  composerVerdi,
  composerPuccini,
  composerRavel,
  composerGrieg,
  genreOrchestral,
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
  composerMonteverdi: {
    artist: 'Bernardo Strozzi',
    year: 'c. 1630',
    source: commons('Bernardo_Strozzi_-_Claudio_Monteverdi_(c.1630).jpg'),
  },
  composerLiszt: {
    artist: 'Henri Lehmann',
    year: '1839',
    source: commons('Liszt_(Lehmann_portrait)_(cropped).jpg'),
  },
  composerRachmaninoff: {
    artist: 'Kubey-Rembrandt Studios',
    year: '1921',
    source: commons('Sergei_Rachmaninoff_cph.3a40575.jpg'),
  },
  composerMahler: {
    artist: 'Moritz Nähr',
    year: '1907',
    source: commons('Photo_of_Gustav_Mahler_by_Moritz_N%C3%A4hr_07.jpg'),
  },
  composerWagner: {
    artist: 'Franz Hanfstaengl',
    year: '1871',
    source: commons('RichardWagner.jpg'),
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
  genreBallet: {
    title: 'The Dance Foyer at the Opera',
    artist: 'Edgar Degas',
    year: '1872',
    source: commons('Edgar_Degas_-_The_Dance_Foyer_at_the_Opera_on_the_rue_Le_Peletier.jpg'),
  },
  genreChoral: {
    title: 'A Village Choir',
    artist: 'Thomas Webster',
    year: '1847',
    source: commons('Thomas_Webster_-_A_Village_Choir.jpg'),
  },
  composerHandel: {
    artist: 'Attributed to Balthasar Denner',
    year: 'c. 1726–28',
    source: commons('George_Frideric_Handel_by_Balthasar_Denner.jpg'),
  },
  composerHaydn: {
    artist: 'Thomas Hardy',
    year: '1791',
    source: commons('Joseph_Haydn.jpg'),
  },
  composerSchubert: {
    artist: 'Wilhelm August Rieder',
    year: '1875, after his 1825 watercolour',
    source: commons('Franz_Schubert_by_Wilhelm_August_Rieder_1875.jpg'),
  },
  composerChopin: {
    artist: 'Louis-Auguste Bisson',
    year: '1849',
    source: commons('Frederic_Chopin_photo.jpeg'),
  },
  composerMendelssohn: {
    artist: 'Eduard Magnus',
    year: '1833',
    source: commons('Felix_Mendelssohn_Bartholdy_by_Eduard_Magnus_(1833).jpg'),
  },
  composerBrahms: {
    artist: 'C. Brasch, Berlin',
    year: '1889',
    source: commons('JohannesBrahms.jpg'),
  },
  composerTchaikovsky: {
    artist: 'Émile Reutlinger',
    year: '1888',
    source: commons('Tchaikovsky_by_Reutlinger_(cropped).jpg'),
  },
  composerVerdi: {
    artist: 'Ferdinand Mulnier',
    year: 'c. 1872',
    source: commons('Giuseppe_Verdi_by_Ferdinand_Mulnier_BW.jpg'),
  },
  composerPuccini: {
    artist: 'Unknown photographer',
    year: '1908',
    source: commons('Giacomo_Puccini_LCCN2005685154_(1)_cropped.jpg'),
  },
  composerRavel: {
    artist: 'Unknown photographer',
    year: '1925',
    source: commons('Maurice_Ravel_1925.jpg'),
  },
  composerGrieg: {
    artist: 'Eilif Peterssen',
    year: '1891',
    source: commons('Eilif_Peterssen_-_Portrait_of_the_Composer_Edvard_Grieg_-_NG.M.00396_-_National_Museum_of_Art,_Architecture_and_Design.jpg'),
  },
  genreOrchestral: {
    title: 'Music in the Tuileries',
    artist: 'Édouard Manet',
    year: '1862',
    source: commons('MANET_-_M%C3%BAsica_en_las_Tuller%C3%ADas_(National_Gallery,_Londres,_1862).jpg'),
  },
}
