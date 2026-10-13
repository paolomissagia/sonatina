import { Languages } from 'lucide-react'
import { useLocation } from 'react-router'
import { isLocale, locale, localeNames, locales, localizePath, rememberLocale, t } from '@/i18n'

/** Picks the page's language. Choosing one reloads this page in that language. */
export function LanguagePicker() {
  const { pathname, search } = useLocation()

  return (
    <label className="language-picker">
      <Languages size={17} strokeWidth={1.9} aria-hidden="true" />
      <select
        aria-label={t('language')}
        value={locale}
        onChange={(event) => {
          const choice = event.target.value
          if (isLocale(choice)) {
            rememberLocale(choice)
            window.location.assign(localizePath(`${pathname}${search}`, choice))
          }
        }}
      >
        {locales.map((option) => (
          <option key={option} lang={option} value={option}>
            {localeNames[option]}
          </option>
        ))}
      </select>
    </label>
  )
}
