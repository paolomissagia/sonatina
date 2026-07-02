import {
  BookOpen,
  Home,
  Info,
  Music2,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type ViewId =
  | 'discover'
  | 'works'
  | 'composers'
  | 'guides'
  | 'about'

export type NavItem = {
  id: ViewId
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'discover', label: 'Discover', icon: Home },
  { id: 'works', label: 'Works', icon: Music2 },
  { id: 'composers', label: 'Composers', icon: UserRound },
  { id: 'guides', label: 'Guides', icon: BookOpen },
]

export const aboutItem: NavItem = { id: 'about', label: 'About', icon: Info }
