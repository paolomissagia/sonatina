import {
  BookOpen,
  Home,
  Info,
  Music2,
  Newspaper,
  UserRound,
  UsersRound,
} from 'lucide-react'

export const navItems = [
  { label: 'Discover', icon: Home, active: true },
  { label: 'Works', icon: Music2 },
  { label: 'Composers', icon: UserRound },
  { label: 'Conductors', icon: UsersRound },
  { label: 'Guides', icon: BookOpen },
  { label: 'Articles', icon: Newspaper },
]

export const aboutItem = { label: 'About', icon: Info }
