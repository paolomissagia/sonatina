import { StrictMode, type ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

type MountOptions = {
  /**
   * Hydrate the prerendered HTML (the default when there is some). Pass false for a page
   * whose first render depends on something the build can't know, such as a query string,
   * so React renders it fresh instead of reporting a mismatch.
   */
  hydrate?: boolean
}

/** Starts the app on the page, taking over from the HTML written by scripts/prerender.mjs. */
export function mount(app: ReactNode, { hydrate }: MountOptions = {}) {
  // The prerendered head tags. React renders its own from here on, and updates them as the
  // page changes, so these would linger as stale duplicates.
  for (const tag of document.head.querySelectorAll('[data-prerendered]')) {
    tag.remove()
  }

  const root = document.getElementById('root')!
  const tree = <StrictMode>{app}</StrictMode>
  if (root.hasChildNodes() && hydrate !== false) {
    hydrateRoot(root, tree)
  } else {
    createRoot(root).render(tree)
  }
}
