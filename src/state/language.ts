import AsyncStorage from '@react-native-async-storage/async-storage'
import { getLocales } from 'expo-localization'
import i18next, { changeLanguage } from 'i18next'
import { useSyncExternalStore } from 'react'
import { Platform } from 'react-native'
import { currentLocale, isLocale, type Locale } from '@/i18n'

/** The same key the website used, so a returning visitor keeps their language. */
const choiceKey = 'sonatina-language'

function deviceLocale(): Locale | undefined {
  return getLocales()
    .map((locale) => locale.languageCode?.toLowerCase())
    .find(isLocale)
}

function apply(locale: Locale) {
  if (i18next.language !== locale) {
    void changeLanguage(locale)
  }
  if (Platform.OS === 'web' && typeof document !== 'undefined') {
    document.documentElement.lang = locale
  }
}

/** At startup: the language picked before, else the device's, else English. */
export async function loadLanguage() {
  let saved: string | null = null
  try {
    saved = await AsyncStorage.getItem(choiceKey)
  } catch {
    // Storage can be blocked (a private window); fall back to the device's language.
  }
  apply(isLocale(saved) ? saved : (deviceLocale() ?? 'en'))
}

/** Switches the interface now and remembers the choice for next time. */
export function chooseLanguage(locale: Locale) {
  apply(locale)
  AsyncStorage.setItem(choiceKey, locale).catch(() => {
    // The choice then lasts for this visit only.
  })
}

function subscribe(onChange: () => void) {
  i18next.on('languageChanged', onChange)
  return () => i18next.off('languageChanged', onChange)
}

/**
 * The current language. Call it in every screen and in the frame around them: it re-renders
 * the component when the language changes, so text from `t` and from the data modules updates.
 */
export function useLanguage(): Locale {
  return useSyncExternalStore(subscribe, currentLocale, currentLocale)
}
