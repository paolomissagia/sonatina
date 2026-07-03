import type { CatalogAssetKey } from '@/data/catalog-assets'

export type WorkMovement = {
  number: string
  title: string
  character: string
}

export type Work = {
  id: string
  title: string
  composerId: string
  description: string
  asset: CatalogAssetKey
  year: string
  period: string
  duration: string
  form: string
  overview: string
  movements: WorkMovement[]
}
