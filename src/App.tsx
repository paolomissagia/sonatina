import { useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
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
  const { itemId } = useParams()
  const item = findCollectionItem(view, itemId)

  if (!item) {
    return <Navigate to={`/${view}`} replace />
  }

  return <DetailPage item={item} view={view} />
}

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const hasSearchQuery = searchQuery.trim().length > 0

  return (
    <div className="app-shell">
      <AppSidebar onNavigate={() => setSearchQuery('')} />

      <div className="workspace">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="content">
          {hasSearchQuery ? (
            <SearchResultsPage query={searchQuery} onNavigate={() => setSearchQuery('')} />
          ) : (
            <Routes>
              <Route path="/" element={<DiscoverPage />} />
              <Route path="/works" element={<CollectionPage view="works" />} />
              <Route path="/works/:itemId" element={<RoutedDetailPage view="works" />} />
              <Route path="/composers" element={<CollectionPage view="composers" />} />
              <Route path="/composers/:itemId" element={<RoutedDetailPage view="composers" />} />
              <Route path="/guides" element={<CollectionPage view="guides" />} />
              <Route path="/guides/:itemId" element={<RoutedDetailPage view="guides" />} />
              <Route path="/about" element={<CollectionPage view="about" />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
