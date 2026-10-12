import { assetCredits, catalogAssets } from '@/assets/catalog-assets'
import { getComposerName } from '@/data/composers'
import { getReadTime, getRecommendedArticles } from '@/data/articles'
import { findWork, getWorkAsset } from '@/data/works'
import type { Article } from '@/models/article'
import type { Work } from '@/models/work'
import { articleCategoryLabels, t } from '@/i18n'
import { DetailHero } from '@/components/detail-hero'
import { RecommendationCard } from '@/components/recommendation-card'
import { RecommendationSection } from '@/components/recommendation-section'

type ArticleDetailPageProps = {
  article: Article
}

export function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const readTime = getReadTime(article)
  const recommendedArticles = getRecommendedArticles(article)
  const articleWorks = article.workIds.map(findWork).filter((work): work is Work => work !== undefined)
  const category = articleCategoryLabels[article.category]
  const articleDetails = [
    { label: t('article_type'), value: article.type },
    { label: t('article_category'), value: category },
    { label: t('article_audience'), value: article.audience },
    { label: t('article_read_time'), value: readTime },
  ]

  return (
    <article className="article-detail-page">
      <title>{`${article.title} · Sonatina`}</title>
      <DetailHero
        breadcrumb={[
          { label: t('nav_articles'), to: '/articles' },
          { label: article.title },
        ]}
        description={article.description}
        facts={articleDetails}
        factsTitle={t('article_details')}
        imageCredit={assetCredits[article.asset]}
        imageSrc={catalogAssets[article.asset]}
        meta={
          <>
            <span>{category}</span>
            <span>{readTime}</span>
          </>
        }
        subtitle={article.type}
        title={article.title}
      />

      <div className="article-body">
        <p className="article-lead">{article.overview}</p>

        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>

      {articleWorks.length > 0 ? (
        <RecommendationSection title={t('article_works')}>
          {articleWorks.map((work) => (
            <RecommendationCard
              imageSrc={catalogAssets[getWorkAsset(work)]}
              key={work.id}
              meta={work.composed}
              subtitle={getComposerName(work.composerId)}
              title={work.title}
              to={`/works/${work.id}`}
            />
          ))}
        </RecommendationSection>
      ) : null}

      {recommendedArticles.length > 0 ? (
        <RecommendationSection title={t('article_recommended')}>
          {recommendedArticles.map((recommendedArticle) => (
            <RecommendationCard
              imageSrc={catalogAssets[recommendedArticle.asset]}
              key={recommendedArticle.id}
              meta={getReadTime(recommendedArticle)}
              subtitle={articleCategoryLabels[recommendedArticle.category]}
              title={recommendedArticle.title}
              to={`/articles/${recommendedArticle.id}`}
            />
          ))}
        </RecommendationSection>
      ) : null}
    </article>
  )
}
