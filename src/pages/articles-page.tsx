import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { catalogAssets } from '@/assets/catalog-assets'
import { getReadTime, articles } from '@/data/articles'
import { articleCategories, type ArticleCategory } from '@/models/article'
import { articleCategoryLabels, t } from '@/i18n'

export function ArticlesPage() {
  const [activeFilter, setActiveFilter] = useState<ArticleCategory>()

  const visibleArticles = useMemo(() => {
    if (!activeFilter) {
      return articles
    }

    return articles.filter((article) => article.category === activeFilter)
  }, [activeFilter])

  return (
    <section className="articles-page">
      <title>{`${t('nav_articles')} · Sonatina`}</title>
      <header className="articles-header">
        <h1>{t('nav_articles')}</h1>
        <p>{t('articles_page_intro')}</p>
      </header>

      <div className="article-filter-list" aria-label={t('articles_filter_label')}>
        <button className={activeFilter ? undefined : 'active'} onClick={() => setActiveFilter(undefined)} type="button">
          {t('filter_all')}
        </button>
        {articleCategories.map((category) => (
          <button
            className={category === activeFilter ? 'active' : undefined}
            key={category}
            onClick={() => setActiveFilter(category)}
            type="button"
          >
            {articleCategoryLabels[category]}
          </button>
        ))}
      </div>

      <div className="article-list">
        {visibleArticles.map((article) => (
          <Link className="article-row" to={`/articles/${article.id}`} key={article.id}>
            <div className="article-row-image">
              <img src={catalogAssets[article.asset]} alt="" loading="lazy" decoding="async" />
            </div>
            <div className="article-row-copy">
              <span>{articleCategoryLabels[article.category]}</span>
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <small>{getReadTime(article)}</small>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
