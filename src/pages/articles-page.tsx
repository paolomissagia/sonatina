import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import { catalogAssets } from '@/assets/catalog-assets'
import { getReadTime, articles } from '@/data/articles'
import { articleCategories } from '@/models/article'
import { PageMeta } from '@/components/page-meta'
import { listingMeta } from '@/data/page-meta'

const articleFilters = ['All', ...articleCategories]

export function ArticlesPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleArticles = useMemo(() => {
    if (activeFilter === 'All') {
      return articles
    }

    return articles.filter((article) => article.category === activeFilter)
  }, [activeFilter])

  return (
    <section className="articles-page">
      <PageMeta {...listingMeta('articles')} />
      <header className="articles-header">
        <h1>Articles</h1>
        <p>In-depth articles to help you explore, understand, and enjoy classical music.</p>
      </header>

      <div className="article-filter-list" aria-label="Article categories">
        {articleFilters.map((filter) => (
          <button
            className={filter === activeFilter ? 'active' : undefined}
            key={filter}
            onClick={() => setActiveFilter(filter)}
            type="button"
          >
            {filter}
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
              <span>{article.category}</span>
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
