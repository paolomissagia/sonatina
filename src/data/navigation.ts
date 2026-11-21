import { t, type MessageKey } from '@/i18n'

export type ViewId = 'discover' | 'works' | 'composers' | 'articles' | 'radio' | 'search' | 'about'

export type NavItem = {
  id: ViewId
  /** Where the item leads; the item is active anywhere under it. */
  path: '/' | `/${Exclude<ViewId, 'discover'>}`
  readonly label: string
}

const item = (id: ViewId, key: MessageKey): NavItem => ({
  id,
  path: id === 'discover' ? '/' : `/${id as Exclude<ViewId, 'discover'>}`,
  get label() {
    return t(key)
  },
})

/** The sections, in the order the sidebar and the tab bar list them. */
export const navItems: NavItem[] = [
  item('discover', 'nav_discover'),
  item('works', 'nav_works'),
  item('composers', 'nav_composers'),
  item('articles', 'nav_articles'),
]

export const radioItem = item('radio', 'nav_radio')
export const searchItem = item('search', 'nav_search')
export const aboutItem = item('about', 'nav_about')

/** The section a path belongs to: `/works/bach-cello-suites` is under Works. */
export function getActiveView(pathname: string): ViewId | undefined {
  const first = pathname.split('/')[1] ?? ''
  if (first === '') {
    return 'discover'
  }
  return [...navItems, radioItem, searchItem, aboutItem].find((nav) => nav.id === first)?.id
}
