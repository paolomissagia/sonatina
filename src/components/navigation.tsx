import { router, usePathname, type Href } from 'expo-router'
import { BookOpen, Home, Info, Music2, Radio, Search, UserRound, type LucideIcon } from '@/ui/icons'
import type { GestureResponderEvent } from 'react-native'
import { getActiveView, type NavItem, type ViewId } from '@/data/navigation'

export const navIcons: Record<ViewId, LucideIcon> = {
  discover: Home,
  works: Music2,
  composers: UserRound,
  articles: BookOpen,
  radio: Radio,
  search: Search,
  about: Info,
}

/**
 * Pressing a section that is already open goes back to its first page, like a tab bar;
 * any other section opens where you left it.
 */
export function useSectionLink(item: NavItem) {
  const pathname = usePathname()
  const active = getActiveView(pathname) === item.id

  const onPress = (event: GestureResponderEvent) => {
    event.preventDefault()
    if (!active) {
      router.navigate(item.path as Href)
    } else if (pathname !== item.path) {
      router.dismissTo(item.path as Href)
    }
  }

  return { active, href: item.path as Href, onPress }
}
