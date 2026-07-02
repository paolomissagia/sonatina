import {
  BookOpen,
  Home,
  Info,
  Menu,
  Music2,
  Newspaper,
  Search,
  UserRound,
  UsersRound,
} from 'lucide-react'
import heroArtwork from './assets/classical-dashboard-hero.png'
import wordmark from './assets/sonatina-wordmark.png'
import './App.css'

const navItems = [
  { label: 'Discover', icon: Home, active: true },
  { label: 'Works', icon: Music2 },
  { label: 'Composers', icon: UserRound },
  { label: 'Conductors', icon: UsersRound },
  { label: 'Guides', icon: BookOpen },
  { label: 'Articles', icon: Newspaper },
]

const exploreItems = [
  {
    title: 'Featured Works',
    description: 'Handpicked masterpieces',
    position: '20% 50%',
  },
  {
    title: 'Top Recordings',
    description: 'Highly rated by the community',
    position: '48% 50%',
  },
  {
    title: 'New Releases',
    description: 'The latest recordings',
    position: '72% 50%',
  },
  {
    title: 'Composer Spotlight',
    description: 'Discover great composers',
    position: '88% 50%',
  },
]

function SidebarLink({
  item,
}: {
  item: { label: string; icon: typeof Home; active?: boolean }
}) {
  const Icon = item.icon

  return (
    <button className={item.active ? 'sidebar-link active' : 'sidebar-link'} type="button">
      <Icon size={17} strokeWidth={1.9} />
      <span>{item.label}</span>
    </button>
  )
}

function App() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary">
        <div className="brand">
          <img src={wordmark} alt="Sonatina" />
        </div>

        <nav className="sidebar-group" aria-label="Browse">
          {navItems.map((item) => (
            <SidebarLink item={item} key={item.label} />
          ))}
        </nav>
        <div className="sidebar-footer">
          <SidebarLink item={{ label: 'About', icon: Info }} />
        </div>
      </aside>

      <div className="workspace">
        <header className="topbar">
          <button className="icon-button mobile-menu" type="button" aria-label="Open menu">
            <Menu size={19} />
          </button>
          <label className="search-field">
            <Search size={18} />
            <input placeholder="Search works, composers, recordings..." />
          </label>
        </header>

        <main className="content">
          <section className="hero-panel">
            <img src={heroArtwork} alt="" />
            <div className="hero-copy">
              <h1>
                Discover
                <span>the world of</span>
                <em>classical music.</em>
              </h1>
              <p>Explore works, recordings and more.</p>
              <button type="button">Start exploring</button>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <h2>Explore</h2>
              <button type="button">View all</button>
            </div>
            <div className="explore-grid">
              {exploreItems.map((item) => (
                <article className="explore-card" key={item.title}>
                  <div className="image-tile" style={{ objectPosition: item.position }}>
                    <img src={heroArtwork} alt="" />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}

export default App
