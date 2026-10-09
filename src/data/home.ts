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
  { section: 'works', id: 'vivaldi-four-seasons' },
  { section: 'composers', id: 'mozart' },
  { section: 'guides', id: 'where-to-start' },
  { section: 'works', id: 'tchaikovsky-swan-lake' },
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
