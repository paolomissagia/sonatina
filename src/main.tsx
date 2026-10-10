import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { PlayerProvider } from '@/components/player-provider'

// The prerendered page's head tags. React renders its own from here on, and updates them as
// you browse, so these would only linger as stale duplicates.
for (const tag of document.head.querySelectorAll('[data-prerendered]')) {
  tag.remove()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PlayerProvider>
        <App />
      </PlayerProvider>
    </BrowserRouter>
  </StrictMode>,
)
