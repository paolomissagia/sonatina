import type { Article } from '@/models/article'

export const articles: Article[] = [
  {
    id: 'where-to-start',
    title: 'Where should I start with classical music?',
    type: 'Guide',
    category: 'Guides',
    description: 'A beginner’s path through a handful of vivid, approachable works.',
    asset: 'genreOrchestral',
    audience: 'New listeners',
    overview:
      'You don’t need to know anything to enjoy classical music. Start with a few vivid, approachable pieces, notice what you like, and let that lead you to the next one. This guide suggests a path through the catalogue, from five-minute pieces to a full symphony and a night at the ballet.',
    sections: [
      {
        title: 'Start with short pieces',
        body: [
          'A five-minute piece asks very little of you. Debussy’s Clair de lune is a good first stop: one instrument, one mood, and a melody that floats. Beethoven’s Für Elise and Liszt’s Liebestraum No. 3 are just as short, and you will probably recognise both within a few seconds.',
          'Listen once without doing anything else. If you like it, listen again and see what you notice the second time: a change of key, a return of the opening tune, a moment where everything goes quiet.',
        ],
      },
      {
        title: 'Try one symphony',
        body: [
          'A symphony is a large piece for orchestra, usually in four movements. Beethoven’s Fifth is the classic first choice: its four-note opening returns throughout, so you always have something to hold on to, and it ends in triumph.',
          'If you want something warmer and more lyrical, try Dvořák’s New World Symphony, especially the slow second movement. For something more compact and restless, Mozart’s Symphony No. 40 takes about half an hour.',
        ],
      },
      {
        title: 'Hear a soloist take on an orchestra',
        body: [
          'A concerto puts one soloist in front of the orchestra, and the drama comes from the conversation between them. Grieg’s Piano Concerto opens with a drum roll and a cascade of chords that grabs you at once.',
          'Rachmaninoff’s Second Piano Concerto and Mendelssohn’s Violin Concerto are two more of the best-loved concertos ever written, and both reward a single, uninterrupted listen.',
        ],
      },
      {
        title: 'Notice contrast',
        body: [
          'Most classical works are built from contrasts: fast and slow, loud and soft, many instruments and few. Vivaldi’s The Four Seasons makes this easy to hear. Each of its four concertos runs fast, slow, fast, and each paints a season, from birdsong to a summer storm.',
        ],
      },
      {
        title: 'Opera and ballet',
        body: [
          'Opera and ballet add a story, and each has its own way in. When you are ready, the guides to starting with opera and starting with ballet suggest where to begin.',
        ],
      },
      {
        title: 'Follow what you enjoy',
        body: [
          'When something clicks, follow it. Open the composer’s page and try another of their works, or pick a recommendation from the same period. The player keeps going while you browse, so you can read about a piece while it plays.',
          'Taste in classical music grows the same way it does in any other music: one favourite at a time.',
        ],
      },
    ],
    workIds: [
      'debussy-clair-de-lune',
      'beethoven-fur-elise',
      'liszt-liebestraum-3',
      'beethoven-symphony-5',
      'dvorak-symphony-9',
      'grieg-piano-concerto',
      'vivaldi-four-seasons',
      'tchaikovsky-nutcracker',
    ],
  },
  {
    id: 'your-first-opera',
    title: 'Where to start with opera',
    type: 'Guide',
    category: 'Guides',
    description: 'What opera is, which tunes to try first, and how to choose your first whole opera.',
    asset: 'categoryOpera',
    audience: 'New listeners',
    overview:
      'Opera is drama told through music: singers act, the orchestra carries the emotion, and the story moves at the speed of feeling. It can look intimidating, but most operas are built on simple stories of love, jealousy and revenge, and their greatest arias are among the most beautiful melodies ever written.',
    sections: [
      {
        title: 'What opera is',
        body: [
          'An opera is a play in which almost everything is sung. Arias are the moments when a character stops to tell us how they feel; recitative moves the plot along in a sung, speech-like style; ensembles let several characters sing at once, each with their own thoughts.',
          'Some operas link the music with spoken dialogue instead. Mozart’s The Magic Flute and Bizet’s Carmen were both written this way, which makes the story easy to follow.',
        ],
      },
      {
        title: 'Start with the tunes',
        body: [
          'You almost certainly know some opera already. Try La donna è mobile from Verdi’s Rigoletto, the Toreador Song from Carmen, O mio babbino caro from Puccini’s Gianni Schicchi and Nessun dorma from Turandot. Each lasts only a few minutes, and each can lead you to a whole opera.',
        ],
      },
      {
        title: 'Choose your first whole opera',
        body: [
          'Pick something with a clear story and a manageable length. Gianni Schicchi is a one-act comedy of under an hour. Puccini’s La bohème runs under two hours and is full of melody.',
          'If you would rather laugh, Rossini’s The Barber of Seville and Mozart’s The Marriage of Figaro are among the funniest operas ever written.',
        ],
      },
      {
        title: 'Read the story first',
        body: [
          'Knowing the plot frees you to listen. Most opera houses show surtitles, a translation above the stage, but reading the story beforehand means you can watch the singers rather than the text.',
          'Opera was written to be seen, so for your first time a filmed production is even better than a recording. Sets, costumes and acting carry as much of the meaning as the words.',
        ],
      },
      {
        title: 'Comedy, tragedy and music drama',
        body: [
          'Italian opera divides roughly into comedy, opera buffa, and serious drama, opera seria. Mozart and Rossini were masters of comedy; Verdi and Puccini of tragedy. Wagner went further still, turning opera into vast music dramas: try the Ride of the Valkyries before attempting a whole evening.',
        ],
      },
      {
        title: 'Listening to old recordings',
        body: [
          'Many of the opera recordings here are historical, sung by legends such as Enrico Caruso. The guide to the golden age of opera singing explains how to listen past the crackle to the voices that made them famous.',
        ],
      },
    ],
    workIds: [
      'verdi-rigoletto',
      'bizet-carmen',
      'puccini-gianni-schicchi',
      'puccini-turandot',
      'puccini-la-boheme',
      'mozart-marriage-of-figaro',
      'rossini-barber-of-seville',
    ],
  },
  {
    id: 'where-to-start-with-ballet',
    title: 'Where to start with ballet',
    type: 'Guide',
    category: 'Guides',
    description: 'Stories told in dance, and the scores that bring them to life.',
    asset: 'genreBallet',
    audience: 'New listeners',
    overview:
      'Ballet tells stories through dance and music, without a single word. Its music had to be clear, rhythmic and full of character for the dancers, which makes ballet scores some of the most immediately enjoyable music in the repertoire, even heard without the stage.',
    sections: [
      {
        title: 'Music made for dancing',
        body: [
          'A ballet score is built from short numbers: waltzes, character dances, solos and the pas de deux, a duet for the two leading dancers. Each number has a clear mood and a steady pulse, so you can follow it easily even with your eyes closed.',
        ],
      },
      {
        title: 'Start with Tchaikovsky',
        body: [
          'Tchaikovsky wrote the three most famous ballets of all: Swan Lake, The Sleeping Beauty and The Nutcracker. The Nutcracker’s Dance of the Sugar Plum Fairy, with the tinkling celesta, and the haunting swan theme of Swan Lake are perfect first listens.',
        ],
      },
      {
        title: 'The Romantic ballet',
        body: [
          'Earlier in the nineteenth century, Paris was the capital of ballet. Adam’s Giselle, with its ghostly second act of jilted brides who dance men to death, is still at the heart of the repertoire.',
        ],
      },
      {
        title: 'Ballet turns modern',
        body: [
          'In the early twentieth century, Serge Diaghilev’s Ballets Russes in Paris commissioned daring new scores. Stravinsky wrote three of them: The Firebird, Petrushka and The Rite of Spring, whose premiere in 1913 caused an uproar. Later, Prokofiev turned Romeo and Juliet into a full-length ballet.',
        ],
      },
      {
        title: 'Watch it if you can',
        body: [
          'Ballet was made to be seen. Once you know the music, find a filmed performance: the steps, costumes and storytelling transform it. Many ballets also exist as concert suites, shorter selections of the best numbers for orchestra alone.',
        ],
      },
    ],
    workIds: [
      'tchaikovsky-nutcracker',
      'tchaikovsky-swan-lake',
      'tchaikovsky-sleeping-beauty',
      'adam-giselle',
      'stravinsky-firebird',
      'stravinsky-petrushka',
      'prokofiev-romeo-and-juliet',
    ],
  },
  {
    id: 'symphony-concerto-sonata',
    title: 'Symphony, concerto, or sonata?',
    type: 'Reference',
    category: 'Genres',
    description: 'What the most common classical titles, and catalogue numbers, actually mean.',
    asset: 'categoryChamber',
    audience: 'Curious beginners',
    overview:
      'Classical titles usually tell you who is playing and how the piece is built. Learn a few common labels, and what the letters after a title mean, and browsing works becomes much less mysterious.',
    sections: [
      {
        title: 'Symphony',
        body: [
          'A large work for full orchestra, usually in four movements: a fast opening, a slow movement, a dance-like third movement and a fast finale. Beethoven’s Fifth and Dvořák’s Ninth both follow this plan.',
          'Later composers stretched it. Mahler’s symphonies can last over an hour and bring in voices, offstage brass and an organ.',
        ],
      },
      {
        title: 'Concerto',
        body: [
          'A work for one or more soloists with orchestra, usually in three movements: fast, slow, fast. In the Baroque concerto grosso a small group of soloists alternates with the full ensemble, as in Bach’s Brandenburg Concertos. In the Romantic concerto a single virtuoso takes centre stage, as in Tchaikovsky’s First Piano Concerto.',
        ],
      },
      {
        title: 'Sonata',
        body: [
          'A work for one or two instruments, most often piano, or another instrument with piano. Beethoven wrote 32 piano sonatas; the “Moonlight” is the best known, and unusually starts with its slow movement. Liszt’s Sonata in B minor squeezes the whole idea into one continuous movement.',
        ],
      },
      {
        title: 'Suite, overture and symphonic poem',
        body: [
          'A suite is a sequence of dances, like Bach’s Cello Suites or his Orchestral Suite No. 3. An overture opens an opera or a play, though some, like Beethoven’s Egmont, became concert pieces in their own right.',
          'A symphonic poem is an orchestral piece that tells a story or paints a scene in one movement. Liszt invented the term; Saint-Saëns’s Danse macabre is a famous example.',
        ],
      },
      {
        title: 'What the numbers mean',
        body: [
          '“Op.” stands for opus, Latin for “work”, a number usually given by the composer or publisher. Many composers’ works were catalogued later by scholars, and each catalogue has its own letters.',
          'BWV is Bach’s catalogue, K. is Köchel’s catalogue of Mozart, Hob. is Hoboken’s catalogue of Haydn, D. is Deutsch’s catalogue of Schubert, HWV is Handel’s, RV is Ryom’s catalogue of Vivaldi and S. is Searle’s catalogue of Liszt. They tell you exactly which piece you are hearing, even when a composer wrote dozens with the same title.',
        ],
      },
    ],
    workIds: [
      'beethoven-symphony-5',
      'mahler-symphony-2',
      'bach-brandenburg-concertos',
      'tchaikovsky-piano-concerto-1',
      'beethoven-moonlight-sonata',
      'liszt-piano-sonata',
      'handel-royal-fireworks',
      'saint-saens-danse-macabre',
    ],
  },
  {
    id: 'the-baroque-period',
    title: 'The Baroque period',
    type: 'Period overview',
    category: 'Periods',
    description: 'Opera, the concerto and the fugue, from about 1600 to 1750.',
    asset: 'concertAtSanssouci',
    audience: 'History explorers',
    overview:
      'Between roughly 1600 and 1750, composers invented opera, the concerto and the oratorio, and brought counterpoint to its peak. Baroque music has a driving pulse and a steady bass line underneath everything, which makes it some of the easiest classical music to fall into.',
    sections: [
      {
        title: 'Opera is born',
        body: [
          'Around 1600, musicians in Italy wanted to revive the way they believed ancient Greek drama had been sung. The result was opera. Monteverdi’s L’Orfeo, first performed in Mantua in 1607, is the earliest opera still regularly staged, and it opens with a fanfare that still sounds thrilling.',
        ],
      },
      {
        title: 'The bass line holds it together',
        body: [
          'Almost all Baroque music rests on the basso continuo: a bass line played by a cello or bassoon, with a harpsichord, organ or lute filling in the chords above it. Listen under the melody and you will hear it, keeping the music moving.',
        ],
      },
      {
        title: 'The concerto',
        body: [
          'Baroque composers loved contrast, and the concerto set a soloist or small group against the full ensemble. Vivaldi wrote more than 500 concertos; The Four Seasons is the most famous. Bach’s Brandenburg Concertos give each concerto a different set of soloists.',
        ],
      },
      {
        title: 'Counterpoint and fugue',
        body: [
          'Counterpoint means several independent melodies at once. In a fugue, one theme enters in each voice in turn and is then woven together. Bach was its supreme master, and his Mass in B minor and Goldberg Variations show what the technique can do.',
        ],
      },
      {
        title: 'Music for church and court',
        body: [
          'Most Baroque music was written for a job: for a church, a city or a king. Monteverdi’s Vespers was published in 1610 with a dedication to the Pope. Handel wrote his Music for the Royal Fireworks for King George II, and his oratorio Messiah for a charity concert in Dublin.',
        ],
      },
    ],
    workIds: [
      'monteverdi-orfeo',
      'monteverdi-vespers',
      'vivaldi-four-seasons',
      'bach-brandenburg-concertos',
      'bach-mass-in-b-minor',
      'handel-royal-fireworks',
      'handel-messiah',
    ],
  },
  {
    id: 'the-classical-period',
    title: 'The Classical period',
    type: 'Period overview',
    category: 'Periods',
    description: 'Clarity, balance and the sonata, from about 1750 to 1820.',
    asset: 'composerHaydn',
    audience: 'History explorers',
    overview:
      'After the dense counterpoint of the Baroque, composers between roughly 1750 and 1820 wanted music that was clear, balanced and easy to follow: one memorable melody at a time, over a simple accompaniment. Haydn, Mozart and the young Beethoven all worked in Vienna, and their forms still shape how music is written.',
    sections: [
      {
        title: 'Clarity and balance',
        body: [
          'Classical melodies tend to come in neat, balanced phrases, like a question and an answer. Listen to the opening of Mozart’s Eine kleine Nachtmusik: a bold call, then a graceful reply. The texture is lighter than in Baroque music, so the melody always stands out.',
        ],
      },
      {
        title: 'Sonata form',
        body: [
          'The great invention of the period is sonata form, the plan behind most first movements. An exposition presents two contrasting themes; a development breaks them apart and takes them through different keys; a recapitulation brings them back home.',
          'You don’t need to track it bar by bar. Just listen for the moment, a few minutes in, when the opening tune returns, and you will hear the shape.',
        ],
      },
      {
        title: 'The symphony and the string quartet',
        body: [
          'Haydn wrote over a hundred symphonies and is often called the father of both the symphony and the string quartet. His Surprise Symphony shows his wit; his Emperor Quartet shows how four instruments can hold a conversation.',
        ],
      },
      {
        title: 'Mozart: opera and the concerto',
        body: [
          'Mozart brought the theatre into everything he wrote. His operas Don Giovanni and The Magic Flute mix comedy and depth, and his piano concertos, like No. 21, are full of operatic melody. His Symphony No. 40 shows how much tension the Classical style can hold.',
        ],
      },
      {
        title: 'Beethoven at the edge',
        body: [
          'Beethoven began as a Classical composer and pushed the style until it broke. His Fifth Symphony and Moonlight Sonata use Classical forms, but their intensity points straight to the Romantic era.',
        ],
      },
    ],
    workIds: [
      'mozart-eine-kleine-nachtmusik',
      'haydn-surprise-symphony',
      'haydn-emperor-quartet',
      'mozart-don-giovanni',
      'mozart-piano-concerto-21',
      'mozart-symphony-40',
      'beethoven-symphony-5',
    ],
  },
  {
    id: 'the-romantic-period',
    title: 'The Romantic period',
    type: 'Period overview',
    category: 'Periods',
    description: 'The era of emotion, expression, and grandeur, from about 1820 to 1900.',
    asset: 'composerClaraSchumann',
    audience: 'History explorers',
    overview:
      'Between roughly 1820 and 1900, composers pushed music towards personal expression. Harmony grew richer, orchestras grew bigger, music began to tell stories, and composers and performers became public figures in their own right.',
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
          'Orchestras gained more brass, more percussion and more players overall, and composers used them for colour as much as volume. Listen to the cor anglais solo in the Largo of Dvořák’s New World Symphony: a single instrumental colour carries the whole mood. By the end of the century, Mahler’s Second Symphony called for offstage brass, an organ and a full choir.',
        ],
      },
      {
        title: 'Music that tells a story',
        body: [
          'Romantic composers loved music inspired by poems, plays and paintings. Mendelssohn wrote his A Midsummer Night’s Dream overture at seventeen, and Liszt invented the symphonic poem, an orchestral piece that tells a story.',
          'Wagner went furthest of all. He called his operas music dramas, and wove them from leitmotifs, short themes tied to a character or an idea that return and transform as the story unfolds. Tristan und Isolde stretched harmony so far that it changed how composers wrote for the next century.',
        ],
      },
      {
        title: 'National styles',
        body: [
          'Many composers drew on the folk music of their own countries. Chopin’s mazurkas and polonaises kept the dances of Poland alive in Paris; Liszt wrote Hungarian Rhapsodies; Dvořák filled his music with Czech dance rhythms; Grieg brought Norwegian folk song into the concert hall.',
        ],
      },
      {
        title: 'Virtuosity',
        body: [
          'The nineteenth century was the age of the touring virtuoso. Liszt’s concerts caused “Lisztomania”. Clara Schumann performed across Europe for more than sixty years, championed the music of her husband Robert and of Brahms, and still found time to compose, beginning her Piano Concerto at thirteen.',
        ],
      },
    ],
    workIds: [
      'dvorak-symphony-9',
      'mahler-symphony-2',
      'grieg-piano-concerto',
      'wagner-tristan-und-isolde',
      'chopin-nocturnes',
      'liszt-hungarian-rhapsody-2',
      'prokofiev-peter-and-the-wolf',
      'clara-schumann-piano-concerto',
    ],
  },
  {
    id: 'into-the-twentieth-century',
    title: 'Into the twentieth century',
    type: 'Period overview',
    category: 'Periods',
    description: 'Colour, rhythm and new sounds, from Debussy to Stravinsky.',
    asset: 'composerStravinsky',
    audience: 'History explorers',
    overview:
      'Around 1900, composers began to question the rules that had held music together for two centuries. Some chased colour and atmosphere, some put rhythm in charge, and some carried Romanticism into a new age. The results still sound fresh more than a century later.',
    sections: [
      {
        title: 'Colour before structure',
        body: [
          'Debussy wanted music to suggest rather than state. The Prelude to the Afternoon of a Faun opens with a solo flute drifting through shifting, unresolved harmonies, and many musicians date modern music from its premiere in 1894.',
          'His music is often called Impressionist, after the painters, a label he disliked. Listen to Clair de lune and you will hear why it stuck: the music paints light and water rather than telling a story.',
        ],
      },
      {
        title: 'Rhythm takes over',
        body: [
          'At the premiere of Stravinsky’s The Rite of Spring in Paris in 1913, the audience was in uproar. Its pounding, irregular rhythms and clashing harmonies made rhythm, not melody, the driving force. Sixteen years later Stravinsky recorded it himself, and you can hear that recording here.',
        ],
      },
      {
        title: 'The orchestra as an instrument',
        body: [
          'Ravel was one of the great masters of orchestral colour. Boléro repeats a single melody over an unchanging snare-drum rhythm for fifteen minutes, and the only thing that changes is the instruments playing it. It is a lesson in orchestration you can hear in one sitting.',
        ],
      },
      {
        title: 'Late Romantics in a new century',
        body: [
          'Not everyone broke with the past. Mahler’s Fifth Symphony stretches Romantic music to its limits, and Rachmaninoff went on writing lush, melodic music into the 1930s, as his Rhapsody on a Theme of Paganini shows.',
        ],
      },
    ],
    workIds: [
      'saint-saens-danse-macabre',
      'debussy-clair-de-lune',
      'stravinsky-rite-of-spring',
      'stravinsky-firebird',
      'ravel-bolero',
      'mahler-symphony-5',
      'rachmaninoff-rhapsody-on-a-theme-of-paganini',
    ],
  },
  {
    id: 'piano-music-where-to-start',
    title: 'Piano music: where to start',
    type: 'Guide',
    category: 'Guides',
    description: 'Eight pieces that show everything the piano can do.',
    asset: 'categoryPiano',
    audience: 'New listeners',
    overview:
      'The piano can sing a melody, play a whole orchestra’s worth of harmony and dazzle with speed, all at once. Here is a path through the piano music in the catalogue, from quiet miniatures to the great virtuoso showpieces.',
    sections: [
      {
        title: 'Start quiet',
        body: [
          'Begin with a nocturne, a “night piece”. Chopin’s Nocturne in E-flat major spins a singing melody over a gently rocking accompaniment. Debussy’s Clair de lune and Liszt’s Liebestraum No. 3 have the same intimacy.',
        ],
      },
      {
        title: 'A sonata',
        body: [
          'Beethoven’s Moonlight Sonata shows how a single work can travel from stillness to storm in fifteen minutes. Its hushed first movement is famous, but the stormy finale is where Beethoven really shows his hand.',
        ],
      },
      {
        title: 'The virtuoso',
        body: [
          'Liszt was the first piano superstar, and his Hungarian Rhapsody No. 2 still sounds like a dare. Chopin’s Ballade No. 1 tells a story without words and ends in one of the hardest codas in the repertoire.',
        ],
      },
      {
        title: 'Bach on the keyboard',
        body: [
          'Bach wrote the Goldberg Variations for harpsichord, but today they are usually played on piano. Thirty variations grow from one quiet aria, and the aria returns at the end, sounding completely different after everything you have heard.',
        ],
      },
      {
        title: 'Hear the composer play',
        body: [
          'Rachmaninoff was one of the greatest pianists who ever lived, and you can hear him play his own Prelude in C-sharp minor. It opens with three ominous notes in the bass, and audiences demanded it at almost every concert he gave.',
        ],
      },
    ],
    workIds: [
      'chopin-nocturnes',
      'debussy-clair-de-lune',
      'liszt-liebestraum-3',
      'beethoven-moonlight-sonata',
      'liszt-hungarian-rhapsody-2',
      'chopin-ballade-1',
      'bach-goldberg-variations',
      'rachmaninoff-prelude-c-sharp-minor',
    ],
  },
  {
    id: 'what-makes-bach-sound-like-bach',
    title: 'What makes Bach sound like Bach?',
    type: 'Composer profile',
    category: 'Composers',
    description: 'Counterpoint, dance, and the architecture behind the music.',
    asset: 'composerBach',
    audience: 'Composer-focused listeners',
    overview:
      'Bach’s music often feels inevitable. Independent lines move with clarity and purpose, dance rhythms keep it moving, and every piece seems built to a plan. Here is what to listen for.',
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
          'From 1723 Bach worked as Thomaskantor in Leipzig, responsible for music in the city’s main churches. He wrote hundreds of cantatas for Sunday services, and two monumental works: the St Matthew Passion and the Mass in B minor.',
        ],
      },
      {
        title: 'Architecture',
        body: [
          'Bach loved large designs. The Goldberg Variations build thirty variations over a single bass line and return to the opening aria at the end; the Brandenburg Concertos give each concerto a different set of soloists, as if exploring every possible combination.',
        ],
      },
      {
        title: 'Bach after Bach',
        body: [
          'After his death Bach was remembered mostly by musicians who studied his scores. In 1829 the twenty-year-old Felix Mendelssohn conducted the St Matthew Passion in Berlin, and the performance sparked a revival that made Bach the household name he is today.',
        ],
      },
    ],
    workIds: [
      'bach-goldberg-variations',
      'bach-cello-suite-1',
      'bach-brandenburg-concertos',
      'bach-st-matthew-passion',
      'bach-mass-in-b-minor',
    ],
  },
  {
    id: 'schubert-last-piano-works',
    title: 'Schubert’s last three sonatas',
    type: 'Composer profile',
    category: 'Composers',
    description: 'Three sonatas finished in September 1828, two months before Schubert died.',
    asset: 'composerSchubert',
    audience: 'Piano lovers',
    overview:
      'In September 1828, already seriously ill, Schubert finished three large piano sonatas, D. 958, D. 959 and D. 960. Two months later he was dead, aged 31. The sonatas were not published until ten years later and were long thought too long and too loose in form. Today they are counted among the greatest piano music ever written.',
    sections: [
      {
        title: 'Written in Beethoven’s shadow',
        body: [
          'Beethoven had died in Vienna the year before, and Schubert, who revered him, had been a torchbearer at his funeral. The three sonatas answer Beethoven’s example in Schubert’s own voice: long, singing melodies, sudden shifts of harmony that change the light, and a sense of space rather than argument.',
        ],
      },
      {
        title: 'C minor, D. 958',
        body: [
          'The first sonata is the most dramatic. It opens with a fierce theme that recalls Beethoven, and ends with a restless tarantella, a fast dance that races on for page after page, as if unable to stop.',
        ],
      },
      {
        title: 'A major, D. 959',
        body: [
          'The second sonata is warm and expansive, but its slow movement is one of the strangest things Schubert wrote: a bleak, rocking song that suddenly breaks into a violent, almost improvised storm, before returning, shaken, to its opening melody.',
        ],
      },
      {
        title: 'B-flat major, D. 960',
        body: [
          'The last sonata opens with a calm, hymn-like melody, interrupted by a distant trill deep in the bass, like thunder on the horizon. Its slow movement, in a remote key, is music of rare stillness. If you listen to only one, start here.',
        ],
      },
      {
        title: 'Hearing Schnabel',
        body: [
          'In the early twentieth century, the Austrian pianist Artur Schnabel was one of the first to champion these sonatas in concert. His 1939 recording of the B-flat Sonata helped bring them back to the centre of the repertoire, and you can hear it here.',
          'If you want to go further, the late Impromptus and Moments musicaux, written in the same final years, share the sonatas’ intimacy on a smaller scale.',
        ],
      },
    ],
    workIds: [
      'schubert-piano-sonata-19',
      'schubert-piano-sonata-20',
      'schubert-piano-sonata-21',
      'schubert-impromptus-d935',
      'schubert-moments-musicaux',
    ],
  },
  {
    id: 'golden-age-of-opera-singing',
    title: 'The golden age of opera singing',
    type: 'Listening notes',
    category: 'Listening',
    description: 'Caruso, Melba, Gigli and the first recording stars.',
    asset: 'burgtheaterAuditorium',
    audience: 'Opera lovers and the curious',
    overview:
      'The first decades of recorded sound captured some of the most famous voices in history. Many of the opera recordings in the catalogue come from this era, and they are worth hearing on their own terms.',
    sections: [
      {
        title: 'Enrico Caruso',
        body: [
          'The Italian tenor Enrico Caruso was the first great recording star. He began recording in Milan in 1902, and his records sold in vast numbers around the world. Listen to his “Recondita armonia” from Tosca, the painter Cavaradossi’s first aria.',
        ],
      },
      {
        title: 'Nellie Melba and the sopranos',
        body: [
          'The Australian soprano Nellie Melba was so famous that a dessert, peach Melba, was named after her. In 1907 she and Caruso recorded “O soave fanciulla”, the love duet that closes Act I of La bohème, and it opens the La bohème page here. In Tosca you can also hear the Czech soprano Emmy Destinn sing “Vissi d’arte”.',
        ],
      },
      {
        title: 'Beniamino Gigli',
        body: [
          'In the next generation, Beniamino Gigli was often called Caruso’s successor. In 1938 he recorded a complete La bohème at La Scala with the soprano Licia Albanese, and that recording fills the rest of the La bohème page.',
        ],
      },
      {
        title: 'How the first records were made',
        body: [
          'Before the mid-1920s there were no microphones. Singers sang into a large horn that funnelled the sound onto a cutting needle, and the orchestra was cut down and crowded around it. Each side of a disc held only about four minutes, which is why many old recordings are split into short parts.',
        ],
      },
      {
        title: 'How to listen to old recordings',
        body: [
          'Expect surface noise and a narrow range of sound. Let your ear adjust for a minute, then listen past it to the voice: the phrasing, the way a singer shapes a long line, the moments of drama. Those are exactly what made these singers famous, and they come through clearly.',
        ],
      },
    ],
    workIds: [
      'puccini-la-boheme',
      'puccini-tosca',
      'verdi-la-traviata',
      'verdi-aida',
      'puccini-madama-butterfly',
    ],
  },
  {
    id: 'hear-the-composers-themselves',
    title: 'Hear the composers themselves',
    type: 'Listening notes',
    category: 'Listening',
    description: 'Brahms, Elgar, Rachmaninoff, Stravinsky and Ravel performing their own music.',
    asset: 'composerBrahms',
    audience: 'Curious listeners',
    overview:
      'For most of history we can only imagine how composers wanted their music to sound. From the late nineteenth century, a few of them were recorded playing or conducting it. These recordings are rare documents, and several are in the catalogue.',
    sections: [
      {
        title: 'Brahms on a wax cylinder',
        body: [
          'In 1889 an agent of Thomas Edison recorded Johannes Brahms playing part of his Hungarian Dance No. 1 at the piano. The cylinder is badly worn and the sound is faint, but it is the earliest recording of a major composer performing his own music. It is the first track on the Hungarian Dances page.',
        ],
      },
      {
        title: 'Elgar conducts his Cello Concerto',
        body: [
          'Elgar was one of the first composers to take the gramophone seriously. In December 1919, only weeks after the troubled premiere of his Cello Concerto, he conducted it for the recording horn with Beatrice Harrison as soloist. The concerto had to be cut to fit on four sides, but this is the music as its composer first shaped it.',
        ],
      },
      {
        title: 'Rachmaninoff at the piano',
        body: [
          'Rachmaninoff was as famous a pianist as he was a composer. Hear him play his Prelude in C-sharp minor, which audiences demanded at almost every concert he gave, and his Prelude in G minor. With the Philadelphia Orchestra he recorded his Rhapsody on a Theme of Paganini in 1934, weeks after the premiere, and his Third Piano Concerto in 1939 and 1940, three decades after he first played it.',
        ],
      },
      {
        title: 'Rachmaninoff plays the music he loved',
        body: [
          'Rachmaninoff also recorded other composers, and these are among the most admired piano records ever made. His 1930 recording of Chopin’s Second Sonata, with its Funeral March, is famous for its drama. Listen too to his Chopin “Minute” Waltz, Mozart’s Rondo alla turca and Liszt’s Second Hungarian Rhapsody, where he added a dazzling cadenza of his own.',
        ],
      },
      {
        title: 'Stravinsky conducts the Rite',
        body: [
          'In 1929 Stravinsky conducted his own recording of The Rite of Spring, sixteen years after its riotous premiere. Hearing the composer’s own tempos is a rare chance to know how he imagined the piece.',
        ],
      },
      {
        title: 'Ravel and Boléro',
        body: [
          'The 1930 recording of Boléro in the catalogue is credited to Ravel himself, conducting the Lamoureux Orchestra. He wanted a steady, unhurried tempo and objected when conductors played it faster.',
        ],
      },
      {
        title: 'Why it matters',
        body: [
          'A score can’t capture everything: how fast is fast, how much a phrase should breathe. Composer recordings don’t settle every question, but they let you hear one answer from the person who wrote the music.',
        ],
      },
    ],
    workIds: [
      'brahms-hungarian-dances',
      'elgar-cello-concerto',
      'rachmaninoff-piano-concerto-3',
      'rachmaninoff-prelude-c-sharp-minor',
      'rachmaninoff-rhapsody-on-a-theme-of-paganini',
      'chopin-piano-sonata-2',
      'liszt-hungarian-rhapsody-2',
      'stravinsky-rite-of-spring',
      'ravel-bolero',
    ],
  },
  {
    id: 'how-to-listen-actively',
    title: 'How to listen actively',
    type: 'Guide',
    category: 'Guides',
    description: 'Simple ways to notice melody, texture, form, and colour as you listen.',
    asset: 'categorySymphony',
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
        title: 'Listen for the instruments',
        body: [
          'Try to name who is playing. In Prokofiev’s Peter and the Wolf every character has its own instrument; Mahler’s Fifth Symphony opens with a lone trumpet. Once you start noticing instruments, the orchestra stops being a wall of sound.',
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
    workIds: [
      'beethoven-symphony-5',
      'prokofiev-peter-and-the-wolf',
      'mahler-symphony-5',
      'stravinsky-rite-of-spring',
      'mozart-eine-kleine-nachtmusik',
      'bach-cello-suite-1',
    ],
  },
]

export function findArticle(id: string | undefined) {
  if (!id) {
    return undefined
  }

  return articles.find((article) => article.id === id)
}

/** Reading time at about 200 words a minute, e.g. "3 min read". */
export function getReadTime(article: Article) {
  const text = [article.overview, ...article.sections.flatMap((section) => [section.title, ...section.body])].join(' ')
  const words = text.split(/\s+/).filter(Boolean).length

  return `${Math.max(1, Math.ceil(words / 200))} min read`
}

/** Up to four other articles, those in the same category first. */
export function getRecommendedArticles(article: Article) {
  const sameCategory = articles.filter(
    (candidate) => candidate.category === article.category && candidate.id !== article.id,
  )
  const otherArticles = articles.filter(
    (candidate) => candidate.category !== article.category && candidate.id !== article.id,
  )

  return [...sameCategory, ...otherArticles].slice(0, 4)
}
