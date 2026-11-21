/// <reference types="node" />
import { readdirSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { locales, messages as bundled } from '@/i18n'
import en from './en.json'

const files = readdirSync(import.meta.dirname).filter((file) => file.endsWith('.json'))
const messages = (code: (typeof locales)[number]) => bundled[code]

const placeholders = (text: string) => [...text.matchAll(/\{\{(\w+)\}\}/g)].map((match) => match[1]).sort()

it('has a messages file for every language, and no others', () => {
  expect(files.sort()).toEqual(locales.map((code) => `${code}.json`).sort())
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
