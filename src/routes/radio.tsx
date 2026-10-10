import type { MetaFunction } from 'react-router'
import { radioMeta } from '@/data/page-meta'
import { RadioPage } from '@/pages/radio-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = () => metaTags(radioMeta())

export default function RadioRoute() {
  return <RadioPage />
}
