import type { LucideIcon } from 'lucide-react'

type SidebarLinkProps = {
  item: {
    label: string
    icon: LucideIcon
    active?: boolean
  }
}

export function SidebarLink({ item }: SidebarLinkProps) {
  const Icon = item.icon

  return (
    <button className={item.active ? 'sidebar-link active' : 'sidebar-link'} type="button">
      <Icon size={17} strokeWidth={1.9} />
      <span>{item.label}</span>
    </button>
  )
}
