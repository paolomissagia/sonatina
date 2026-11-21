import { Redirect, useLocalSearchParams, type Href } from 'expo-router'
import { useEffect } from 'react'
import { NotFound } from '@/components/not-found'
import { isLocale } from '@/i18n'
import { chooseLanguage } from '@/state/language'

/**
 * The website put the language in the address (`/de/works`). Those links still work: they
 * switch to that language and open the page. Anything else here is a page that doesn't exist.
 */
export default function LanguageRedirect() {
  const { locale, rest, ...query } = useLocalSearchParams<{ locale: string; rest?: string[] }>()
  const valid = isLocale(locale)

  useEffect(() => {
    if (valid) {
      chooseLanguage(locale)
    }
  }, [valid, locale])

  if (!valid) {
    return <NotFound />
  }

  const path = `/${(rest ?? []).join('/')}`
  const search = new URLSearchParams(query as Record<string, string>).toString()
  return <Redirect href={(search ? `${path}?${search}` : path) as Href} />
}
