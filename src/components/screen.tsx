import { router, useScrollToTop } from 'expo-router'
import { ChevronLeft, Info, Search } from '@/ui/icons'
import { useRef, type ComponentRef, type ReactNode } from 'react'
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { IconButton, Touchable } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { breakpoints, colors } from '@/ui/theme'
import { Logo } from './logo'

export type HeaderKind = 'root' | 'back'

/** Padding for a screen's scrolling content, so it sits clear of the notch and the edges. */
export function useScreenPadding(): ViewStyle {
  const { wide, compact } = useLayout()
  const insets = useSafeAreaInsets()
  return {
    width: '100%',
    maxWidth: breakpoints.full,
    alignSelf: 'center',
    paddingTop: wide ? 28 : insets.top + 4,
    paddingBottom: 56,
    paddingLeft: (compact ? 16 : wide ? 34 : 24) + insets.left,
    paddingRight: (compact ? 16 : wide ? 34 : 24) + insets.right,
  }
}

function goBack() {
  if (router.canGoBack()) {
    router.back()
  } else {
    router.replace('/')
  }
}

/**
 * The top row on phones and tablets: the wordmark (or a back button), then Search and About.
 * Wide windows have the sidebar instead, so this renders nothing there.
 */
export function ScreenHeader({ kind }: { kind: HeaderKind }) {
  useLanguage()
  const { wide } = useLayout()

  if (wide) {
    return null
  }

  return (
    <View style={styles.header}>
      {kind === 'back' ? (
        <IconButton icon={ChevronLeft} label={t('back')} onPress={goBack} size={24} style={styles.back} />
      ) : (
        <Touchable href="/" accessibilityLabel="Sonatina">
          <Logo color={colors.ink} height={24} />
        </Touchable>
      )}
      <View style={styles.headerActions}>
        <IconButton icon={Search} label={t('nav_search')} href="/search" />
        <IconButton icon={Info} label={t('nav_about')} href="/about" />
      </View>
    </View>
  )
}

type ScreenProps = {
  children: ReactNode
  header?: HeaderKind
}

/** A scrolling page with the phone header on top. Tapping the active tab scrolls it back up. */
export function Screen({ children, header = 'root' }: ScreenProps) {
  const padding = useScreenPadding()
  const ref = useRef<ComponentRef<typeof ScrollView>>(null)
  useScrollToTop(ref as unknown as Parameters<typeof useScrollToTop>[0])

  return (
    <ScrollView ref={ref} style={styles.root} contentContainerStyle={padding} keyboardShouldPersistTaps="handled">
      <ScreenHeader kind={header} />
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  header: {
    minHeight: 52,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back: {
    marginLeft: -10,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginRight: -8,
  },
})
