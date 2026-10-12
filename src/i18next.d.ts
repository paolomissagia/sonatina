import 'i18next'
import type en from '@/locales/en.json'

// English is the source: a key missing from it, or a missing {{value}}, fails the type-check.
declare module 'i18next' {
  interface CustomTypeOptions {
    resources: { translation: typeof en }
  }
}
