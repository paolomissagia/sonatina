import type { CatalogSection } from '@/models/catalog'
import type { EditorPick } from '@/models/home'
import { findCatalogItem } from './catalog'

type EditorPickSource = {
  section: CatalogSection
  id: string
}

const pickLabels: Record<CatalogSection, string> = {
  works: 'Work',
  composers: 'Composer',
  guides: 'Guide',
}

const editorPickSources: EditorPickSource[] = [
  { section: 'works', id: '1' },
  { section: 'composers', id: '2' },
  { section: 'guides', id: '1' },
  { section: 'works', id: '5' },
]

export const editorPicks: EditorPick[] = editorPickSources.flatMap(({ section, id }) => {
  const item = findCatalogItem(section, id)

  if (!item) {
    return []
  }

  return [
    {
      section,
      type: pickLabels[section],
      title: item.title,
      subtitle: item.subtitle,
      meta: item.meta ?? '',
      asset: item.asset,
      to: `/${section}/${item.id}`,
    },
  ]
})
