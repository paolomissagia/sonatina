import type { CatalogAssetKey } from '@/assets/catalog-assets'

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
  premiere: string
  instrumentation: string
  overview: string
  movements: WorkMovement[]
}
