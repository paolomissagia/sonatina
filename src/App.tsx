import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useLocation, useNavigationType } from 'react-router'
import { AppSidebar } from '@/components/app-sidebar'
import { PlayerBar } from '@/components/player-bar'
import { TopBar } from '@/components/top-bar'
import { loadRecordings } from '@/player/use-recording'
import './App.css'

/** The sidebar, top bar and player around every page. Routes live in routes.ts. */
export function AppShell({ children }: { children: ReactNode }) {
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

        <main className="content">{children}</main>
        <PlayerBar />
      </div>
    </div>
  )
}
