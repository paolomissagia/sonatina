import { useParams, type MetaFunction } from 'react-router'
import { findArticle } from '@/data/articles'
import { articleMeta, notFoundMeta } from '@/data/page-meta'
import { ArticleDetailPage } from '@/pages/article-detail-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = ({ params }) => {
  const article = findArticle(params.id)
  return metaTags(article ? articleMeta(article) : notFoundMeta())
}

export default function ArticleRoute() {
  const article = findArticle(useParams().id)
  return article ? <ArticleDetailPage article={article} key={article.id} /> : <NotFoundPage />
}
