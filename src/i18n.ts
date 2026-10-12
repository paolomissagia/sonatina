import i18next, { t } from 'i18next'
import type { ArticleCategory } from '@/models/article'
import type { Period } from '@/models/composer'
import type { Genre } from '@/models/work'
import de from '@/locales/de.json'
import en from '@/locales/en.json'
import fr from '@/locales/fr.json'
import it from '@/locales/it.json'

/** Import `t` from here rather than from i18next, so translations are loaded before first use. */
export { t }

export const locales = ['en', 'de', 'fr', 'it'] as const
export type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
}

function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale)
}

/**
 * The page's language, from its address: /de/... is German, anything unprefixed English.
 * It never changes while the page is open (switching reloads), so data modules can
 * resolve their labels once.
 */
export const locale: Locale = (() => {
  const prefix = typeof window === 'undefined' ? undefined : window.location.pathname.split('/')[1]
  return isLocale(prefix) ? prefix : defaultLocale
})()

/** Where the app's routes start: `/de` in German, the root in English. */
export const basename = locale === defaultLocale ? undefined : `/${locale}`

/** An app path (`/works?genre=opera`) in the given language. */
export function localizePath(path: string, target: Locale) {
  return target === defaultLocale ? path : `/${target}${path === '/' ? '' : path}`
}

void i18next.init({
  lng: locale,
  fallbackLng: defaultLocale,
  resources: {
    en: { translation: en },
    de: { translation: de },
    fr: { translation: fr },
    it: { translation: it },
  },
  // Resources are bundled, so labels are ready as soon as this module loads.
  initAsync: false,
  // React escapes text itself.
  interpolation: { escapeValue: false },
})

const choiceKey = 'sonatina-language'

/** Remembers a language picked in the sidebar, so the home page opens in it next time. */
export function rememberLocale(choice: Locale) {
  try {
    localStorage.setItem(choiceKey, choice)
  } catch {
    // Storage can be blocked; the choice then lasts for this visit only.
  }
}

function rememberedLocale() {
  try {
    const choice = localStorage.getItem(choiceKey)
    return isLocale(choice) ? choice : undefined
  } catch {
    return undefined
  }
}

function browserLocale() {
  return navigator.languages.map((tag) => tag.split('-')[0].toLowerCase()).find(isLocale)
}

/**
 * Where to send a visitor who lands on the English home page but reads another language:
 * the one they picked before, else their browser's. Other addresses are left alone, so a
 * shared link always opens in the language it was shared in.
 */
export function preferredHome(pathname: string) {
  if (pathname !== '/') {
    return undefined
  }

  const preferred = rememberedLocale() ?? browserLocale()
  return preferred && preferred !== defaultLocale ? localizePath('/', preferred) : undefined
}

export const genreLabels: Record<Genre, string> = {
  Symphony: t('genre_symphony'),
  Concerto: t('genre_concerto'),
  Orchestral: t('genre_orchestral'),
  Piano: t('genre_piano'),
  Chamber: t('genre_chamber'),
  Choral: t('genre_choral'),
  Opera: t('genre_opera'),
  Ballet: t('genre_ballet'),
}

export const periodLabels: Record<Period, string> = {
  Baroque: t('period_baroque'),
  Classical: t('period_classical'),
  Romantic: t('period_romantic'),
  Modern: t('period_modern'),
}

export const articleCategoryLabels: Record<ArticleCategory, string> = {
  Guides: t('article_category_guides'),
  Composers: t('article_category_composers'),
  Genres: t('article_category_genres'),
  Periods: t('article_category_periods'),
  Listening: t('article_category_listening'),
}
