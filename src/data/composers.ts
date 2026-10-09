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
