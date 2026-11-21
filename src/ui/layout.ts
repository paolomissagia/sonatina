import { useWindowDimensions } from 'react-native'
import { breakpoints } from './theme'

/** Which layout the window gets: the sidebar from `wide` up, phone layouts below `compact`. */
export function useLayout() {
  const { width } = useWindowDimensions()
  return {
    width,
    wide: width >= breakpoints.wide,
    compact: width < breakpoints.compact,
    full: width >= breakpoints.full,
  }
}
