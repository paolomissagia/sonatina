import type { Composer } from '@/models/composer'

export const composers: Composer[] = [
  {
    id: 'bach',
    name: 'Johann Sebastian Bach',
    shortName: 'Bach',
    period: 'Baroque',
    born: { year: 1685, place: 'Eisenach' },
    died: { year: 1750, place: 'Leipzig' },
    nationality: 'German',
    bio: 'Counterpoint, sacred music, keyboard works, and solo suites.',
    asset: 'composerBach',
    knownFor: ['Counterpoint', 'Sacred music', 'Keyboard works'],
    quote: {
      text: 'The aim and final end of all music should be none other than the glory of God and the refreshment of the soul.',
      source: 'Rules for playing thorough-bass, written for his students, 1738',
    },
    overview:
      'Bach brought Baroque counterpoint to a level of clarity and expressive force that still shapes how musicians understand harmony, form, and sacred drama. From 1723 until his death he was Thomaskantor in Leipzig, writing music for the city’s churches every week.',
  },
  {
    id: 'mozart',
    name: 'Wolfgang Amadeus Mozart',
    shortName: 'Mozart',
    period: 'Classical',
    born: { year: 1756, place: 'Salzburg' },
    died: { year: 1791, place: 'Vienna' },
    nationality: 'Austrian',
    bio: 'Operas, concertos, chamber works, and symphonies.',
    asset: 'composerMozart',
    knownFor: ['Opera', 'Piano concertos', 'Symphonies'],
    quote: {
      text: 'I cannot write poetically, for I am no poet… But I can do so by means of sounds, for I am a musician.',
      source: 'Letter to his father, 8 November 1777',
    },
    overview:
      'Mozart shaped Classical style with extraordinary melodic fluency, dramatic timing, and formal balance across opera, chamber music, concertos, and symphonies. He died at 35, leaving more than 600 works.',
  },
  {
    id: 'beethoven',
    name: 'Ludwig van Beethoven',
    shortName: 'Beethoven',
    period: 'Classical',
    born: { year: 1770, place: 'Bonn' },
    died: { year: 1827, place: 'Vienna' },
    nationality: 'German',
    bio: 'Symphonic drama, piano sonatas, quartets, and concertos.',
    asset: 'composerBeethoven',
    knownFor: ['Symphonies', 'Piano sonatas', 'String quartets'],
    quote: {
      text: 'I will seize fate by the throat; it shall certainly never wholly overcome me.',
      source: 'Letter to Franz Wegeler, 16 November 1801',
    },
    overview:
      'Beethoven trained in the Classical tradition of Haydn and Mozart, then stretched it to breaking point. His works are known for emotional depth, structural innovation, and an influence that opened the way to the Romantic era, all written while he was steadily losing his hearing.',
  },
  {
    id: 'clara-schumann',
    name: 'Clara Schumann',
    shortName: 'Clara Schumann',
    period: 'Romantic',
    born: { year: 1819, place: 'Leipzig' },
    died: { year: 1896, place: 'Frankfurt' },
    nationality: 'German',
    bio: 'Piano works, songs, and a central concert career.',
    asset: 'composerClaraSchumann',
    knownFor: ['Piano works', 'Songs', 'Concert performance'],
    quote: {
      text: 'There is nothing that surpasses the joy of creation, if only because through it one wins hours of self-forgetfulness, when one lives in a world of sound.',
      source: 'Diary, 1853',
    },
    overview:
      'Clara Schumann was one of the nineteenth century’s defining pianists, performing in public for more than sixty years, and a composer of intimate, finely crafted works for piano, voice, and chamber ensemble.',
  },
  {
    id: 'debussy',
    name: 'Claude Debussy',
    shortName: 'Debussy',
    period: 'Modern',
    born: { year: 1862, place: 'Saint-Germain-en-Laye' },
    died: { year: 1918, place: 'Paris' },
    nationality: 'French',
    bio: 'Color, atmosphere, and harmonic ambiguity.',
    asset: 'composerDebussy',
    knownFor: ['Piano miniatures', 'Orchestral color', 'Harmonic atmosphere'],
    overview:
      'Debussy opened new harmonic and textural possibilities, favoring color, suggestion, and atmosphere over the rhetorical weight of earlier Romantic forms. His music is often called Impressionist, a label he disliked.',
  },
  {
    id: 'stravinsky',
    name: 'Igor Stravinsky',
    shortName: 'Stravinsky',
    period: 'Modern',
    born: { year: 1882, place: 'Oranienbaum' },
    died: { year: 1971, place: 'New York' },
    nationality: 'Russian',
    bio: 'Rhythmic force, ballet, neoclassicism, and reinvention.',
    asset: 'composerStravinsky',
    knownFor: ['Ballet', 'Rhythmic drive', 'Neoclassicism'],
    quote: {
      text: 'The more constraints one imposes, the more one frees one’s self of the chains that shackle the spirit.',
      source: 'Poetics of Music, Harvard lectures, 1939–40',
    },
    overview:
      'Stravinsky repeatedly reinvented his musical language, from explosive ballet scores for the Ballets Russes to crisp neoclassical works and later serial experiments.',
  },
  {
    id: 'vivaldi',
    name: 'Antonio Vivaldi',
    shortName: 'Vivaldi',
    period: 'Baroque',
    born: { year: 1678, place: 'Venice' },
    died: { year: 1741, place: 'Vienna' },
    nationality: 'Italian',
    bio: 'Concertos, operas, sacred music, and vivid instrumental color.',
    asset: 'composerVivaldi',
    knownFor: ['Violin concertos', 'Opera', 'Sacred music'],
    overview:
      'Vivaldi, a priest nicknamed “the Red Priest” for his hair, spent much of his career teaching at the Ospedale della Pietà in Venice. He gave the Baroque concerto extraordinary energy and color, writing more than 500 of them.',
  },
  {
    id: 'dvorak',
    name: 'Antonín Dvořák',
    shortName: 'Dvořák',
    period: 'Romantic',
    born: { year: 1841, place: 'Nelahozeves' },
    died: { year: 1904, place: 'Prague' },
    nationality: 'Czech',
    bio: 'Symphonies, chamber music, dances, and lyrical orchestral works.',
    asset: 'composerDvorak',
    knownFor: ['Symphonies', 'Chamber music', 'Slavonic Dances'],
    overview:
      'Dvořák combined Romantic sweep with folk-inflected melody, creating music known for warmth, rhythmic vitality, and generous lyricism. From 1892 to 1895 he directed the National Conservatory of Music in New York.',
  },
  {
    id: 'handel',
    name: 'George Frideric Handel',
    shortName: 'Handel',
    period: 'Baroque',
    born: { year: 1685, place: 'Halle' },
    died: { year: 1759, place: 'London' },
    nationality: 'German-British',
    bio: 'Oratorios, operas, and ceremonial music for London.',
    asset: 'composerHandel',
    knownFor: ['Oratorio', 'Opera', 'Orchestral suites'],
    overview:
      'Handel trained in Germany and Italy and made his career in London, first writing Italian operas and then the English oratorios, Messiah among them, that made him a national figure. He became a British subject in 1727.',
  },
  {
    id: 'haydn',
    name: 'Joseph Haydn',
    shortName: 'Haydn',
    period: 'Classical',
    born: { year: 1732, place: 'Rohrau' },
    died: { year: 1809, place: 'Vienna' },
    nationality: 'Austrian',
    bio: 'Symphonies, string quartets, and the shaping of Classical form.',
    asset: 'composerHaydn',
    knownFor: ['Symphonies', 'String quartets', 'Oratorio'],
    quote: {
      text: 'Since God has given me a cheerful heart, He will forgive me for serving Him cheerfully.',
      source: 'Reported by his biographer Georg August Griesinger, 1810',
    },
    overview:
      'Haydn spent nearly thirty years as court musician to the Esterházy family, where he wrote over a hundred symphonies and helped define both the symphony and the string quartet. His visits to London in the 1790s made him the most celebrated composer in Europe.',
  },
  {
    id: 'schubert',
    name: 'Franz Schubert',
    shortName: 'Schubert',
    period: 'Romantic',
    born: { year: 1797, place: 'Vienna' },
    died: { year: 1828, place: 'Vienna' },
    nationality: 'Austrian',
    bio: 'Songs, symphonies, and chamber music of lyrical depth.',
    asset: 'composerSchubert',
    knownFor: ['Songs', 'Symphonies', 'Chamber music'],
    overview:
      'Schubert wrote more than 600 songs and a body of symphonies, sonatas and chamber music in a life of just 31 years. Much of it was played only among friends during his lifetime and published or premiered decades after his death.',
  },
  {
    id: 'chopin',
    name: 'Frédéric Chopin',
    shortName: 'Chopin',
    period: 'Romantic',
    born: { year: 1810, place: 'Żelazowa Wola' },
    died: { year: 1849, place: 'Paris' },
    nationality: 'Polish',
    bio: 'Poetic piano music: nocturnes, ballades, and mazurkas.',
    asset: 'composerChopin',
    knownFor: ['Piano music', 'Nocturnes', 'Polish dances'],
    overview:
      'Chopin wrote almost entirely for the piano, developing a new, singing way of playing it. Born in Poland, he settled in Paris in 1831, and his mazurkas and polonaises kept the dances of his homeland at the heart of his music.',
  },
  {
    id: 'mendelssohn',
    name: 'Felix Mendelssohn',
    shortName: 'Mendelssohn',
    period: 'Romantic',
    born: { year: 1809, place: 'Hamburg' },
    died: { year: 1847, place: 'Leipzig' },
    nationality: 'German',
    bio: 'Bright orchestral colour, choral works, and the revival of Bach.',
    asset: 'composerMendelssohn',
    knownFor: ['Concertos', 'Overtures', 'Oratorio'],
    quote: {
      text: 'The thoughts which are expressed to me by music that I love are not too indefinite to be put into words, but on the contrary, too definite.',
      source: 'Letter to Marc-André Souchay, 15 October 1842',
    },
    overview:
      'A prodigy who wrote his Octet at sixteen, Mendelssohn became conductor of the Leipzig Gewandhaus Orchestra and founded the city’s conservatory. His 1829 performance of Bach’s St Matthew Passion sparked a revival of Bach’s music.',
  },
  {
    id: 'brahms',
    name: 'Johannes Brahms',
    shortName: 'Brahms',
    period: 'Romantic',
    born: { year: 1833, place: 'Hamburg' },
    died: { year: 1897, place: 'Vienna' },
    nationality: 'German',
    bio: 'Symphonies, chamber music, and choral works rooted in tradition.',
    asset: 'composerBrahms',
    knownFor: ['Symphonies', 'Chamber music', 'Choral works'],
    overview:
      'Brahms combined Romantic warmth with the discipline of Bach and Beethoven. Championed early by Robert and Clara Schumann, he settled in Vienna and took more than twenty years to complete his First Symphony.',
  },
  {
    id: 'tchaikovsky',
    name: 'Pyotr Ilyich Tchaikovsky',
    shortName: 'Tchaikovsky',
    period: 'Romantic',
    born: { year: 1840, place: 'Votkinsk' },
    died: { year: 1893, place: 'Saint Petersburg' },
    nationality: 'Russian',
    bio: 'Ballets, symphonies, and concertos of sweeping melody.',
    asset: 'composerTchaikovsky',
    knownFor: ['Ballet', 'Symphonies', 'Concertos'],
    overview:
      'Tchaikovsky was the first Russian composer to win a wide international following. His ballets, symphonies and concertos combine memorable melody with brilliant orchestration, and in 1891 he conducted at the opening of Carnegie Hall in New York.',
  },
  {
    id: 'verdi',
    name: 'Giuseppe Verdi',
    shortName: 'Verdi',
    period: 'Romantic',
    born: { year: 1813, place: 'Le Roncole' },
    died: { year: 1901, place: 'Milan' },
    nationality: 'Italian',
    bio: 'Operas of drama, melody, and political passion.',
    asset: 'composerVerdi',
    knownFor: ['Opera', 'Requiem', 'Choruses'],
    quote: {
      text: 'Let us return to the past: it will be progress.',
      source: 'Letter to Francesco Florimo, 4 January 1871',
    },
    overview:
      'Verdi dominated Italian opera for half a century, from Nabucco in 1842 to Falstaff in 1893. His operas set big human conflicts to direct, singable melody, and he became a symbol of Italian unification.',
  },
  {
    id: 'puccini',
    name: 'Giacomo Puccini',
    shortName: 'Puccini',
    period: 'Romantic',
    born: { year: 1858, place: 'Lucca' },
    died: { year: 1924, place: 'Brussels' },
    nationality: 'Italian',
    bio: 'Lyrical, theatrical operas of love and loss.',
    asset: 'composerPuccini',
    knownFor: ['Opera', 'Melody', 'Theatre'],
    overview:
      'Puccini was the leading Italian opera composer after Verdi. La bohème, Tosca and Madama Butterfly pair soaring melody with a sharp sense of theatre, and remain among the most performed operas in the world.',
  },
  {
    id: 'ravel',
    name: 'Maurice Ravel',
    shortName: 'Ravel',
    period: 'Modern',
    born: { year: 1875, place: 'Ciboure' },
    died: { year: 1937, place: 'Paris' },
    nationality: 'French',
    bio: 'Precise craftsmanship and dazzling orchestral colour.',
    asset: 'composerRavel',
    knownFor: ['Orchestration', 'Piano music', 'Ballet'],
    overview:
      'Ravel was a meticulous craftsman and one of the great orchestrators, famous too for his orchestration of Mussorgsky’s Pictures at an Exhibition. Often grouped with Debussy, he preferred clear forms and drew on Spanish music, jazz and the French Baroque.',
  },
  {
    id: 'grieg',
    name: 'Edvard Grieg',
    shortName: 'Grieg',
    period: 'Romantic',
    born: { year: 1843, place: 'Bergen' },
    died: { year: 1907, place: 'Bergen' },
    nationality: 'Norwegian',
    bio: 'Lyric piano pieces and music shaped by Norwegian folk song.',
    asset: 'composerGrieg',
    knownFor: ['Piano music', 'Incidental music', 'Songs'],
    overview:
      'Grieg brought Norwegian folk music into the concert hall and became his country’s leading composer. Besides his Piano Concerto and the music for Ibsen’s Peer Gynt, he wrote sixty-six Lyric Pieces for piano.',
  },
  {
    id: 'monteverdi',
    name: 'Claudio Monteverdi',
    shortName: 'Monteverdi',
    period: 'Baroque',
    born: { year: 1567, place: 'Cremona' },
    died: { year: 1643, place: 'Venice' },
    nationality: 'Italian',
    bio: 'Madrigals, early opera, and music for St Mark’s in Venice.',
    asset: 'composerMonteverdi',
    knownFor: ['Opera', 'Madrigals', 'Sacred music'],
    overview:
      'Monteverdi stands at the turn from the Renaissance to the Baroque. His L’Orfeo is one of the first great operas, and from 1613 he was maestro di cappella at St Mark’s Basilica in Venice, where he wrote some of the century’s grandest sacred music.',
  },
  {
    id: 'liszt',
    name: 'Franz Liszt',
    shortName: 'Liszt',
    period: 'Romantic',
    born: { year: 1811, place: 'Raiding' },
    died: { year: 1886, place: 'Bayreuth' },
    nationality: 'Hungarian',
    bio: 'Virtuoso piano music, symphonic poems, and a celebrity career.',
    asset: 'composerLiszt',
    knownFor: ['Piano music', 'Symphonic poems', 'Virtuosity'],
    overview:
      'Liszt was the most celebrated pianist of the nineteenth century, so famous that his concerts caused “Lisztomania”. He gave up touring at 35, invented the symphonic poem, and championed the music of Wagner, Berlioz and many younger composers.',
  },
  {
    id: 'rachmaninoff',
    name: 'Sergei Rachmaninoff',
    shortName: 'Rachmaninoff',
    period: 'Romantic',
    born: { year: 1873, place: 'Semyonovo' },
    died: { year: 1943, place: 'Beverly Hills' },
    nationality: 'Russian',
    bio: 'Lush piano concertos and preludes from a great virtuoso.',
    asset: 'composerRachmaninoff',
    knownFor: ['Piano concertos', 'Preludes', 'Virtuosity'],
    overview:
      'Rachmaninoff was one of the greatest pianists who ever lived and the last great composer of the Russian Romantic tradition. After the 1917 revolution he left Russia for good and spent much of his life touring as a pianist.',
  },
  {
    id: 'mahler',
    name: 'Gustav Mahler',
    shortName: 'Mahler',
    period: 'Romantic',
    born: { year: 1860, place: 'Kaliště' },
    died: { year: 1911, place: 'Vienna' },
    nationality: 'Austrian',
    bio: 'Vast symphonies and orchestral songs.',
    asset: 'composerMahler',
    knownFor: ['Symphonies', 'Orchestral songs', 'Conducting'],
    overview:
      'Mahler was best known in his lifetime as a conductor, directing the Vienna Court Opera and later the New York Philharmonic, and he composed mainly in the summers. His symphonies set out to “embrace everything”, from funeral marches to folk tunes and choirs.',
  },
]

export function findComposer(id: string | undefined) {
  if (!id) {
    return undefined
  }

  return composers.find((composer) => composer.id === id)
}

export function getComposerName(composerId: string) {
  return findComposer(composerId)?.name ?? 'Unknown composer'
}

/** "1685–1750" */
export function formatLifespan(composer: Composer) {
  return `${composer.born.year}–${composer.died.year}`
}

/** Up to four other composers, those from the same period first. */
export function getRecommendedComposers(composer: Composer) {
  const samePeriod = composers.filter(
    (candidate) => candidate.period === composer.period && candidate.id !== composer.id,
  )
  const otherComposers = composers.filter(
    (candidate) => candidate.period !== composer.period && candidate.id !== composer.id,
  )

  return [...samePeriod, ...otherComposers].slice(0, 4)
}
