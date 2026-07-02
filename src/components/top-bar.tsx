import { Menu, Search } from 'lucide-react'

type TopBarProps = {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  return (
    <header className="topbar">
      <button className="icon-button mobile-menu" type="button" aria-label="Open menu">
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
