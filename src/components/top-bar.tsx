import { Menu, Search } from 'lucide-react'

export function TopBar() {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" type="button" aria-label="Open menu">
        <Menu size={19} />
      </button>
      <label className="search-field">
        <Search size={18} />
        <input placeholder="Search works, composers, recordings..." />
      </label>
    </header>
  )
}
