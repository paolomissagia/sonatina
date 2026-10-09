import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <section className="search-route-page">
      <title>Page not found · Sonatina</title>
      <div className="search-route-header">
        <h1>Page not found</h1>
      </div>
      <div className="search-empty-state">
        <p>We couldn&apos;t find what you were looking for. It may have moved, or the link may be incorrect.</p>
        <div className="home-hero-actions">
          <Link className="primary-action" to="/">
            Back to Discover
          </Link>
        </div>
      </div>
    </section>
  )
}
