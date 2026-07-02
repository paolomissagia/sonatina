import wordmark from '@/assets/sonatina-wordmark.png'
import type { ViewId } from '@/data/navigation'
import { aboutItem, navItems } from '@/data/navigation'
import { SidebarLink } from './sidebar-link'

type AppSidebarProps = {
  activeView: ViewId
  onViewChange: (view: ViewId) => void
}

export function AppSidebar({ activeView, onViewChange }: AppSidebarProps) {
  return (
    <aside className="sidebar" aria-label="Primary">
      <div className="brand">
        <img src={wordmark} alt="Sonatina" />
      </div>

      <nav className="sidebar-group" aria-label="Browse">
        {navItems.map((item) => (
          <SidebarLink
            active={activeView === item.id}
            item={item}
            key={item.label}
            onSelect={onViewChange}
          />
        ))}
      </nav>

      <div className="sidebar-footer">
        <SidebarLink
          active={activeView === aboutItem.id}
          item={aboutItem}
          onSelect={onViewChange}
        />
      </div>
    </aside>
  )
}
