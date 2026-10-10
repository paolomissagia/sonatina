import type { CatalogSection } from '@/models/catalog'
import type { EditorPick } from '@/models/home'
import { findCatalogItem } from './catalog'
import { findComposer } from './composers'
import { findWork } from './works'

type EditorPickSource = {
  section: CatalogSection
  id: string
  /** For a work picked for its recording: what makes the recording special. */
  recording?: string
}

const pickLabels: Record<CatalogSection, string> = {
  works: 'Work',
  composers: 'Composer',
  articles: 'Article',
}

/** Historic recordings worth hearing first, plus the article that tells their story. */
const editorPickSources: EditorPickSource[] = [
  { section: 'works', id: 'rachmaninoff-piano-concerto-3', recording: 'Rachmaninoff at the piano, 1939–40' },
  { section: 'works', id: 'elgar-cello-concerto', recording: 'Conducted by Elgar, 1919–20' },
  { section: 'works', id: 'prokofiev-peter-and-the-wolf', recording: 'Narrated by Eleanor Roosevelt, 1948' },
  { section: 'articles', id: 'hear-the-composers-themselves' },
]

export const editorPicks: EditorPick[] = editorPickSources.flatMap(({ section, id, recording }) => {
  const item = findCatalogItem(section, id)

  if (!item) {
    return []
  }

  return [
    {
      section,
      type: recording ? 'Historic recording' : pickLabels[section],
      title: item.title,
      subtitle: item.subtitle,
      meta: recording ?? item.meta ?? '',
      recording: Boolean(recording),
      // A recording is about its performer, so show the composer rather than the genre painting.
      asset: (recording && findComposer(findWork(id)?.composerId)?.asset) || item.asset,
      to: `/${section}/${item.id}`,
    },
  ]
})
