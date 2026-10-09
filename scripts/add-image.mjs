#!/usr/bin/env node
/**
 * Add a public-domain image from Wikimedia Commons to the catalog.
 *
 *   node scripts/add-image.mjs "File:Beethoven.jpg" src/assets/catalog/composer-beethoven.webp --portrait
 *   node scripts/add-image.mjs "File:Some painting.jpg" src/assets/catalog/work-foo.webp --crop 0,0.1,1,0.6
 *
 * Refuses anything that isn't public domain or CC0, writes a WebP, and prints the
 * `assetCredits` entry to paste into src/assets/catalog-assets.ts (fill in `title`).
 *
 *   --portrait        square 1200 px crop centred on the most salient region (a face)
 *   --crop l,t,w,h    crop box as fractions of the original before resizing
 *   --quality n       WebP quality (default 76); lower it for grainy scans and prints
 */
import { writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const [file, out, ...flags] = process.argv.slice(2)
const quality = flags.includes('--quality') ? Number(flags[flags.indexOf('--quality') + 1]) : 76
if (!file?.startsWith('File:') || !out?.endsWith('.webp')) {
  console.error('usage: add-image.mjs "File:<name>" <out.webp> [--portrait] [--crop l,t,w,h]')
  process.exit(1)
}

const headers = { 'User-Agent': 'sonatina/1.0 (https://sonatina.vercel.app)' }
const api = new URL('https://commons.wikimedia.org/w/api.php')
api.search = new URLSearchParams({
  format: 'json', action: 'query', prop: 'imageinfo', iiprop: 'url|size|extmetadata', iiurlwidth: '2400', titles: file,
})
const page = Object.values((await (await fetch(api, { headers })).json()).query.pages)[0]
if (!page.imageinfo) {
  console.error(`Not found on Commons: ${file}`)
  process.exit(1)
}

const info = page.imageinfo[0]
const meta = info.extmetadata
const license = meta.LicenseShortName?.value ?? ''
if (!/^(public domain|pd|cc0)/i.test(license)) {
  console.error(`Refusing ${file}: licence is "${license}", not public domain or CC0`)
  process.exit(1)
}

// Commons metadata is HTML with machine-readable tails ("date QS:…", "label QS:…"); keep the human part.
const plain = (html = '') =>
  html.replace(/<[^>]+>/g, '').replace(/\s*(date|label|title) QS:.*/s, '').replace(/\s+/g, ' ').trim()
const url = info.width > 2400 ? info.thumburl : info.url
const original = Buffer.from(await (await fetch(url, { headers })).arrayBuffer())

let image = sharp(original)
const { width, height } = await image.metadata()
const crop = flags.includes('--crop') ? flags[flags.indexOf('--crop') + 1].split(',').map(Number) : null
if (crop) {
  image = image.extract({
    left: Math.round(crop[0] * width), top: Math.round(crop[1] * height),
    width: Math.round(crop[2] * width), height: Math.round(crop[3] * height),
  })
}

image = flags.includes('--portrait')
  ? image.resize(1200, 1200, { fit: 'cover', position: sharp.strategy.attention, withoutEnlargement: true })
  : image.resize({ width: 1600, withoutEnlargement: true })

const result = await image.webp({ quality }).toBuffer({ resolveWithObject: true })
await writeFile(out, result.data)

console.log(`wrote ${out} (${result.info.width}×${result.info.height}, ${Math.round(result.data.length / 1024)} KB)`)
console.log(`{
    title: '${plain(meta.ObjectName?.value).replace(/'/g, '’')}',
    artist: '${plain(meta.Artist?.value).replace(/'/g, '’')}',
    year: '${plain(meta.DateTimeOriginal?.value)}',
    source: commons('${info.descriptionurl.split('/wiki/File:')[1]}'),
  },`)
