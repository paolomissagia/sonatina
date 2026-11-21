import { Platform, type TextStyle, type ViewStyle } from 'react-native'

/** The concert-hall palette (see BRAND.md). Every colour in the app is one of these. */
export const colors = {
  ivory: '#f6efe2',
  parchment: '#ebe1cf',
  linen: '#e0d3bc',
  rule: '#d5c7ae',
  ruleStrong: '#bba98a',
  ink: '#2a2017',
  inkSoft: '#463a2d',
  umber: '#6b5c48',
  gilt: '#85561a',
  giltLight: '#a57b42',
  shadow: '#3b2a17',

  // The frame: the sidebar, tab bar, player and home hero, like a hall with the house lights down.
  frame: '#241b13',
  frameDeep: '#1d1610',
  frameRule: '#3a2e22',
  frameInk: '#f3e9d6',
  frameMuted: '#cdbfa6',
  frameGilt: '#d8a75e',

  // Over images.
  scrim: '#141210',
  onImage: '#fffdf8',
  onImageSoft: '#e5dfd6',
} as const

export type ColorName = keyof typeof colors

/** A palette colour at an opacity, like `rgb(var(--ink) / 0.5)` on the web. */
export function alpha(color: ColorName, opacity: number) {
  const hex = colors[color].slice(1)
  const [r, g, b] = [0, 2, 4].map((at) => parseInt(hex.slice(at, at + 2), 16))
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * EB Garamond for headings, Geist for body and labels. Custom fonts on Android ignore
 * `fontWeight`, so each weight is its own family.
 */
export const fonts = {
  display: 'EBGaramond_500Medium',
  displayItalic: 'EBGaramond_500Medium_Italic',
  displaySemibold: 'EBGaramond_600SemiBold',
  body: 'Geist_400Regular',
  bodyMedium: 'Geist_500Medium',
  bodySemibold: 'Geist_600SemiBold',
  bodyBold: 'Geist_700Bold',
  bodyHeavy: 'Geist_800ExtraBold',
} as const

export const radius = 8

/** Widths where the layout changes: the sidebar appears at `wide`, phones are below `compact`. */
export const breakpoints = {
  compact: 620,
  wide: 960,
  full: 1280,
} as const

/** A soft, warm shadow; `strength` is the opacity, 0.07–0.2 in the brand. */
export function shadow(strength: number, depth = 12): ViewStyle {
  return Platform.select<ViewStyle>({
    web: { boxShadow: `0 ${depth}px ${depth * 2.4}px ${alpha('shadow', strength)}` },
    default: {
      shadowColor: colors.shadow,
      shadowOpacity: strength,
      shadowRadius: depth,
      shadowOffset: { width: 0, height: depth / 2 },
      elevation: Math.round(depth / 4),
    },
  })!
}

export const type = {
  display: { fontFamily: fonts.display, color: colors.ink, letterSpacing: -0.5 },
  emphasis: { fontFamily: fonts.displayItalic, color: colors.gilt },
  heading: { fontFamily: fonts.bodyBold, color: colors.ink, fontSize: 22, lineHeight: 26, letterSpacing: -0.6 },
  body: { fontFamily: fonts.body, color: colors.inkSoft, fontSize: 16, lineHeight: 25 },
  small: { fontFamily: fonts.body, color: colors.umber, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fonts.bodySemibold, color: colors.ink, fontSize: 14, lineHeight: 19 },
  kicker: {
    fontFamily: fonts.bodyBold,
    color: colors.gilt,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
} satisfies Record<string, TextStyle>
