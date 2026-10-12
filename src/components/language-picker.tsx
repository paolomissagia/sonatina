import { Languages } from 'lucide-react'
import { useLocation } from 'react-router'
import { locale, localeNames, locales, localizePath, rememberLocale, t } from '@/i18n'

/** Links to this page in each language. Following one reloads the page in that language. */
export function LanguagePicker() {
  const { pathname, search } = useLocation()

  return (
    <nav className="language-picker" aria-label={t('language')}>
      <Languages size={17} strokeWidth={1.9} aria-hidden="true" />
      {locales.map((option) => (
        <a
          aria-current={option === locale ? 'true' : undefined}
          href={localizePath(`${pathname}${search}`, option)}
          hrefLang={option}
          key={option}
          lang={option}
          title={localeNames[option]}
          onClick={() => rememberLocale(option)}
        >
          {option.toUpperCase()}
        </a>
      ))}
    </nav>
  )
}
