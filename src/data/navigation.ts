import {
  BookOpen,
  Home,
  Info,
  Music2,
  Radio,
  UserRound,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { t } from '@/i18n'

export type ViewId =
  | 'discover'
  | 'works'
  | 'composers'
  | 'articles'
  | 'radio'
  | 'about'

export type NavItem = {
  id: ViewId
  label: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { id: 'discover', label: t('nav_discover'), icon: Home },
  { id: 'works', label: t('nav_works'), icon: Music2 },
  { id: 'composers', label: t('nav_composers'), icon: UserRound },
  { id: 'articles', label: t('nav_articles'), icon: BookOpen },
]

export const radioItem: NavItem = { id: 'radio', label: t('nav_radio'), icon: Radio }

export const aboutItem: NavItem = { id: 'about', label: t('nav_about'), icon: Info }
