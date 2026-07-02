import type { ViewId } from './navigation'
import type { CatalogAssetKey } from './catalog-assets'

export type CollectionItem = {
  title: string
  subtitle: string
  detail: string
  asset: CatalogAssetKey
  meta?: string
  period?: string
}

export type CollectionPageData = {
  title: string
  description: string
  items: CollectionItem[]
}

export const collectionPages: Record<Exclude<ViewId, 'discover'>, CollectionPageData> = {
  works: {
    title: 'Works',
    description: 'Essential pieces and repertoire landmarks from across classical music.',
    items: [
      {
        title: 'Symphony No. 5',
        subtitle: 'Ludwig van Beethoven',
        detail: 'A defining symphonic statement in four movements.',
        asset: 'symphony',
        meta: '1808',
        period: 'Classical / Romantic',
      },
      {
        title: 'The Four Seasons',
        subtitle: 'Antonio Vivaldi',
        detail: 'Four violin concertos with vivid seasonal character.',
        asset: 'violinConcerto',
        meta: '1725',
        period: 'Baroque',
      },
      {
        title: 'Requiem',
        subtitle: 'Wolfgang Amadeus Mozart',
        detail: 'A dramatic sacred work left unfinished at Mozart’s death.',
        asset: 'chamberSonata',
        meta: '1791',
        period: 'Classical',
      },
      {
        title: 'Cello Suite No. 1',
        subtitle: 'Johann Sebastian Bach',
        detail: 'A foundational work for solo cello.',
        asset: 'chamberSonata',
        meta: 'c. 1720',
        period: 'Baroque',
      },
      {
        title: 'Clair de lune',
        subtitle: 'Claude Debussy',
        detail: 'A luminous piano miniature from Suite bergamasque.',
        asset: 'pianoConcerto',
        meta: '1905',
        period: 'Impressionist',
      },
      {
        title: 'Symphony No. 9',
        subtitle: 'Antonin Dvorak',
        detail: 'The New World symphony, expansive and lyrical.',
        asset: 'symphony',
        meta: '1893',
        period: 'Romantic',
      },
    ],
  },
  composers: {
    title: 'Composers',
    description: 'Browse major composers by style, period, and influence.',
    items: [
      {
        title: 'Johann Sebastian Bach',
        subtitle: 'Baroque',
        detail: 'Counterpoint, sacred music, keyboard works, and solo suites.',
        asset: 'composerBaroque',
        meta: '1685-1750',
      },
      {
        title: 'Wolfgang Amadeus Mozart',
        subtitle: 'Classical',
        detail: 'Operas, concertos, chamber works, and symphonies.',
        asset: 'composerAvatar',
        meta: '1756-1791',
      },
      {
        title: 'Ludwig van Beethoven',
        subtitle: 'Classical / Romantic',
        detail: 'Symphonic drama, piano sonatas, quartets, and concertos.',
        asset: 'composerBeethoven',
        meta: '1770-1827',
      },
      {
        title: 'Clara Schumann',
        subtitle: 'Romantic',
        detail: 'Piano works, songs, and a central concert career.',
        asset: 'composerRomantic',
        meta: '1819-1896',
      },
      {
        title: 'Claude Debussy',
        subtitle: 'Modern',
        detail: 'Color, atmosphere, and harmonic ambiguity.',
        asset: 'composerDebussy',
        meta: '1862-1918',
      },
      {
        title: 'Igor Stravinsky',
        subtitle: 'Modern',
        detail: 'Rhythmic force, ballet, neoclassicism, and reinvention.',
        asset: 'composerStravinsky',
        meta: '1882-1971',
      },
    ],
  },
  guides: {
    title: 'Guides',
    description: 'Short paths into repertoire, listening habits, and classical music history.',
    items: [
      {
        title: 'Where to start with symphonies',
        subtitle: 'Listening guide',
        detail: 'A practical route from Haydn to Mahler without getting lost.',
        asset: 'symphony',
        meta: '8 min read',
      },
      {
        title: 'Understanding opus numbers',
        subtitle: 'Reference',
        detail: 'How catalog numbers work, and why they are not always chronological.',
        asset: 'chamberSonata',
        meta: '5 min read',
      },
      {
        title: 'A beginner’s guide to chamber music',
        subtitle: 'Listening guide',
        detail: 'Quartets, trios, sonatas, and the art of smaller forces.',
        asset: 'chamberSonata',
        meta: '7 min read',
      },
    ],
  },
  about: {
    title: 'About Sonatina',
    description: 'A focused workspace for discovering classical works, people, and context.',
    items: [
      {
        title: 'Built for listening with context',
        subtitle: 'Product note',
        detail: 'Sonatina connects repertoire, composers, guides, and listening context in one calm interface.',
        asset: 'heroArtwork',
      },
      {
        title: 'Early design direction',
        subtitle: 'Project status',
        detail: 'The current version is a static prototype while navigation, data, and search take shape.',
        asset: 'chamberSonata',
      },
    ],
  },
}
