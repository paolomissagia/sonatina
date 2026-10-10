import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { PlayerProvider } from '@/components/player-provider'
import { mount } from './mount'

// Pages filtered by the query string (?era=, ?genre=, ?q=) were prerendered unfiltered,
// so they render fresh rather than hydrate.
mount(
  <BrowserRouter>
    <PlayerProvider>
      <App />
    </PlayerProvider>
  </BrowserRouter>,
  { hydrate: !window.location.search },
)
