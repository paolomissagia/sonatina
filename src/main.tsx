import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { PlayerProvider } from '@/components/player-provider'
import { basename, locale, preferredHome } from '@/i18n'

const home = preferredHome(window.location.pathname)

if (home) {
  window.location.replace(home)
} else {
  document.documentElement.lang = locale

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter basename={basename}>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </BrowserRouter>
    </StrictMode>,
  )
}
