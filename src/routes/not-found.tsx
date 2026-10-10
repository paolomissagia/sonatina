import type { MetaFunction } from 'react-router'
import { notFoundMeta } from '@/data/page-meta'
import { NotFoundPage } from '@/pages/not-found-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = () => metaTags(notFoundMeta())

export default function NotFoundRoute() {
  return <NotFoundPage />
}
