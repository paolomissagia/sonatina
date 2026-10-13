import { describe, expect, it } from 'vitest'
import { locales } from '@/i18n'
import en from './en.json'

const files = import.meta.glob<Record<string, string>>('./*.json', { eager: true, import: 'default' })
const messages = (code: string) => files[`./${code}.json`]

const placeholders = (text: string) => [...text.matchAll(/\{\{(\w+)\}\}/g)].map((match) => match[1]).sort()

it('has a messages file for every language, and no others', () => {
  expect(Object.keys(files).sort()).toEqual(locales.map((code) => `./${code}.json`).sort())
})

describe.each(locales.filter((code) => code !== 'en'))('%s', (code) => {
  const entries = Object.entries(messages(code) ?? {})

  it('has exactly the English keys', () => {
    expect(entries.map(([key]) => key).sort()).toEqual(Object.keys(en).sort())
  })

  it('keeps every {{placeholder}} from English', () => {
    for (const [key, text] of entries) {
      expect(placeholders(text), key).toEqual(placeholders(en[key as keyof typeof en]))
    }
  })

  it('has no empty messages', () => {
    for (const [key, text] of entries) {
      expect(text.trim(), key).not.toBe('')
    }
  })
})
