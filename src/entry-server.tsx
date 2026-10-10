import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.tsx'
import { PlayerProvider } from '@/components/player-provider'

export { getIndexablePages, siteUrl } from '@/data/page-meta'

/**
 * The page at `url` as HTML, for the build to write out as a static file. React puts the
 * page's head tags (title, meta, link) first; scripts/prerender.mjs moves them into <head>.
 */
export function render(url: string) {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </StaticRouter>
    </StrictMode>,
  )
}
