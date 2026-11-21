import type { CatalogAssetKey } from '@/assets/catalog-assets'
import type { CatalogSection } from './catalog'

export type HomeExploreCategory = {
  readonly title: string
  readonly description: string
  asset: CatalogAssetKey
  to: string
}

export type EditorPick = {
  section: CatalogSection
  readonly type: string
  title: string
  readonly subtitle: string
  readonly meta: string
  /** Picked for its recording: the meta line describes the recording. */
  recording: boolean
  asset: CatalogAssetKey
  to: string
}
