import { useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { AboutPage } from '@/components/about-page'
import { AppSidebar } from '@/components/app-sidebar'
import { CollectionPage } from '@/components/collection-page'
import { DetailPage } from '@/components/detail-page'
import { HomePage } from '@/components/home-page'
import { SearchResultsPage } from '@/components/search-results-page'
import { TopBar } from '@/components/top-bar'
import { findCatalogItem } from '@/data/catalog'
import type { CatalogSection } from '@/data/models'
import './App.css'

function RoutedDetailPage({ view }: { view: CatalogSection }) {
  const { id } = useParams()
  const item = findCatalogItem(view, id)

  if (!item) {
    return <Navigate to={`/${view}`} replace />
  }

  return <DetailPage item={item} view={view} />
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const hasSearchQuery = searchQuery.trim().length > 0
  const handleNavigate = () => {
    setSearchQuery('')
    setIsSidebarOpen(false)
  }

  return (
    <div className="app-shell">
      <AppSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavigate={handleNavigate}
      />
      {isSidebarOpen ? (
        <button
          className="sidebar-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <div className="workspace">
        <TopBar
          isMenuOpen={isSidebarOpen}
          searchQuery={searchQuery}
          onMenuClick={() => setIsSidebarOpen(true)}
          onSearchChange={setSearchQuery}
        />

        <main className="content">
          {hasSearchQuery ? (
            <SearchResultsPage query={searchQuery} onNavigate={handleNavigate} />
          ) : (
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/works" element={<CollectionPage view="works" />} />
              <Route path="/works/:id" element={<RoutedDetailPage view="works" />} />
              <Route path="/composers" element={<CollectionPage view="composers" />} />
              <Route path="/composers/:id" element={<RoutedDetailPage view="composers" />} />
              <Route path="/guides" element={<CollectionPage view="guides" />} />
              <Route path="/guides/:id" element={<RoutedDetailPage view="guides" />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
