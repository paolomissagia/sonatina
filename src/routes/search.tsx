import type { MetaFunction } from 'react-router'
import { searchMeta } from '@/data/page-meta'
import { SearchPage } from '@/pages/search-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = ({ location }) =>
  metaTags(searchMeta(new URLSearchParams(location.search).get('q')?.trim()))

export default function SearchRoute() {
  return <SearchPage />
}
