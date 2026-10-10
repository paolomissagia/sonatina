import type { MetaFunction } from 'react-router'
import { homeMeta } from '@/data/page-meta'
import { HomePage } from '@/pages/home-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = () => metaTags(homeMeta())

export default function HomeRoute() {
  return <HomePage />
}
