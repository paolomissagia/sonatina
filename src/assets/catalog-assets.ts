import composerBach from '@/assets/catalog/composer-bach.webp'
import composerBeethoven from '@/assets/catalog/composer-beethoven.webp'
import composerClaraSchumann from '@/assets/catalog/composer-clara-schumann.webp'
import composerDebussy from '@/assets/catalog/composer-debussy.webp'
import composerDvorak from '@/assets/catalog/composer-dvorak.webp'
import composerMozart from '@/assets/catalog/composer-mozart.webp'
import composerStravinsky from '@/assets/catalog/composer-stravinsky.webp'
import composerVivaldi from '@/assets/catalog/composer-vivaldi.webp'
import composerHandel from '@/assets/catalog/composer-handel.webp'
import composerHaydn from '@/assets/catalog/composer-haydn.webp'
import composerSchubert from '@/assets/catalog/composer-schubert.webp'
import composerChopin from '@/assets/catalog/composer-chopin.webp'
import composerMendelssohn from '@/assets/catalog/composer-mendelssohn.webp'
import composerFannyHensel from '@/assets/catalog/composer-fanny-hensel.webp'
import composerBrahms from '@/assets/catalog/composer-brahms.webp'
import composerTchaikovsky from '@/assets/catalog/composer-tchaikovsky.webp'
import composerVerdi from '@/assets/catalog/composer-verdi.webp'
import composerPuccini from '@/assets/catalog/composer-puccini.webp'
import composerRavel from '@/assets/catalog/composer-ravel.webp'
import composerGrieg from '@/assets/catalog/composer-grieg.webp'
import genreOrchestral from '@/assets/home/genre-orchestral.webp'
import workMagicFlute from '@/assets/catalog/work-magic-flute.webp'
import workDonGiovanni from '@/assets/catalog/work-don-giovanni.webp'
import workMozartPianoConcerto21 from '@/assets/catalog/work-mozart-piano-concerto-21.webp'
import workBachMassBMinor from '@/assets/catalog/work-bach-mass-in-b-minor.webp'
import workBeethovenOp131 from '@/assets/catalog/work-beethoven-op-131.webp'
import workFirebird from '@/assets/catalog/work-firebird.webp'
import workSlavonicDances from '@/assets/catalog/work-slavonic-dances.webp'
import workWaterMusic from '@/assets/catalog/work-water-music.webp'
import workTheCreation from '@/assets/catalog/work-the-creation.webp'
import workLaTraviata from '@/assets/catalog/work-la-traviata.webp'
import workTosca from '@/assets/catalog/work-tosca.webp'
import workPavane from '@/assets/catalog/work-pavane.webp'
import workUnfinishedSymphony from '@/assets/catalog/work-unfinished-symphony.webp'
import workLaMer from '@/assets/catalog/work-la-mer.webp'
import workBeethovenSymphony9 from '@/assets/catalog/work-beethoven-symphony-9.webp'
import workDasJahr from '@/assets/catalog/work-das-jahr.webp'
import workWinterreise from '@/assets/catalog/work-winterreise.webp'
import workBeethoven5 from '@/assets/catalog/work-beethoven-5.webp'
import workBrandenburg from '@/assets/catalog/work-brandenburg.webp'
import workCelloSuite from '@/assets/catalog/work-cello-suite.webp'
import workClairDeLune from '@/assets/catalog/work-clair-de-lune.webp'
import workClaraSchumannTrio from '@/assets/catalog/work-clara-schumann-trio.webp'
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
import genreBallet from '@/assets/home/genre-ballet.webp'
import genreChoral from '@/assets/home/genre-choral.webp'
import genreConcerto from '@/assets/home/genre-concerto.webp'

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
  genreBallet,
  genreChoral,
  genreConcerto,
  composerHandel,
  composerHaydn,
  composerSchubert,
  composerChopin,
  composerMendelssohn,
  composerFannyHensel,
  composerBrahms,
  composerTchaikovsky,
  composerVerdi,
  composerPuccini,
  composerRavel,
  composerGrieg,
  genreOrchestral,
  workWinterreise,
  workMagicFlute,
  workDonGiovanni,
  workMozartPianoConcerto21,
  workBachMassBMinor,
  workBeethovenOp131,
  workFirebird,
  workSlavonicDances,
  workWaterMusic,
  workTheCreation,
  workLaTraviata,
  workTosca,
  workPavane,
  workUnfinishedSymphony,
  workLaMer,
  workBeethovenSymphony9,
  workDasJahr,
  workBeethoven5,
  workBrandenburg,
  workCelloSuite,
  workClairDeLune,
  workClaraSchumannTrio,
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
  genreBallet: {
    title: 'The Dance Class',
    artist: 'Edgar Degas',
    year: '1875',
    source: commons('Edgar_Degas_-_La_Classe_de_danse.jpg'),
  },
  genreChoral: {
    title: 'Singing Angels, from the Ghent Altarpiece',
    artist: 'Jan van Eyck',
    year: '1432',
    source: commons('Ghent_Altarpiece_B_-_Angels.jpg'),
  },
  genreConcerto: {
    title: 'Paganini in concert',
    artist: 'Richard James Lane',
    year: '1831',
    source: commons('Nicolo_Paganini_by_Richard_James_Lane.jpg'),
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
  composerFannyHensel: {
    artist: 'Moritz Daniel Oppenheim',
    year: '1842',
    source: commons('Fanny_Hensel_1842.jpg'),
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
  workWinterreise: {
    title: 'A Schubertiade',
    artist: 'Julius Schmid',
    year: '1897',
    source: commons('Julius_Schmid_Schubertiade.jpg'),
  },
  workMagicFlute: {
    title: 'Set design for the Queen of the Night',
    artist: 'Karl Friedrich Schinkel',
    year: '1815',
    source: commons('Mozart_magic_flute.jpg'),
  },
  workDonGiovanni: {
    title: 'Francisco d’Andrade as Don Giovanni',
    artist: 'Max Slevogt',
    year: '1912',
    source: commons('Max_Slevogt_-_Der_S%C3%A4nger_Francisco_d%27Andrade_als_Don_Giovanni_in_Mozarts_Oper_-_Google_Art_Project.jpg'),
  },
  workMozartPianoConcerto21: {
    title: 'Autograph score, opening page',
    artist: 'Wolfgang Amadeus Mozart',
    year: '1785',
    source: commons('Mozart_-_Piano_Concerto_No._21_-_Opening_Page_of_the_Autograph_Manuscript.jpg'),
  },
  workBachMassBMinor: {
    title: 'Autograph score, Et incarnatus',
    artist: 'Johann Sebastian Bach',
    year: 'c. 1749',
    source: commons('BWV_232_Et_incarnatus.jpg'),
  },
  workBeethovenOp131: {
    title: 'Sketches for the quartet',
    artist: 'Ludwig van Beethoven',
    year: '1826',
    source: commons('Ludwig_van_Beethoven_-_Sketches_for_the_String_Quartet_Op._131._(BL_Add_MS_38070_f._51r).jpg'),
  },
  workFirebird: {
    title: 'Costume design for the Firebird',
    artist: 'Léon Bakst',
    year: '1910',
    source: commons('L%C3%A9on_Bakst_001.jpg'),
  },
  workSlavonicDances: {
    title: 'First edition title page',
    artist: 'N. Simrock, publisher',
    year: '1878',
    source: commons('Slavonic_Dances024.jpg'),
  },
  workWaterMusic: {
    title: 'Handel and George I on the Thames',
    artist: 'Edouard Hamman',
    year: '19th century',
    source: commons('GeorgIvonGro%C3%9FbritannienGeorgFriedrichHaendelHamman.jpg'),
  },
  workTheCreation: {
    title: 'The Ancient of Days',
    artist: 'William Blake',
    year: '1794',
    source: commons('Europe_a_Prophecy,_copy_D,_object_1_(Bentley_1,_Erdman_i,_Keynes_i)_British_Museum.jpg'),
  },
  workLaTraviata: {
    title: 'Costume design for Violetta, first production',
    artist: 'Giuseppe Bertoja',
    year: '1853',
    source: commons('Violetta,_1853_Premiere_Costume.jpg'),
  },
  workTosca: {
    title: 'Poster for the first production',
    artist: 'Adolfo Hohenstein',
    year: '1899',
    source: commons('Tosca_(1899).jpg'),
  },
  workPavane: {
    title: 'First edition cover',
    artist: 'E. Demets, publisher',
    year: '1900',
    source: commons('Ravel_-_Pavane_pour_une_infante_d%C3%A9funte_(E._Demets_editeur).png'),
  },
  workUnfinishedSymphony: {
    title: 'Autograph score',
    artist: 'Franz Schubert',
    year: '1822',
    source: commons('Symphony_No._8_in_B_minor.jpg'),
  },
  workLaMer: {
    title: 'The Great Wave off Kanagawa, reproduced on the first edition',
    artist: 'Katsushika Hokusai',
    year: 'c. 1830–32',
    source: commons('Katsushika_Hokusai_-_The_Great_Wave_off_the_Coast_of_Kanagawa_LCCN2008660568.jpg'),
  },
  workBeethovenSymphony9: {
    title: 'The premiere of the Ninth Symphony',
    artist: 'Carl Offterdinger',
    year: '1879',
    source: commons('The_Premiere_of_Symphony_No._9.jpg'),
  },
  workDasJahr: {
    title: '“April”, from the illustrated manuscript',
    artist: 'Fanny and Wilhelm Hensel',
    year: '1841',
    source: commons('April_(Fanny_Hensel,_Das_Jahr).jpg'),
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
  workClaraSchumannTrio: {
    title: 'Joseph Joachim and Clara Schumann in concert',
    artist: 'Adolph Menzel',
    year: '1854',
    source: commons('Adolph_von_Menzel_-_Joseph_Joachim_%2B_Clara_Schumann_(Zeichnung_1854).jpg'),
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
