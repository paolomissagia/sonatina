import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { CollectionPage } from '@/components/collection-page'
import { ExploreSection } from '@/components/explore-section'
import { HeroPanel } from '@/components/hero-panel'
import { SearchResultsPage } from '@/components/search-results-page'
import { TopBar } from '@/components/top-bar'
import type { ViewId } from '@/data/navigation'
import './App.css'

function App() {
  const [activeView, setActiveView] = useState<ViewId>('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const hasSearchQuery = searchQuery.trim().length > 0

  return (
    <div className="app-shell">
      <AppSidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="workspace">
        <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <main className="content">
          {hasSearchQuery ? (
            <SearchResultsPage query={searchQuery} />
          ) : activeView === 'discover' ? (
            <>
              <HeroPanel />
              <ExploreSection />
            </>
          ) : (
            <CollectionPage view={activeView} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
