import { useParams, type MetaFunction } from 'react-router'
import { findWork } from '@/data/works'
import { workMeta, notFoundMeta } from '@/data/page-meta'
import { WorkDetailPage } from '@/pages/work-detail-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = ({ params }) => {
  const work = findWork(params.id)
  return metaTags(work ? workMeta(work) : notFoundMeta())
}

export default function WorkRoute() {
  const work = findWork(useParams().id)
  return work ? <WorkDetailPage work={work} key={work.id} /> : <NotFoundPage />
}
