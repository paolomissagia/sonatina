#!/usr/bin/env node
/**
 * Writes every page as static HTML after `vite build`, so search engines, AI crawlers and
 * link previews get the content, title and description without running JavaScript.
 * Also writes 404.html, sitemap.xml and robots.txt from the same list of pages.
 *
 * Copied unchanged from the template (dotfiles/templates/vite-react). The project-specific
 * parts live in src/entry-server.tsx, which the SSR build compiles into dist/.ssr:
 *
 *   site          { url, name } from src/site.ts
 *   routes()      the pages to list in the sitemap: [{ path: '/', lastmod?: 'YYYY-MM-DD' }]
 *   unlisted      pages to write but keep out of the sitemap, such as '/search' (optional)
 *   notFoundPath  the path that renders the 404 page, written to 404.html (optional)
 *   render(path)  the page at `path` as HTML
 *
 * '/' goes to dist/index.html and '/a/b' to dist/a/b.html; vercel.json's cleanUrls serves
 * it at /a/b. React puts a page's head tags (title, meta, link) at the start of its output;
 * they move into <head>, marked so src/mount.tsx can drop them when the app takes over.
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssr = path.join(dist, '.ssr')
const { site, routes, unlisted = [], notFoundPath, render } = await import(pathToFileURL(path.join(ssr, 'entry-server.js')).href)

const ROOT = '<div id="root"></div>'
const template = await readFile(path.join(dist, 'index.html'), 'utf8')
if (!template.includes(ROOT)) {
  throw new Error(`dist/index.html: no empty ${ROOT} to render into`)
}

const leadingHeadTags = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*>|<link\b[^>]*>)+/

function page(url) {
  const html = render(url)
  const head = html.match(leadingHeadTags)?.[0] ?? ''
  if (!head.includes('<title>')) {
    throw new Error(`${url}: the page renders no <title> (use <PageMeta>)`)
  }
  const marked = head.replace(/<(title|meta|link)\b/g, '<$1 data-prerendered')
  return template
    .replace('</head>', `  ${marked}\n  </head>`)
    .replace(ROOT, `<div id="root">${html.slice(head.length)}</div>`)
}

async function write(file, contents) {
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, contents)
}

const fileFor = (url) => path.join(dist, url === '/' ? 'index.html' : `${url.replace(/^\//, '')}.html`)

const listed = routes()
for (const url of [...listed.map((route) => route.path), ...unlisted]) {
  await write(fileFor(url), page(url))
}
if (notFoundPath) {
  await write(path.join(dist, '404.html'), page(notFoundPath))
}

const today = new Date().toISOString().slice(0, 10)
const urls = listed
  .map(({ path: url, lastmod = today }) => `  <url>\n    <loc>${new URL(url, site.url).href}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
  .join('\n')
await write(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
await write(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site.url).href}\n`)

// The SSR build is only needed to write the pages.
await rm(ssr, { recursive: true, force: true })
console.log(`prerendered ${listed.length + unlisted.length + (notFoundPath ? 1 : 0)} pages for ${site.url}`)
