import { useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { AboutPage } from '@/components/about-page'
import { AppSidebar } from '@/components/app-sidebar'
import { CollectionPage } from '@/components/collection-page'
import { DetailPage } from '@/components/detail-page'
import { ExploreSection } from '@/components/explore-section'
import { HeroPanel } from '@/components/hero-panel'
import { SearchResultsPage } from '@/components/search-results-page'
import { TopBar } from '@/components/top-bar'
import { findCollectionItem } from '@/data/collections'
import type { CollectionCategory } from '@/data/collections'
import './App.css'

function DiscoverPage() {
  return (
    <>
      <HeroPanel />
      <ExploreSection />
    </>
  )
}

function RoutedDetailPage({ view }: { view: CollectionCategory }) {
  const { id } = useParams()
  const item = findCollectionItem(view, id)

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
              <Route path="/" element={<DiscoverPage />} />
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
