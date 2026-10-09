import type { Guide } from '@/models/guide'

export const guides: Guide[] = [
  {
    id: 'where-to-start',
    title: 'Where should I start with classical music?',
    type: 'Listening guide',
    category: 'Getting started',
    description: 'A beginner’s path through a handful of vivid, approachable works.',
    asset: 'genreOrchestral',
    audience: 'New listeners',
    overview:
      'You don’t need to know anything to enjoy classical music. Start with a few vivid, approachable pieces, notice what you like, and let that lead you to the next one.',
    sections: [
      {
        title: 'Start with short pieces',
        body: [
          'A five-minute piece asks very little of you. Debussy’s Clair de lune is a good first stop: one instrument, one mood, and a melody that floats. Mozart’s Eine kleine Nachtmusik is another: its first movement opens with a tune you have almost certainly heard before.',
          'Listen once without doing anything else. If you like it, listen again and see what you notice the second time.',
        ],
      },
      {
        title: 'Try one symphony',
        body: [
          'A symphony is a large piece for orchestra, usually in four movements. Beethoven’s Fifth is the classic first choice: its four-note opening returns throughout, so you always have something to hold on to, and it ends in triumph.',
          'If you want something warmer and more lyrical, try Dvořák’s New World Symphony, especially the slow second movement.',
        ],
      },
      {
        title: 'Notice contrast',
        body: [
          'Most classical works are built from contrasts: fast and slow, loud and soft, many instruments and few. Vivaldi’s The Four Seasons makes this easy to hear. Each of its four concertos runs fast, slow, fast, and each paints a season, from birdsong to a summer storm.',
        ],
      },
      {
        title: 'Follow what you enjoy',
        body: [
          'When something clicks, follow it. Open the composer’s page and try another of their works, or pick a recommendation from the same period. Taste in classical music grows the same way it does in any other music: one favourite at a time.',
        ],
      },
    ],
    workIds: ['debussy-clair-de-lune', 'mozart-eine-kleine-nachtmusik', 'beethoven-symphony-5', 'dvorak-symphony-9', 'vivaldi-four-seasons'],
  },
  {
    id: 'your-first-opera',
    title: 'How to listen to your first opera',
    type: 'Listening guide',
    category: 'Genres',
    description: 'What to know before watching your first opera.',
    asset: 'categoryOpera',
    audience: 'First opera viewers',
    overview:
      'Opera is drama told through music. It becomes much easier to enjoy when you know the story in advance, listen for how the voices carry it, and accept that emotion matters more than realism.',
    sections: [
      {
        title: 'Read the synopsis',
        body: [
          'Knowing the plot frees you to listen. Most opera houses show surtitles, a translation above the stage, but reading the story beforehand means you can watch the singers instead of the text.',
          'In Beethoven’s Fidelio, for example, Leonore disguises herself as a young man called Fidelio to rescue her husband from a political prison. That is all you need to follow it.',
        ],
      },
      {
        title: 'Listen for the voices',
        body: [
          'Voices are cast like characters. Sopranos and tenors are often the heroes, while lower voices play fathers, villains or comic roles. Arias are the moments when the action pauses and a character sings about how they feel; ensembles let several characters react at once.',
          'Some operas, Fidelio among them, link the songs with spoken dialogue rather than sung recitative.',
        ],
      },
      {
        title: 'Follow the staging',
        body: [
          'Opera was written to be seen. Sets, costumes and lighting carry as much of the meaning as the words. If you are watching a recording, choose a filmed production rather than an audio-only one for your first time.',
        ],
      },
      {
        title: 'Choose an accessible first opera',
        body: [
          'Pick something with a clear story and a manageable length. Fidelio runs a little over two hours and builds to one of the most uplifting finales in the repertoire, with the prisoners stepping out into the light.',
        ],
      },
    ],
    workIds: ['beethoven-fidelio'],
  },
  {
    id: 'symphony-concerto-sonata',
    title: 'Symphony, concerto, or sonata?',
    type: 'Reference',
    category: 'Genres',
    description: 'What the most common classical titles actually mean.',
    asset: 'categoryChamber',
    audience: 'Curious beginners',
    overview:
      'Classical titles usually tell you who is playing and how the piece is built. Learn four common labels and browsing works becomes much less mysterious.',
    sections: [
      {
        title: 'Symphony',
        body: [
          'A large work for full orchestra, usually in four movements: a fast opening, a slow movement, a dance-like third movement and a fast finale. Beethoven’s Fifth and Dvořák’s Ninth both follow this plan.',
        ],
      },
      {
        title: 'Concerto',
        body: [
          'A work for one or more soloists with orchestra, usually in three movements: fast, slow, fast. The soloist and orchestra trade ideas, compete and combine. Vivaldi’s The Four Seasons is a set of four violin concertos; Bach’s Brandenburg Concertos each feature a different group of soloists.',
        ],
      },
      {
        title: 'Sonata',
        body: [
          'A work for one or two instruments, most often piano, or another instrument with piano. Beethoven wrote 32 piano sonatas; the “Moonlight” is the best known, and unusually starts with its slow movement.',
        ],
      },
      {
        title: 'Suite',
        body: [
          'A sequence of dances. Baroque suites move through a standard set: allemande, courante, sarabande, gigue, often with extra dances in between. Bach’s first Cello Suite adds a prelude and a pair of minuets.',
        ],
      },
    ],
    workIds: ['beethoven-symphony-5', 'vivaldi-four-seasons', 'bach-brandenburg-concertos', 'beethoven-moonlight-sonata', 'bach-cello-suite-1'],
  },
  {
    id: 'the-romantic-period',
    title: 'The Romantic period',
    type: 'Period guide',
    category: 'Periods',
    description: 'The era of emotion, expression, and grandeur, from about 1820 to 1900.',
    asset: 'composerClaraSchumann',
    audience: 'History explorers',
    overview:
      'Between roughly 1820 and 1900, composers pushed music towards personal expression. Harmony grew richer, orchestras grew bigger, and composers and performers became public figures in their own right.',
    sections: [
      {
        title: 'Emotional expression',
        body: [
          'Where Classical composers prized balance and clarity, Romantic composers wanted music to express individual feeling, from intimate longing to overwhelming drama. Beethoven’s later works pointed the way, and almost every Romantic composer felt his shadow.',
        ],
      },
      {
        title: 'A bigger orchestra',
        body: [
          'Orchestras gained more brass, more percussion and more players overall, and composers used them for colour as much as volume. Listen to the cor anglais solo in the Largo of Dvořák’s New World Symphony: a single instrumental colour carries the whole mood.',
        ],
      },
      {
        title: 'National styles',
        body: [
          'Many composers drew on the folk music of their own countries. Dvořák’s music is full of Czech dance rhythms and song-like melodies, and in America he encouraged composers to build on the music they heard around them.',
        ],
      },
      {
        title: 'Virtuosity',
        body: [
          'The nineteenth century was the age of the touring virtuoso. Clara Schumann performed across Europe for more than sixty years, championed the music of her husband Robert and of Brahms, and still found time to compose works like her Piano Trio.',
        ],
      },
    ],
    workIds: ['dvorak-symphony-9', 'clara-schumann-piano-trio'],
  },
  {
    id: 'what-makes-bach-sound-like-bach',
    title: 'What makes Bach sound like Bach?',
    type: 'Composer guide',
    category: 'Composers',
    description: 'Counterpoint, dance, and the architecture behind the music.',
    asset: 'composerBach',
    audience: 'Composer-focused listeners',
    overview:
      'Bach’s music often feels inevitable. Independent lines move with clarity and purpose, dance rhythms keep it moving, and every piece seems built to a plan.',
    sections: [
      {
        title: 'Counterpoint',
        body: [
          'Counterpoint means several independent melodies sounding at once, each making sense on its own. Bach was its supreme master. In the Goldberg Variations every third variation is a canon, where one voice imitates another at a fixed distance.',
        ],
      },
      {
        title: 'Dance',
        body: [
          'Much of Bach’s instrumental music is built from dances. The movements of the Cello Suites (allemande, courante, sarabande, gigue) each have their own characteristic rhythm, even when no one is dancing.',
        ],
      },
      {
        title: 'Music for the church',
        body: [
          'From 1723 Bach worked as Thomaskantor in Leipzig, responsible for music in the city’s main churches. He wrote hundreds of cantatas for Sunday services, and the same seriousness of purpose runs through his instrumental works.',
        ],
      },
      {
        title: 'Architecture',
        body: [
          'Bach loved large designs. The Goldberg Variations build thirty variations over a single bass line and return to the opening aria at the end; the Brandenburg Concertos give each concerto a different set of soloists, as if exploring every possible combination.',
        ],
      },
    ],
    workIds: ['bach-goldberg-variations', 'bach-cello-suite-1', 'bach-brandenburg-concertos'],
  },
  {
    id: 'how-to-listen-actively',
    title: 'How to listen actively',
    type: 'Listening guide',
    category: 'Listening',
    description: 'Simple ways to notice melody, texture, form, and color as you listen.',
    asset: 'categoryPiano',
    audience: 'Active listeners',
    overview:
      'Active listening is not about technical analysis. It is the habit of noticing what changes, what returns and what catches your ear, and it makes every piece more rewarding.',
    sections: [
      {
        title: 'Listen for the melody',
        body: [
          'Find the tune and follow it. In Beethoven’s Fifth, the four-note opening motif turns up again and again, in different instruments and moods. Try counting how many times you hear it in the first minute.',
        ],
      },
      {
        title: 'Notice texture',
        body: [
          'Texture is how many things are happening at once. A solo cello playing Bach is one line; Stravinsky’s The Rite of Spring piles up rhythms and melodies in layers. Ask yourself: how many things am I hearing right now?',
        ],
      },
      {
        title: 'Track repetition',
        body: [
          'Composers build pieces from returns. In the finale of Eine kleine Nachtmusik, a rondo, the main tune keeps coming back between new episodes. Noticing a return is one of the most satisfying moments in listening.',
        ],
      },
      {
        title: 'Write one sentence',
        body: [
          'After you listen, write down one thing you noticed: a sound, a mood, a moment that surprised you. Over time these sentences become a record of how your ear is growing.',
        ],
      },
    ],
    workIds: ['beethoven-symphony-5', 'stravinsky-rite-of-spring', 'mozart-eine-kleine-nachtmusik', 'bach-cello-suite-1'],
  },
]

export function findGuide(id: string | undefined) {
  if (!id) {
    return undefined
  }

  return guides.find((guide) => guide.id === id)
}

/** Reading time at about 200 words a minute, e.g. "3 min read". */
export function getReadTime(guide: Guide) {
  const text = [guide.overview, ...guide.sections.flatMap((section) => [section.title, ...section.body])].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length

  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

/** Up to four other guides, those in the same category first. */
export function getRecommendedGuides(guide: Guide) {
  const sameCategory = guides.filter(
    (candidate) => candidate.category === guide.category && candidate.id !== guide.id,
  )
  const otherGuides = guides.filter(
    (candidate) => candidate.category !== guide.category && candidate.id !== guide.id,
  )

  return [...sameCategory, ...otherGuides].slice(0, 4)
}
