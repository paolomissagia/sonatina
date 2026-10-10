import { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigationType, useParams } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { PlayerBar } from '@/components/player-bar'
import { TopBar } from '@/components/top-bar'
import { findComposer } from '@/data/composers'
import { findArticle } from '@/data/articles'
import { findWork } from '@/data/works'
import { AboutPage } from '@/pages/about-page'
import { CollectionPage } from '@/pages/collection-page'
import { ComposerDetailPage } from '@/pages/composer-detail-page'
import { ArticleDetailPage } from '@/pages/article-detail-page'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { RadioPage } from '@/pages/radio-page'
import { loadRecordings } from '@/player/use-recording'
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

/** Articles used to be called guides; keep old links working. */
function GuideRedirect() {
  const { id } = useParams()
  return <Navigate replace to={id ? `/articles/${id}` : '/articles'} />
}

function RoutedArticleDetailPage() {
  const { id } = useParams()
  const article = findArticle(id)

  if (!article) {
    return <NotFoundPage />
  }

  return <ArticleDetailPage article={article} key={article.id} />
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const workspaceRef = useRef<HTMLDivElement>(null)
  const { key, pathname } = useLocation()
  const navigationType = useNavigationType()
  // Scroll positions by history entry, so Back returns to where you were.
  const scrollPositions = useRef(new Map<string, number>())
  const handleNavigate = () => {
    setIsSidebarOpen(false)
  }

  // Warm the recordings table once the page is idle, so Listen appears instantly on work pages.
  useEffect(() => {
    const warm = () => void loadRecordings()
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(warm)
      return () => window.cancelIdleCallback(id)
    }
    const timer = setTimeout(warm, 1500)
    return () => clearTimeout(timer)
  }, [])

  // The workspace, not the window, is the scroll container: new pages open at the top,
  // and Back or Forward restores the position the page was left at.
  useEffect(() => {
    const top = navigationType === 'POP' ? scrollPositions.current.get(key) ?? 0 : 0
    workspaceRef.current?.scrollTo({ top })
  }, [key, pathname, navigationType])

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

      <div
        className="workspace"
        ref={workspaceRef}
        onScroll={(event) => scrollPositions.current.set(key, event.currentTarget.scrollTop)}
      >
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
            <Route path="/articles" element={<CollectionPage view="articles" />} />
            <Route path="/articles/:id" element={<RoutedArticleDetailPage />} />
            <Route path="/guides" element={<GuideRedirect />} />
            <Route path="/guides/:id" element={<GuideRedirect />} />
            <Route path="/radio" element={<RadioPage />} />
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
