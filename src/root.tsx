import type { ReactNode } from 'react'
import { Links, Meta, Outlet, Scripts } from 'react-router'
import { AppShell } from './App'
import { PlayerProvider } from '@/components/player-provider'
import './index.css'

/** The HTML document around every page. Each route adds its own head tags with `meta`. */
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
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
      <AppShell>
        <Outlet />
      </AppShell>
    </PlayerProvider>
  )
}

/**
 * The app before it has loaded, in the fallback page served for unknown addresses (see
 * vercel.json). The not-found route takes over once the scripts run.
 */
export function HydrateFallback() {
  return null
}
