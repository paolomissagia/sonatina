import { useParams, type MetaFunction } from 'react-router'
import { findComposer } from '@/data/composers'
import { composerMeta, notFoundMeta } from '@/data/page-meta'
import { ComposerDetailPage } from '@/pages/composer-detail-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = ({ params }) => {
  const composer = findComposer(params.id)
  return metaTags(composer ? composerMeta(composer) : notFoundMeta())
}

export default function ComposerRoute() {
  const composer = findComposer(useParams().id)
  return composer ? <ComposerDetailPage composer={composer} key={composer.id} /> : <NotFoundPage />
}
