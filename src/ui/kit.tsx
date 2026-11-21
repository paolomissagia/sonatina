import { Image, type ImageProps } from 'expo-image'
import { Link, type Href } from 'expo-router'
import Head from 'expo-router/head'
import type { LucideIcon } from '@/ui/icons'
import { Children, useState, type ComponentProps, type ReactNode } from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type PressableProps,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native'
import { catalogAssets, type CatalogAssetKey } from '@/assets/catalog-assets'
import { alpha, colors, fonts, radius, type } from './theme'

type Interaction = { hovered: boolean; pressed: boolean }

type TouchableProps = Omit<PressableProps, 'style' | 'children'> & {
  /** A link; without it, the touchable is a button (give it `onPress`). */
  href?: Href
  style?: StyleProp<ViewStyle> | ((state: Interaction) => StyleProp<ViewStyle>)
  children: ReactNode | ((state: Interaction) => ReactNode)
}

/**
 * The base of every link and button: a real link on the web (so it can be opened in a new
 * tab), a pressable on phones, with hover and press states for styling.
 */
export function Touchable({ href, style, children, onPress, ...rest }: TouchableProps) {
  // Tracked here rather than through Pressable's render callbacks, which a link (`asChild`)
  // doesn't pass through.
  const [hovered, setHovered] = useState(false)
  const [pressed, setPressed] = useState(false)
  const state = { hovered, pressed }
  const pressable = (
    <Pressable
      {...rest}
      // A link handles the press itself (and skips navigating if `onPress` prevents it).
      onPress={href ? undefined : onPress}
      role={rest.role ?? (href ? 'link' : 'button')}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      // Flattened: a link passes its child's style straight to the anchor on the web.
      style={StyleSheet.flatten(typeof style === 'function' ? style(state) : style)}
    >
      {typeof children === 'function' ? children(state) : children}
    </Pressable>
  )

  return href ? (
    <Link href={href} onPress={onPress as ComponentProps<typeof Link>['onPress']} asChild>
      {pressable}
    </Link>
  ) : (
    pressable
  )
}

type ButtonProps = {
  label: string
  icon?: LucideIcon
  href?: Href
  onPress?: () => void
  /** Ink on paper, or gilt on the dark frame. */
  tone?: 'ink' | 'gilt' | 'outline-frame'
  accessibilityLabel?: string
}

/** A pill-shaped call to action, like Start exploring and Listen. */
export function Button({ label, icon: Icon, href, onPress, tone = 'ink', accessibilityLabel }: ButtonProps) {
  const palette = {
    ink: { bg: colors.ink, fg: colors.ivory, border: colors.ink },
    gilt: { bg: colors.frameGilt, fg: colors.frameDeep, border: colors.frameGilt },
    'outline-frame': { bg: alpha('frameDeep', 0.35), fg: colors.frameInk, border: alpha('frameInk', 0.4) },
  }[tone]

  return (
    <Touchable
      href={href}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      style={({ hovered, pressed }) => [
        styles.button,
        { backgroundColor: palette.bg, borderColor: palette.border },
        (hovered || pressed) && { opacity: 0.88 },
      ]}
    >
      {Icon ? <Icon size={17} color={palette.fg} strokeWidth={2} /> : null}
      <Text style={[styles.buttonLabel, { color: palette.fg }]}>{label}</Text>
    </Touchable>
  )
}

type IconButtonProps = {
  icon: LucideIcon
  label: string
  onPress?: () => void
  href?: Href
  color?: string
  size?: number
  disabled?: boolean
  active?: boolean
  style?: StyleProp<ViewStyle>
}

/** A round, icon-only button, labelled for screen readers. */
export function IconButton({ icon: Icon, label, onPress, href, color = colors.ink, size = 18, disabled, active, style }: IconButtonProps) {
  return (
    <Touchable
      href={href}
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={label}
      accessibilityState={{ disabled, selected: active }}
      hitSlop={6}
      style={({ hovered, pressed }) => [
        styles.iconButton,
        (hovered || pressed) && !disabled && { backgroundColor: alpha('ink', 0.06) },
        disabled && { opacity: 0.35 },
        style,
      ]}
    >
      <Icon size={size} color={color} strokeWidth={1.9} />
    </Touchable>
  )
}

export type ChipItem = {
  key: string
  label: string
  active: boolean
  href?: Href
  onPress?: () => void
  icon?: LucideIcon
}

/** A wrapping row of filter chips: genres, eras, article categories, stations. */
export function Chips({ items, label }: { items: ChipItem[]; label: string }) {
  return (
    <View style={styles.chips} accessibilityLabel={label} role="list">
      {items.map(({ key, label: text, active, href, onPress, icon: Icon }) => (
        <Touchable
          key={key}
          href={href}
          onPress={onPress}
          accessibilityState={{ selected: active }}
          style={({ hovered, pressed }) => [
            styles.chip,
            (hovered || pressed) && !active && { borderColor: colors.ruleStrong, backgroundColor: colors.linen },
            active && styles.chipActive,
          ]}
        >
          {Icon ? <Icon size={14} color={active ? colors.ivory : colors.ink} strokeWidth={2} /> : null}
          <Text style={[styles.chipLabel, active && { color: colors.ivory }]}>{text}</Text>
        </Touchable>
      ))}
    </View>
  )
}

type GridProps = {
  /** The narrowest a column may get; the grid fits as many columns as it can, up to `maxColumns`. */
  minColumnWidth: number
  maxColumns?: number
  gap?: number
  children: ReactNode
}

/** A grid of equal columns, as many as fit its own width (not the window's, which includes the sidebar). */
export function Grid({ minColumnWidth, maxColumns = 4, gap = 22, children }: GridProps) {
  const [width, setWidth] = useState(0)
  const items = Children.toArray(children)
  const columns = Math.max(1, Math.min(maxColumns, Math.floor((width + gap) / (minColumnWidth + gap))))
  const itemWidth = width > 0 ? Math.floor((width - gap * (columns - 1)) / columns) : 0

  return (
    <View style={[styles.grid, { gap }]} onLayout={(event) => setWidth(event.nativeEvent.layout.width)}>
      {itemWidth > 0 ? items.map((child, at) => <View key={at} style={{ width: itemWidth }}>{child}</View>) : null}
    </View>
  )
}

type CatalogImageProps = Omit<ImageProps, 'source'> & { asset: CatalogAssetKey }

/** Artwork from the catalogue: public-domain paintings and portraits. */
export function CatalogImage({ asset, style, contentFit = 'cover', ...rest }: CatalogImageProps) {
  return (
    <Image
      source={catalogAssets[asset]}
      style={style}
      contentFit={contentFit}
      transition={180}
      accessibilityIgnoresInvertColors
      {...rest}
    />
  )
}

export function SectionHeading({ title, style }: { title: string; style?: StyleProp<TextStyle> }) {
  return (
    <Text role="heading" style={[type.heading, style]}>
      {title}
    </Text>
  )
}

/** The browser tab's title, "Works · Sonatina"; nothing on phones. */
export function PageTitle({ title }: { title: string }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}

/** "Works · Sonatina" */
export function titleOf(...parts: string[]) {
  return [...parts, 'Sonatina'].join(' · ')
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    paddingHorizontal: 26,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    alignSelf: 'flex-start',
  },
  buttonLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 15,
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 36,
    paddingHorizontal: 15,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.rule,
    backgroundColor: alpha('ivory', 0.7),
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  chipActive: {
    borderColor: colors.ink,
    backgroundColor: colors.ink,
  },
  chipLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.ink,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})

export const cardStyle: ViewStyle = {
  borderWidth: 1,
  borderColor: colors.rule,
  borderRadius: radius,
  backgroundColor: alpha('ivory', 0.75),
  overflow: 'hidden',
}
