import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts } from 'react-router'
import { PlayerProvider } from '@/components/player-provider'
import './index.css'

/** The HTML document around every page. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="description" content="A friendly guide to classical music: works, composers and listening guides." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id="root">{children}</div>
        <Scripts />
      </body>
    </html>
  )
}

export default function Root() {
  return (
    <PlayerProvider>
      <Outlet />
    </PlayerProvider>
  )
}

/** Unknown addresses get the fallback page, which stays empty until the scripts run. */
export function HydrateFallback() {
  return null
}
