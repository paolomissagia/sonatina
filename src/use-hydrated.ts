import { useSyncExternalStore } from 'react'

const subscribeToNothing = () => () => {}

/**
 * False while prerendering and hydrating, true from then on. Pages are built without a
 * query string or a document, so anything that depends on them waits for this, keeping
 * the first render in the browser identical to the prerendered HTML.
 */
export function useHydrated() {
  return useSyncExternalStore(subscribeToNothing, () => true, () => false)
}
