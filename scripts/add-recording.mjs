#!/usr/bin/env node
/**
 * Look up freely licensed recordings on Wikimedia Commons for a work's player.
 *
 *   node scripts/add-recording.mjs "File:Mozart - Requiem (Krips) - I. Introitus.flac" "File:…"
 *
 * Refuses anything that isn't public domain, CC0, CC BY or CC BY-SA, and prints a
 * `tracks` entry per file, streamed from Wikimedia's MP3 version (it plays in every
 * browser). Fill in each track's title and `movement` (its index in the work's
 * movements), and the recording's `performer` from the printed credit.
 */
const files = process.argv.slice(2)
if (files.length === 0 || !files.every((file) => file.startsWith('File:'))) {
  console.error('usage: add-recording.mjs "File:<Commons audio file>" […]')
  process.exit(1)
}

const headers = { 'User-Agent': 'sonatina/1.0 (https://sonatina.vercel.app)' }
const plain = (html = '') =>
  html.replace(/<[^>]+>/g, '').replace(/\s*(date|label|title) QS:.*/s, '').replace(/\s+/g, ' ').trim()
const free = /^(public domain|pd|cc0|cc by(-sa)? \d)/i

// The API takes at most 50 titles per request.
const pages = []
for (let i = 0; i < files.length; i += 50) {
  const api = new URL('https://commons.wikimedia.org/w/api.php')
  api.search = new URLSearchParams({
    format: 'json', action: 'query', prop: 'videoinfo', viprop: 'url|derivatives|extmetadata', titles: files.slice(i, i + 50).join('|'),
  })
  pages.push(...Object.values((await (await fetch(api, { headers })).json()).query.pages))
}
const byTitle = new Map(pages.map((page) => [page.title, page]))

let failed = false
for (const file of files) {
  const page = byTitle.get(file.replace(/_/g, ' '))
  const info = page?.videoinfo?.[0]
  if (!info) {
    console.error(`Not found on Commons: ${file}`)
    failed = true
    continue
  }

  const meta = info.extmetadata
  const license = meta.LicenseShortName?.value ?? ''
  if (!free.test(license)) {
    console.error(`Refusing ${file}: licence is "${license}"`)
    failed = true
    continue
  }

  const mp3 = info.derivatives?.find((derivative) => derivative.type === 'audio/mpeg')?.src ?? info.url
  console.log(`// ${license} · ${plain(meta.Credit?.value).slice(0, 140)}`)
  console.log(`// artist: ${plain(meta.Artist?.value).slice(0, 140)} · attribution: ${plain(meta.Attribution?.value).slice(0, 100)}`)
  console.log(`{ title: '${plain(meta.ImageDescription?.value).slice(0, 80).replace(/'/g, '’')}', src: '${mp3.split('?')[0]}', page: '${info.descriptionurl}' },`)
}

process.exit(failed ? 1 : 0)
