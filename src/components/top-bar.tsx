import { Menu } from 'lucide-react'
import { t } from '@/i18n'

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
        aria-label={t('menu_open')}
        aria-expanded={isMenuOpen}
        onClick={onMenuClick}
      >
        <Menu size={19} />
      </button>
    </header>
  )
}
