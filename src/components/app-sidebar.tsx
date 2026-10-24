import { Search, X } from 'lucide-react'
import { NavLink } from 'react-router'
import { aboutItem, navItems, radioItem } from '@/data/navigation'
import { LanguagePicker } from './language-picker'
import { Logo } from './logo'
import { SidebarLink } from './sidebar-link'
import { t } from '@/i18n'

type AppSidebarProps = {
  isOpen: boolean
  onClose: () => void
  onNavigate: () => void
}

export function AppSidebar({ isOpen, onClose, onNavigate }: AppSidebarProps) {
  return (
    <aside className={isOpen ? 'sidebar open' : 'sidebar'} aria-label={t('nav_primary')}>
      <div className="sidebar-header">
        <div className="brand">
          <Logo />
        </div>
        <button className="icon-button sidebar-close" type="button" aria-label={t('menu_close')} onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-group" aria-label={t('nav_browse')}>
        {navItems.map((item) => (
          <SidebarLink
            item={item}
            key={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <SidebarLink item={radioItem} onNavigate={onNavigate} />
        <NavLink
          className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
          to="/search"
          onClick={onNavigate}
        >
          <Search size={17} strokeWidth={1.9} />
          <span>{t('nav_search')}</span>
        </NavLink>
        <SidebarLink
          item={aboutItem}
          onNavigate={onNavigate}
        />
        <LanguagePicker />
        <p className="sidebar-credit">
          {t('made_by')}{' '}
          <a href="https://www.paolomissagia.com" rel="author">
            Paolo Missagia
          </a>
        </p>
      </div>
    </aside>
  )
}
