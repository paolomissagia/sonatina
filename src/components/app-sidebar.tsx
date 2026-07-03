import { X } from 'lucide-react'
import wordmark from '@/assets/sonatina-wordmark.png'
import { aboutItem, navItems } from '@/data/navigation'
import { SidebarLink } from './sidebar-link'

type AppSidebarProps = {
  isOpen: boolean
  onClose: () => void
  onNavigate: () => void
}

export function AppSidebar({ isOpen, onClose, onNavigate }: AppSidebarProps) {
  return (
    <aside className={isOpen ? 'sidebar open' : 'sidebar'} aria-label="Primary">
      <div className="sidebar-header">
        <div className="brand">
          <img src={wordmark} alt="Sonatina" />
        </div>
        <button className="icon-button sidebar-close" type="button" aria-label="Close menu" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      <nav className="sidebar-group" aria-label="Browse">
        {navItems.map((item) => (
          <SidebarLink
            item={item}
            key={item.label}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <SidebarLink
          item={aboutItem}
          onNavigate={onNavigate}
        />
      </div>
    </aside>
  )
}
