import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { navItems, radioItem, type NavItem } from '@/data/navigation'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { Touchable } from '@/ui/kit'
import { colors, fonts } from '@/ui/theme'
import { navIcons, useSectionLink } from './navigation'

function Tab({ item }: { item: NavItem }) {
  const { active, href, onPress } = useSectionLink(item)
  const Icon = navIcons[item.id]
  const color = active ? colors.frameGilt : colors.frameMuted

  return (
    <Touchable href={href} onPress={onPress} role="tab" accessibilityState={{ selected: active }} style={styles.tab}>
      <Icon size={21} strokeWidth={active ? 2.1 : 1.8} color={color} />
      <Text style={[styles.label, { color }]} numberOfLines={1}>
        {item.label}
      </Text>
    </Touchable>
  )
}

/** The tab bar on phones and tablets: the four sections and the radio. */
export function BottomBar() {
  useLanguage()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={[styles.bar, { paddingBottom: Math.max(insets.bottom, 8), paddingLeft: insets.left, paddingRight: insets.right }]}
      role="tablist"
      accessibilityLabel={t('nav_primary')}
    >
      {[...navItems, radioItem].map((item) => (
        <Tab item={item} key={item.id} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    paddingTop: 8,
    backgroundColor: colors.frame,
    borderTopWidth: 1,
    borderTopColor: colors.frameRule,
  },
  tab: {
    flex: 1,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
  },
})
