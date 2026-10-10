#!/usr/bin/env node
/**
 * Write every page as static HTML after `vite build`, so search engines and link previews
 * see real content, titles and descriptions without running JavaScript. Also writes
 * 404.html, sitemap.xml and robots.txt. Run by `npm run build`.
 *
 * Pages go to dist/<path>.html; Vercel serves them at clean URLs (see vercel.json).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'

const dist = path.resolve('dist')
const server = path.resolve('dist-server')
const { render, getIndexablePages, siteUrl } = await import(path.join(server, 'entry-server.js'))

const template = await readFile(path.join(dist, 'index.html'), 'utf8')

// React puts hoistable head tags first in its output.
const leadingHeadTags = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)+/

function page(url) {
  const html = render(url)
  const head = html.match(leadingHeadTags)?.[0] ?? ''
  const body = html.slice(head.length)
  // Marked so the app can remove them once it takes over (see src/main.tsx).
  const marked = head.replace(/<(title|meta|link)\b/g, '<$1 data-prerendered')
  return template.replace('</head>', `${marked}\n  </head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

async function write(file, contents) {
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, contents)
}

const pages = getIndexablePages()
for (const { path: url } of pages) {
  await write(path.join(dist, url === '/' ? 'index.html' : `${url}.html`), page(url))
}
// Not in the sitemap, but they still need a real page when opened directly.
await write(path.join(dist, 'search.html'), page('/search'))
await write(path.join(dist, '404.html'), page('/404'))

const urls = pages.map(({ path: url }) => `  <url><loc>${new URL(url, siteUrl).href}</loc></url>`).join('\n')
await write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteUrl).href}\n`)

// The server bundle is only needed to build the pages.
await rm(server, { recursive: true, force: true })
console.log(`prerendered ${pages.length + 2} pages`)
