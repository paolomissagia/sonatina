import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.tsx'
import { PlayerProvider } from '@/components/player-provider'
import { getIndexablePages, notFoundMeta, searchMeta } from '@/data/page-meta'

/*
 * The pages scripts/prerender.mjs writes at build time (see the template in
 * dotfiles/templates/vite-react). Every work, composer and article is listed from the
 * catalogue, so the sitemap follows the content.
 */

export { site } from './site'

export function routes() {
  return getIndexablePages().map(({ path }) => ({ path }))
}

export const unlisted = [searchMeta.path]

export const notFoundPath = notFoundMeta.path

export function render(path: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={path}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </StaticRouter>
    </StrictMode>,
  )
}
