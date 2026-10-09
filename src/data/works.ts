import type { Period } from '@/models/composer'
import type { Work } from '@/models/work'
import { findComposer } from './composers'

export const works: Work[] = [
  {
    id: 'beethoven-symphony-5',
    title: 'Symphony No. 5',
    composerId: 'beethoven',
    catalogue: 'Op. 67',
    key: 'C minor',
    description: 'A defining symphonic statement, built from four famous notes.',
    asset: 'workBeethoven5',
    composed: '1804–08',
    year: 1808,
    durationMinutes: 33,
    genre: 'Symphony',
    form: 'Symphony in four movements',
    premiere: '22 December 1808, Theater an der Wien, Vienna',
    instrumentation: 'Orchestra, with piccolo, contrabassoon and trombones joining in the finale',
    overview:
      'Beethoven’s Fifth is one of the most recognisable works ever written. Its four-note opening (short-short-short-long) returns in every movement, and the symphony travels from the stormy C minor of the start to a blazing C major finale that follows the scherzo without a break.',
    movements: [
      { title: 'Allegro con brio', note: 'The four-note motif' },
      { title: 'Andante con moto', note: 'Variations' },
      { title: 'Scherzo: Allegro', note: 'Leads straight into the finale' },
      { title: 'Allegro', note: 'C major triumph' },
    ],
  },
  {
    id: 'vivaldi-four-seasons',
    title: 'The Four Seasons',
    composerId: 'vivaldi',
    catalogue: 'Op. 8, Nos. 1–4',
    nickname: 'Le quattro stagioni',
    description: 'Four violin concertos that paint the year in sound.',
    asset: 'workFourSeasons',
    composed: 'c. 1718–20',
    year: 1725,
    durationMinutes: 40,
    genre: 'Concerto',
    form: 'Four violin concertos, each in three movements',
    premiere: 'Published in Amsterdam, 1725, in Il cimento dell’armonia e dell’inventione',
    instrumentation: 'Solo violin, strings and continuo',
    overview:
      'Vivaldi published these concertos with a sonnet for each season, and the music follows the poems closely: birdsong and a spring storm, the heat and hail of summer, an autumn harvest and hunt, teeth chattering in the winter cold. Each concerto runs fast, slow, fast.',
    movements: [
      { title: 'Allegro', note: 'Spring' },
      { title: 'Largo e pianissimo sempre', note: 'Spring' },
      { title: 'Allegro pastorale', note: 'Spring' },
      { title: 'Allegro non molto', note: 'Summer' },
      { title: 'Adagio e piano – Presto e forte', note: 'Summer' },
      { title: 'Presto', note: 'Summer' },
      { title: 'Allegro', note: 'Autumn' },
      { title: 'Adagio molto', note: 'Autumn' },
      { title: 'Allegro', note: 'Autumn' },
      { title: 'Allegro non molto', note: 'Winter' },
      { title: 'Largo', note: 'Winter' },
      { title: 'Allegro', note: 'Winter' },
    ],
  },
  {
    id: 'mozart-requiem',
    title: 'Requiem',
    composerId: 'mozart',
    catalogue: 'K. 626',
    key: 'D minor',
    description: 'A sacred masterpiece left unfinished at Mozart’s death.',
    asset: 'workRequiem',
    composed: '1791',
    year: 1791,
    durationMinutes: 55,
    genre: 'Choral',
    form: 'Requiem mass',
    premiere: '2 January 1793, Vienna, in the completion by Franz Xaver Süssmayr',
    instrumentation: 'Soprano, alto, tenor and bass soloists, choir and orchestra',
    overview:
      'Mozart was writing the Requiem on an anonymous commission when he died in December 1791. His pupil Franz Xaver Süssmayr completed it from Mozart’s drafts; the Lacrimosa breaks off in Mozart’s hand after eight bars. The mix of ceremony, terror and tenderness, and the mystery around it, have made it one of the most performed choral works.',
    movements: [
      { title: 'Requiem aeternam', note: 'Introitus' },
      { title: 'Kyrie', note: 'Double fugue' },
      { title: 'Dies irae', note: 'Sequence' },
      { title: 'Tuba mirum', note: 'Sequence' },
      { title: 'Rex tremendae', note: 'Sequence' },
      { title: 'Recordare', note: 'Sequence' },
      { title: 'Confutatis', note: 'Sequence' },
      { title: 'Lacrimosa', note: 'Sequence' },
      { title: 'Domine Jesu', note: 'Offertory' },
      { title: 'Hostias', note: 'Offertory' },
      { title: 'Sanctus', note: 'Süssmayr' },
      { title: 'Benedictus', note: 'Süssmayr' },
      { title: 'Agnus Dei', note: 'Süssmayr' },
      { title: 'Lux aeterna', note: 'Communion' },
    ],
  },
  {
    id: 'bach-cello-suite-1',
    title: 'Cello Suite No. 1',
    composerId: 'bach',
    catalogue: 'BWV 1007',
    key: 'G major',
    description: 'A foundational work for solo cello, opening with a famous prelude.',
    asset: 'workCelloSuite',
    composed: 'c. 1720',
    year: 1720,
    durationMinutes: 17,
    genre: 'Solo',
    form: 'Suite of dances',
    instrumentation: 'Solo cello',
    overview:
      'The first of Bach’s six cello suites turns a single instrument into a complete world of dance, line and resonance. No autograph survives; the suites come down to us in copies, including one by Anna Magdalena Bach, and became concert staples only after Pablo Casals championed them in the twentieth century.',
    movements: [
      { title: 'Prélude', note: 'Flowing arpeggios' },
      { title: 'Allemande', note: 'Dance' },
      { title: 'Courante', note: 'Dance' },
      { title: 'Sarabande', note: 'Slow dance' },
      { title: 'Menuet I & II', note: 'Dance' },
      { title: 'Gigue', note: 'Dance' },
    ],
  },
  {
    id: 'debussy-clair-de-lune',
    title: 'Clair de lune',
    composerId: 'debussy',
    catalogue: 'L. 75',
    key: 'D-flat major',
    description: 'A luminous piano piece from Suite bergamasque.',
    asset: 'workClairDeLune',
    composed: 'c. 1890, revised 1905',
    year: 1905,
    durationMinutes: 5,
    genre: 'Keyboard',
    form: 'Third movement of Suite bergamasque',
    premiere: 'Published in Paris, 1905',
    instrumentation: 'Solo piano',
    overview:
      'Clair de lune takes its title from Paul Verlaine’s poem, one of his Fêtes galantes, inspired by Watteau’s paintings of masked revellers. Debussy captures moonlit stillness through floating harmony, soft melodic curves and a sense of suspended time.',
    partOf: 'Suite bergamasque',
    movements: [
      { title: 'Prélude' },
      { title: 'Menuet' },
      { title: 'Clair de lune', note: 'This piece' },
      { title: 'Passepied' },
    ],
  },
  {
    id: 'dvorak-symphony-9',
    title: 'Symphony No. 9, “From the New World”',
    composerId: 'dvorak',
    catalogue: 'Op. 95',
    key: 'E minor',
    nickname: 'New World',
    description: 'Written in America, expansive and lyrical.',
    asset: 'workNewWorld',
    composed: '1893',
    year: 1893,
    durationMinutes: 42,
    genre: 'Symphony',
    form: 'Symphony in four movements',
    premiere: '16 December 1893, Carnegie Hall, New York, conducted by Anton Seidl',
    instrumentation: 'Orchestra',
    overview:
      'Dvořák wrote the New World Symphony during his years running the National Conservatory in New York. It combines sweeping Romantic form with melodies shaped by what he heard in America, and the cor anglais tune of the Largo later became the song “Goin’ Home”.',
    movements: [
      { title: 'Adagio – Allegro molto' },
      { title: 'Largo', note: 'The cor anglais melody' },
      { title: 'Scherzo: Molto vivace' },
      { title: 'Allegro con fuoco', note: 'Themes return' },
    ],
  },
  {
    id: 'beethoven-moonlight-sonata',
    title: 'Piano Sonata No. 14, “Moonlight”',
    composerId: 'beethoven',
    catalogue: 'Op. 27, No. 2',
    key: 'C-sharp minor',
    nickname: 'Moonlight',
    description: 'A sonata “quasi una fantasia”, intimate then stormy.',
    asset: 'workMoonlight',
    composed: '1801',
    year: 1801,
    durationMinutes: 15,
    genre: 'Keyboard',
    form: 'Piano sonata in three movements',
    premiere: 'Published in Vienna, 1802',
    instrumentation: 'Solo piano',
    overview:
      'Beethoven called it a sonata “quasi una fantasia”, like a fantasy, and dedicated it to his pupil Countess Giulietta Guicciardi. The nickname came later, from the critic Ludwig Rellstab. It turns the usual order around, opening with a slow, hushed movement and ending with a stormy finale.',
    movements: [
      { title: 'Adagio sostenuto', note: 'Hushed' },
      { title: 'Allegretto', note: 'Graceful' },
      { title: 'Presto agitato', note: 'Stormy' },
    ],
  },
  {
    id: 'beethoven-fidelio',
    title: 'Fidelio',
    composerId: 'beethoven',
    catalogue: 'Op. 72',
    description: 'Beethoven’s only opera, a drama of courage and liberation.',
    asset: 'workFidelio',
    composed: '1804–05, revised 1806 and 1814',
    year: 1814,
    durationMinutes: 130,
    genre: 'Opera',
    form: 'Opera in two acts, with spoken dialogue',
    premiere: '20 November 1805, Theater an der Wien, Vienna; final version 23 May 1814, Kärntnertortheater',
    instrumentation: 'Soloists, chorus and orchestra',
    overview:
      'Leonore disguises herself as a young man, Fidelio, to rescue her husband Florestan from a political prison. Beethoven reworked the opera twice over nine years and wrote four overtures for it. The prisoners’ chorus and the final scene of liberation are among his most moving music.',
    movements: [
      { title: 'Overture' },
      { title: 'Act I', note: 'The prison courtyard' },
      { title: 'Act II', note: 'The dungeon, then liberation' },
    ],
  },
  {
    id: 'bach-goldberg-variations',
    title: 'Goldberg Variations',
    composerId: 'bach',
    catalogue: 'BWV 988',
    key: 'G major',
    description: 'An aria, thirty variations, and the aria again.',
    asset: 'workGoldberg',
    composed: 'Published 1741',
    year: 1741,
    durationMinutes: 75,
    genre: 'Keyboard',
    form: 'Aria with 30 variations',
    premiere: 'Published in Nuremberg, 1741, as the fourth part of Clavier-Übung',
    instrumentation: 'Harpsichord with two manuals, now often played on piano',
    overview:
      'The Goldberg Variations transform a graceful aria into a vast architecture of invention. Every variation is built over the aria’s bass line; every third one is a canon, and the thirtieth is a quodlibet that weaves in folk songs before the aria returns.',
    movements: [
      { title: 'Aria' },
      { title: 'Variations 1–30', note: 'A canon every third variation' },
      { title: 'Aria da capo', note: 'The opening returns' },
    ],
  },
  {
    id: 'bach-brandenburg-concertos',
    title: 'Brandenburg Concertos',
    composerId: 'bach',
    catalogue: 'BWV 1046–1051',
    description: 'Six concertos, each for a different group of soloists.',
    asset: 'workBrandenburg',
    composed: 'Dedicated 1721',
    year: 1721,
    durationMinutes: 95,
    genre: 'Concerto',
    form: 'Six concertos',
    premiere: 'Dedicated to Christian Ludwig, Margrave of Brandenburg, 24 March 1721',
    instrumentation: 'Changing groups of soloists with strings and continuo',
    overview:
      'Bach gathered six concertos into a presentation manuscript for the Margrave of Brandenburg. Each uses a different combination of soloists, from horns and oboes to a trumpet, recorders and a harpsichord with its own dazzling solo, which makes the set a showcase of Baroque instrumental colour.',
    movements: [
      { title: 'Concerto No. 1 in F major', note: 'Horns and oboes' },
      { title: 'Concerto No. 2 in F major', note: 'Trumpet, recorder, oboe, violin' },
      { title: 'Concerto No. 3 in G major', note: 'Strings only' },
      { title: 'Concerto No. 4 in G major', note: 'Violin and two recorders' },
      { title: 'Concerto No. 5 in D major', note: 'Harpsichord, flute, violin' },
      { title: 'Concerto No. 6 in B-flat major', note: 'Lower strings' },
    ],
  },
  {
    id: 'mozart-eine-kleine-nachtmusik',
    title: 'Eine kleine Nachtmusik',
    composerId: 'mozart',
    catalogue: 'K. 525',
    key: 'G major',
    description: 'A graceful serenade for strings.',
    asset: 'workNachtmusik',
    composed: '1787',
    year: 1787,
    durationMinutes: 18,
    genre: 'Chamber',
    form: 'Serenade in four movements',
    instrumentation: 'Two violins, viola, cello and double bass',
    overview:
      'Mozart entered this serenade in his catalogue on 10 August 1787, while he was working on Don Giovanni. It is Mozart at his most direct and graceful: compact, balanced and full of memorable melody. It was only published after his death.',
    movements: [
      { title: 'Allegro' },
      { title: 'Romanze: Andante' },
      { title: 'Menuetto: Allegretto' },
      { title: 'Rondo: Allegro', note: 'The main tune keeps returning' },
    ],
  },
  {
    id: 'stravinsky-rite-of-spring',
    title: 'The Rite of Spring',
    composerId: 'stravinsky',
    nickname: 'Le Sacre du printemps',
    description: 'A landmark ballet score of rhythm and ritual force.',
    asset: 'workRiteOfSpring',
    composed: '1911–13',
    year: 1913,
    durationMinutes: 34,
    genre: 'Ballet',
    form: 'Ballet in two parts',
    premiere: '29 May 1913, Théâtre des Champs-Élysées, Paris, by the Ballets Russes, conducted by Pierre Monteux',
    instrumentation: 'Large orchestra',
    overview:
      'The Rite of Spring imagines a pagan ritual in which a young girl dances herself to death. Its raw rhythms, clashing harmonies and Nijinsky’s choreography caused an uproar at the premiere, and it went on to change twentieth-century music.',
    movements: [
      { title: 'Introduction', note: 'Part I' },
      { title: 'The Augurs of Spring', note: 'Part I' },
      { title: 'Ritual of Abduction', note: 'Part I' },
      { title: 'Spring Rounds', note: 'Part I' },
      { title: 'Ritual of the Rival Tribes', note: 'Part I' },
      { title: 'Procession of the Sage', note: 'Part I' },
      { title: 'The Sage', note: 'Part I' },
      { title: 'Dance of the Earth', note: 'Part I' },
      { title: 'Introduction', note: 'Part II' },
      { title: 'Mystic Circles of the Young Girls', note: 'Part II' },
      { title: 'Glorification of the Chosen One', note: 'Part II' },
      { title: 'Evocation of the Ancestors', note: 'Part II' },
      { title: 'Ritual Action of the Ancestors', note: 'Part II' },
      { title: 'Sacrificial Dance', note: 'Part II' },
    ],
  },
  {
    id: 'clara-schumann-piano-trio',
    title: 'Piano Trio',
    composerId: 'clara-schumann',
    catalogue: 'Op. 17',
    key: 'G minor',
    description: 'Her largest chamber work, lyrical and finely argued.',
    asset: 'workClaraSchumannTrio',
    composed: '1846',
    year: 1846,
    durationMinutes: 28,
    genre: 'Chamber',
    form: 'Piano trio in four movements',
    premiere: 'Published in Leipzig, 1847',
    instrumentation: 'Piano, violin and cello',
    overview:
      'Clara Schumann wrote her Piano Trio in Dresden in 1846, between concert tours and raising a young family. It balances the three instruments as equals, with a singing slow movement and a finale that works its themes together in counterpoint. Robert Schumann wrote his own first piano trio the following year.',
    movements: [
      { title: 'Allegro moderato' },
      { title: 'Scherzo: Tempo di menuetto' },
      { title: 'Andante', note: 'Song-like' },
      { title: 'Allegretto', note: 'Ends with a fugato' },
    ],
  },
]

export function findWork(id: string | undefined) {
  if (!id) {
    return undefined
  }

  return works.find((work) => work.id === id)
}

/** A work's period is its composer's, so the two can never disagree. */
export function getWorkPeriod(work: Work): Period | undefined {
  return findComposer(work.composerId)?.period
}

/** "33 min", "2 h 10 min" */
export function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  if (hours === 0) {
    return `${rest} min`
  }

  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`
}

/** "C minor, Op. 67" */
export function formatKeyAndCatalogue(work: Work) {
  return [work.key, work.catalogue].filter(Boolean).join(', ')
}

/** Up to four other works: same composer first, then same period, then the rest. */
export function getRecommendedWorks(work: Work) {
  const period = getWorkPeriod(work)
  const others = works.filter((candidate) => candidate.id !== work.id)
  const sameComposer = others.filter((candidate) => candidate.composerId === work.composerId)
  const samePeriod = others.filter(
    (candidate) => candidate.composerId !== work.composerId && getWorkPeriod(candidate) === period,
  )
  const otherWorks = others.filter(
    (candidate) => candidate.composerId !== work.composerId && getWorkPeriod(candidate) !== period,
  )

  return [...sameComposer, ...samePeriod, ...otherWorks].slice(0, 4)
}

export function getWorksByComposer(composerId: string) {
  return works.filter((work) => work.composerId === composerId)
}
