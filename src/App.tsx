import { useState } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { TopBar } from '@/components/top-bar'
import { findComposer } from '@/data/composers'
import { findGuide } from '@/data/guides'
import { findWork } from '@/data/works'
import { AboutPage } from '@/pages/about-page'
import { CollectionPage } from '@/pages/collection-page'
import { ComposerDetailPage } from '@/pages/composer-detail-page'
import { GuideDetailPage } from '@/pages/guide-detail-page'
import { HomePage } from '@/pages/home-page'
import { SearchPage } from '@/pages/search-page'
import { WorkDetailPage } from '@/pages/work-detail-page'
import './App.css'

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

function RoutedGuideDetailPage() {
  const { id } = useParams()
  const guide = findGuide(id)

  if (!guide) {
    return <Navigate to="/guides" replace />
  }

  return <GuideDetailPage guide={guide} />
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
            <Route path="/guides/:id" element={<RoutedGuideDetailPage />} />
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
