import { useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { AboutPage } from '@/components/about-page'
import { AppSidebar } from '@/components/app-sidebar'
import { CollectionPage } from '@/components/collection-page'
import { ComposerDetailPage } from '@/components/composer-detail-page'
import { DetailPage } from '@/components/detail-page'
import { HomePage } from '@/components/home-page'
import { SearchPage } from '@/components/search-page'
import { TopBar } from '@/components/top-bar'
import { WorkDetailPage } from '@/components/work-detail-page'
import { findCatalogItem } from '@/data/catalog'
import { findComposer } from '@/data/composers'
import type { CatalogSection } from '@/models/catalog'
import { findWork } from '@/data/works'
import './App.css'

function RoutedDetailPage({ view }: { view: CatalogSection }) {
  const { id } = useParams()
  const item = findCatalogItem(view, id)

  if (!item) {
    return <Navigate to={`/${view}`} replace />
  }

  return <DetailPage item={item} view={view} />
}

function RoutedComposerDetailPage() {
  const { id } = useParams()
  const composer = findComposer(id)

  if (!composer) {
    return <Navigate to="/composers" replace />
  }

  return <ComposerDetailPage composer={composer} />
}

function RoutedWorkDetailPage() {
  const { id } = useParams()
  const work = findWork(id)

  if (!work) {
    return <Navigate to="/works" replace />
  }

  return <WorkDetailPage work={work} />
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const handleNavigate = () => {
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
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/works" element={<CollectionPage view="works" />} />
            <Route path="/works/:id" element={<RoutedWorkDetailPage />} />
            <Route path="/composers" element={<CollectionPage view="composers" />} />
            <Route path="/composers/:id" element={<RoutedComposerDetailPage />} />
            <Route path="/guides" element={<CollectionPage view="guides" />} />
            <Route path="/guides/:id" element={<RoutedDetailPage view="guides" />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
