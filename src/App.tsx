import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation, useParams } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { PlayerBar } from '@/components/player-bar'
import { TopBar } from '@/components/top-bar'
import { findComposer } from '@/data/composers'
import { findGuide } from '@/data/guides'
import { findWork } from '@/data/works'
import { AboutPage } from '@/pages/about-page'
import { CollectionPage } from '@/pages/collection-page'
import { ComposerDetailPage } from '@/pages/composer-detail-page'
import { GuideDetailPage } from '@/pages/guide-detail-page'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { SearchPage } from '@/pages/search-page'
import { WorkDetailPage } from '@/pages/work-detail-page'
import './App.css'

function RoutedComposerDetailPage() {
  const { id } = useParams()
  const composer = findComposer(id)

  if (!composer) {
    return <NotFoundPage />
  }

  return <ComposerDetailPage composer={composer} key={composer.id} />
}

function RoutedWorkDetailPage() {
  const { id } = useParams()
  const work = findWork(id)

  if (!work) {
    return <NotFoundPage />
  }

  return <WorkDetailPage work={work} key={work.id} />
}

function RoutedGuideDetailPage() {
  const { id } = useParams()
  const guide = findGuide(id)

  if (!guide) {
    return <NotFoundPage />
  }

  return <GuideDetailPage guide={guide} key={guide.id} />
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const workspaceRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const handleNavigate = () => {
    setIsSidebarOpen(false)
  }

  // The workspace, not the window, is the scroll container, so reset it on navigation.
  useEffect(() => {
    workspaceRef.current?.scrollTo({ top: 0 })
  }, [pathname])

  useEffect(() => {
    if (!isSidebarOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isSidebarOpen])

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

      <div className="workspace" ref={workspaceRef}>
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <PlayerBar />
      </div>
    </div>
  )
}

export default App
