import { Menu, Search } from 'lucide-react'

type TopBarProps = {
  isMenuOpen: boolean
  searchQuery: string
  onMenuClick: () => void
  onSearchChange: (value: string) => void
}

export function TopBar({ isMenuOpen, onMenuClick, searchQuery, onSearchChange }: TopBarProps) {
  return (
    <header className="topbar">
      <button
        className="icon-button mobile-menu"
        type="button"
        aria-label="Open menu"
        aria-expanded={isMenuOpen}
        onClick={onMenuClick}
      >
        <Menu size={19} />
      </button>
      <label className="search-field">
        <Search size={18} />
        <input
          placeholder="Search works, composers, guides..."
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
    </header>
  )
}
