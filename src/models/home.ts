import type { CatalogAssetKey } from '@/assets/catalog-assets'
import type { CatalogSection } from './catalog'

export type HomeExploreCategory = {
  title: string
  description: string
  asset: CatalogAssetKey
  to: string
}

export type EditorPick = {
  section: CatalogSection
  type: string
  title: string
  subtitle: string
  meta: string
  /** Picked for its recording: the meta line describes the recording. */
  recording: boolean
  asset: CatalogAssetKey
  to: string
}
