import type { NavItem } from '@/data/navigation'

type SidebarLinkProps = {
  item: NavItem
  active: boolean
  onSelect: (id: NavItem['id']) => void
}

export function SidebarLink({ active, item, onSelect }: SidebarLinkProps) {
  const Icon = item.icon

  return (
    <button
      aria-current={active ? 'page' : undefined}
      className={active ? 'sidebar-link active' : 'sidebar-link'}
      type="button"
      onClick={() => onSelect(item.id)}
    >
      <Icon size={17} strokeWidth={1.9} />
      <span>{item.label}</span>
    </button>
  )
}
