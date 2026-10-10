import type { MetaFunction } from 'react-router'
import { listingMeta } from '@/data/page-meta'
import { CollectionPage } from '@/pages/collection-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = () => metaTags(listingMeta('articles'))

export default function ArticlesRoute() {
  return <CollectionPage view="articles" />
}
