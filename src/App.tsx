import { AppSidebar } from '@/components/app-sidebar'
import { ExploreSection } from '@/components/explore-section'
import { HeroPanel } from '@/components/hero-panel'
import { TopBar } from '@/components/top-bar'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <AppSidebar />

      <div className="workspace">
        <TopBar />

        <main className="content">
          <HeroPanel />
          <ExploreSection />
        </main>
      </div>
    </div>
  )
}

export default App
