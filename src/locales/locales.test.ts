import { describe, expect, it } from 'vitest'
import de from './de.json'
import en from './en.json'
import fr from './fr.json'
import itLocale from './it.json'

const translations = { de, fr, it: itLocale }

const placeholders = (text: string) => [...text.matchAll(/\{\{(\w+)\}\}/g)].map((match) => match[1]).sort()

describe.each(Object.entries(translations))('%s', (_, messages) => {
  const entries: [string, string][] = Object.entries(messages)

  it('has exactly the English keys', () => {
    expect(Object.keys(messages).sort()).toEqual(Object.keys(en).sort())
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
