import i18next, { init, t } from 'i18next'
import de from '@/locales/de.json'
import en from '@/locales/en.json'
import es from '@/locales/es.json'
import fr from '@/locales/fr.json'
import it from '@/locales/it.json'
import pt from '@/locales/pt.json'
import type { ArticleCategory } from '@/models/article'
import type { Period } from '@/models/composer'
import type { Genre } from '@/models/work'

/**
 * Import `t` from here rather than from i18next, so translations are loaded before first use.
 * Plain TypeScript: the device side (saving the choice, re-rendering) is in `state/language`.
 */
export { t }

export const locales = ['en', 'de', 'es', 'fr', 'it', 'pt'] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
}

export const messages: Record<Locale, Record<string, string>> = { en, de, es, fr, it, pt }

export type MessageKey = keyof typeof en

export function isLocale(value: unknown): value is Locale {
  return locales.includes(value as Locale)
}

void init({
  lng: defaultLocale,
  fallbackLng: defaultLocale,
  resources: Object.fromEntries(locales.map((code) => [code, { translation: messages[code] }])),
  // Resources are bundled, so labels are ready as soon as this module loads.
  initAsync: false,
  // React escapes text itself.
  interpolation: { escapeValue: false },
})

/** The language the interface is in now. */
export function currentLocale(): Locale {
  return isLocale(i18next.language) ? i18next.language : defaultLocale
}

/**
 * Labels looked up each time they are read, so a record built when a module loads still
 * follows a change of language.
 */
export function labels<K extends string>(keys: Record<K, MessageKey>): Readonly<Record<K, string>> {
  const result = {} as Record<K, string>
  for (const name of Object.keys(keys) as K[]) {
    const key: MessageKey = keys[name]
    Object.defineProperty(result, name, { enumerable: true, get: () => t(key) })
  }
  return result
}

export const genreLabels = labels<Genre>({
  Symphony: 'genre_symphony',
  Concerto: 'genre_concerto',
  Orchestral: 'genre_orchestral',
  Piano: 'genre_piano',
  Chamber: 'genre_chamber',
  Choral: 'genre_choral',
  Opera: 'genre_opera',
  Ballet: 'genre_ballet',
})

export const periodLabels = labels<Period>({
  Baroque: 'period_baroque',
  Classical: 'period_classical',
  Romantic: 'period_romantic',
  Modern: 'period_modern',
})

export const articleCategoryLabels = labels<ArticleCategory>({
  Guides: 'article_category_guides',
  Composers: 'article_category_composers',
  Genres: 'article_category_genres',
  Periods: 'article_category_periods',
  Listening: 'article_category_listening',
})
