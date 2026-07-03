import type { Composer } from './models'

export const composers: Composer[] = [
  {
    id: '1',
    name: 'Johann Sebastian Bach',
    period: 'Baroque',
    bio: 'Counterpoint, sacred music, keyboard works, and solo suites.',
    asset: 'composerBaroque',
    years: '1685-1750',
    nationality: 'German',
    knownFor: ['Counterpoint', 'Sacred music', 'Keyboard works'],
    quote: 'The aim of music is the refreshment of the soul.',
    overview:
      'Bach brought Baroque counterpoint to a level of clarity and expressive force that still shapes how musicians understand harmony, form, and sacred drama.',
  },
  {
    id: '2',
    name: 'Wolfgang Amadeus Mozart',
    period: 'Classical',
    bio: 'Operas, concertos, chamber works, and symphonies.',
    asset: 'composerAvatar',
    years: '1756-1791',
    nationality: 'Austrian',
    knownFor: ['Opera', 'Piano concertos', 'Symphonies'],
    quote: 'The music is not in the notes, but in the silence between.',
    overview:
      'Mozart shaped Classical style with extraordinary melodic fluency, dramatic timing, and formal balance across opera, chamber music, concertos, and symphonies.',
  },
  {
    id: '3',
    name: 'Ludwig van Beethoven',
    period: 'Classical / Romantic',
    bio: 'Symphonic drama, piano sonatas, quartets, and concertos.',
    asset: 'composerBeethoven',
    years: '1770-1827',
    nationality: 'German',
    knownFor: ['Symphonies', 'Piano sonatas', 'String quartets'],
    quote: 'I will seize fate by the throat; it shall not wholly subdue me.',
    overview:
      'Beethoven’s music bridges the Classical and Romantic eras. His works are known for emotional depth, structural innovation, and enduring influence on Western art music.',
  },
  {
    id: '4',
    name: 'Clara Schumann',
    period: 'Romantic',
    bio: 'Piano works, songs, and a central concert career.',
    asset: 'composerRomantic',
    years: '1819-1896',
    nationality: 'German',
    knownFor: ['Piano works', 'Songs', 'Concert performance'],
    quote: 'Nothing surpasses the joy of creation.',
    overview:
      'Clara Schumann was one of the nineteenth century’s defining pianists and a composer of intimate, finely crafted works for piano, voice, and chamber ensemble.',
  },
  {
    id: '5',
    name: 'Claude Debussy',
    period: 'Modern',
    bio: 'Color, atmosphere, and harmonic ambiguity.',
    asset: 'composerDebussy',
    years: '1862-1918',
    nationality: 'French',
    knownFor: ['Piano miniatures', 'Orchestral color', 'Harmonic atmosphere'],
    quote: 'Music is the space between the notes.',
    overview:
      'Debussy opened new harmonic and textural possibilities, favoring color, suggestion, and atmosphere over the rhetorical weight of earlier Romantic forms.',
  },
  {
    id: '6',
    name: 'Igor Stravinsky',
    period: 'Modern',
    bio: 'Rhythmic force, ballet, neoclassicism, and reinvention.',
    asset: 'composerStravinsky',
    years: '1882-1971',
    nationality: 'Russian',
    knownFor: ['Ballet', 'Rhythmic drive', 'Neoclassicism'],
    quote: 'The more constraints one imposes, the more one frees oneself.',
    overview:
      'Stravinsky repeatedly reinvented his musical language, from explosive ballet scores to crisp neoclassical works and later serial experiments.',
  },
]

export function findComposer(id: string | undefined) {
  if (!id) {
    return undefined
  }

  return composers.find((composer) => composer.id === id)
}
