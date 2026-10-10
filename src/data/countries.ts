import type { Composer } from '@/models/composer'
import type { Work } from '@/models/work'
import { composers, findComposer } from './composers'

export type Country = {
  /** URL value, e.g. `italy` in `/composers?country=italy`. */
  id: string
  name: string
  /** The `nationality` values that belong to this country. */
  nationalities: string[]
  overview: string
}

/** Present-day countries, named the way listeners look for them. */
export const countries: Country[] = [
  {
    id: 'austria',
    name: 'Austria',
    nationalities: ['Austrian'],
    overview:
      'Vienna drew musicians from all over Europe. Haydn, Mozart and Schubert made it the home of the Classical style, Beethoven moved there from Bonn at twenty-one, and later in the century Bruckner and Mahler built vast symphonies there.',
  },
  {
    id: 'czechia',
    name: 'Czechia',
    nationalities: ['Czech'],
    overview:
      'Dvořák brought the dances and folk melodies of Bohemia into the symphony and the concert hall, and carried them as far as New York.',
  },
  {
    id: 'england',
    name: 'England',
    nationalities: ['English'],
    overview:
      'Purcell made London one of the great musical cities of the Baroque, writing for church, court and theatre. Two centuries later Elgar gave English music a new confidence, with the Enigma Variations and music that came to sound like the nation itself.',
  },
  {
    id: 'finland',
    name: 'Finland',
    nationalities: ['Finnish'],
    overview:
      'Sibelius gave Finland a musical voice while it was still part of the Russian Empire, drawing on the epic Kalevala and the northern landscape. Finlandia became a symbol of the nation’s fight for independence.',
  },
  {
    id: 'france',
    name: 'France',
    nationalities: ['French'],
    overview:
      'From Berlioz’s colourful orchestra to Bizet’s Carmen and the ballets of Adam and Delibes, French composers prized colour, clarity and theatre. Around 1900 Debussy and Ravel turned away from German Romanticism and found new sounds for the orchestra and the piano.',
  },
  {
    id: 'germany',
    name: 'Germany',
    nationalities: ['German', 'German-British'],
    overview:
      'From Bach in Leipzig to Wagner at Bayreuth, German composers shaped the fugue, the symphony and music drama. Handel, born in Halle, took the tradition to London and spent most of his life there.',
  },
  {
    id: 'hungary',
    name: 'Hungary',
    nationalities: ['Hungarian'],
    overview:
      'Liszt, born in 1811 in the Kingdom of Hungary, became the first superstar pianist, and brought the sound of Hungarian Roma bands into his rhapsodies.',
  },
  {
    id: 'italy',
    name: 'Italy',
    nationalities: ['Italian'],
    overview:
      'Italy gave music opera, the concerto and much of its vocabulary, from allegro to crescendo. Monteverdi and Vivaldi led the Baroque; Rossini, Verdi and Puccini made Italian opera loved around the world.',
  },
  {
    id: 'norway',
    name: 'Norway',
    nationalities: ['Norwegian'],
    overview:
      'Grieg drew on Norwegian folk song and dance, and became the musical voice of a country finding its own identity.',
  },
  {
    id: 'poland',
    name: 'Poland',
    nationalities: ['Polish'],
    overview:
      'Chopin left Warsaw at twenty and never returned, but the mazurkas and polonaises of his homeland run through almost everything he wrote.',
  },
  {
    id: 'russia',
    name: 'Russia',
    nationalities: ['Russian'],
    overview:
      'Tchaikovsky brought Russian melody to the ballet and the symphony. Stravinsky, Rachmaninoff and Prokofiev carried Russian music into the twentieth century: the first two never went back after the revolution, while Prokofiev returned to the Soviet Union.',
  },
]

export function findCountry(id: string | null | undefined) {
  return id ? countries.find((country) => country.id === id) : undefined
}

export function getComposerCountry(composer: Composer) {
  return countries.find((country) => country.nationalities.includes(composer.nationality))
}

export function getComposersByCountry(country: Country) {
  return composers.filter((composer) => country.nationalities.includes(composer.nationality))
}

export function isWorkFromCountry(work: Work, country: Country) {
  const composer = findComposer(work.composerId)
  return composer ? country.nationalities.includes(composer.nationality) : false
}
