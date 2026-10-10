import { useCallback } from 'react'
import { findStation } from '@/data/stations'
import { usePlayer } from './player-context'

/**
 * For the Radio links: tune in to Everything on the click itself, so the page opens
 * with music playing. Anything already playing, a station or a work, carries on.
 */
export function useStartRadio() {
  const { station, playing, tune } = usePlayer()

  return useCallback(() => {
    const everything = findStation('everything')
    if (!station && !playing && everything) {
      tune(everything)
    }
  }, [station, playing, tune])
}
