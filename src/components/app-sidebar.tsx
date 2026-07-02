import wordmark from '@/assets/sonatina-wordmark.png'
import { aboutItem, navItems } from '@/data/navigation'
import { SidebarLink } from './sidebar-link'

export function AppSidebar() {
  return (
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
        <SidebarLink item={aboutItem} />
      </div>
    </aside>
  )
}
