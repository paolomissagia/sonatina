import { useState } from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import { CollectionPage } from '@/components/collection-page'
import { DetailPage } from '@/components/detail-page'
import { ExploreSection } from '@/components/explore-section'
import { HeroPanel } from '@/components/hero-panel'
import { SearchResultsPage } from '@/components/search-results-page'
import { TopBar } from '@/components/top-bar'
import type { CollectionItem } from '@/data/collections'
import type { ViewId } from '@/data/navigation'
import './App.css'

type DetailState = {
  view: Exclude<ViewId, 'discover' | 'about'>
  item: CollectionItem
} | null

function App() {
  const [activeView, setActiveView] = useState<ViewId>('discover')
  const [searchQuery, setSearchQuery] = useState('')
  const [detailState, setDetailState] = useState<DetailState>(null)
  const hasSearchQuery = searchQuery.trim().length > 0
  const handleViewChange = (view: ViewId) => {
    setActiveView(view)
    setSearchQuery('')
    setDetailState(null)
  }
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setDetailState(null)
  }

  return (
    <div className="app-shell">
      <AppSidebar activeView={activeView} onViewChange={handleViewChange} />

      <div className="workspace">
        <TopBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

        <main className="content">
          {detailState ? (
            <DetailPage
              item={detailState.item}
              view={detailState.view}
              onBack={() => setDetailState(null)}
            />
          ) : hasSearchQuery ? (
            <SearchResultsPage query={searchQuery} onSelectResult={(view, item) => setDetailState({ view, item })} />
          ) : activeView === 'discover' ? (
            <>
              <HeroPanel />
              <ExploreSection />
            </>
          ) : (
            <CollectionPage view={activeView} onSelectItem={(view, item) => setDetailState({ view, item })} />
          )}
        </main>
      </div>
    </div>
  )
}

export default App
