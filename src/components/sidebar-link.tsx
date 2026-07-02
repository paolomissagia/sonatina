import { NavLink } from 'react-router'
import type { NavItem } from '@/data/navigation'

type SidebarLinkProps = {
  item: NavItem
  onNavigate: () => void
}

function getPath(id: NavItem['id']) {
  return id === 'discover' ? '/' : `/${id}`
}

export function SidebarLink({ item, onNavigate }: SidebarLinkProps) {
  const Icon = item.icon

  return (
    <NavLink
      className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
      end={item.id === 'discover'}
      to={getPath(item.id)}
      onClick={onNavigate}
    >
      <Icon size={17} strokeWidth={1.9} />
      <span>{item.label}</span>
    </NavLink>
  )
}
