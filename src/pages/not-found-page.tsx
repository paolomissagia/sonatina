import { Link } from 'react-router'
import { t } from '@/i18n'

export function NotFoundPage() {
  return (
    <section className="search-route-page">
      <title>{`${t('not_found_title')} · Sonatina`}</title>
      <div className="search-route-header">
        <h1>{t('not_found_title')}</h1>
      </div>
      <div className="search-empty-state">
        <p>{t('not_found_text')}</p>
        <div className="home-hero-actions">
          <Link className="primary-action" to="/">
            {t('not_found_back')}
          </Link>
        </div>
      </div>
    </section>
  )
}
