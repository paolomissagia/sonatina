import { Menu } from 'lucide-react'

type TopBarProps = {
  isMenuOpen: boolean
  onMenuClick: () => void
}

export function TopBar({ isMenuOpen, onMenuClick }: TopBarProps) {
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
    </header>
  )
}
