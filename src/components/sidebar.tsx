import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native'
import { aboutItem, navItems, radioItem, searchItem, type NavItem } from '@/data/navigation'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { Touchable } from '@/ui/kit'
import { alpha, colors, fonts } from '@/ui/theme'
import { LanguageMenu } from './language-picker'
import { Logo } from './logo'
import { navIcons, useSectionLink } from './navigation'

function SidebarLink({ item }: { item: NavItem }) {
  const { active, href, onPress } = useSectionLink(item)
  const Icon = navIcons[item.id]

  return (
    <Touchable
      href={href}
      onPress={onPress}
      accessibilityState={{ selected: active }}
      style={({ hovered }) => [
        styles.link,
        active && styles.linkActive,
        hovered && !active && { backgroundColor: alpha('frameInk', 0.05) },
      ]}
    >
      <Icon size={17} strokeWidth={1.9} color={active ? colors.frameGilt : colors.frameMuted} />
      <Text style={[styles.linkLabel, active && { color: colors.frameInk }]}>{item.label}</Text>
    </Touchable>
  )
}

/** The dark frame on wide windows: the wordmark, the sections, then Radio, Search, About and language. */
export function Sidebar() {
  useLanguage()

  return (
    <View style={styles.sidebar} role="navigation" accessibilityLabel={t('nav_primary')}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Touchable href="/" accessibilityLabel="Sonatina" style={styles.brand}>
          <Logo color={colors.frameInk} height={30} />
        </Touchable>

        <View style={styles.group} accessibilityLabel={t('nav_browse')}>
          {navItems.map((item) => (
            <SidebarLink item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.footer}>
          <SidebarLink item={radioItem} />
          <SidebarLink item={searchItem} />
          <SidebarLink item={aboutItem} />
          <LanguageMenu />
          <Text style={styles.credit}>
            {t('made_by')}{' '}
            <Text style={styles.creditLink} role="link" onPress={() => void Linking.openURL('https://www.paolomissagia.com')}>
              Paolo Missagia
            </Text>
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  sidebar: {
    width: 240,
    backgroundColor: colors.frame,
    borderRightWidth: 1,
    borderRightColor: colors.frameRule,
  },
  inner: {
    flexGrow: 1,
    paddingTop: 22,
    paddingHorizontal: 24,
    paddingBottom: 28,
    gap: 28,
  },
  brand: {
    paddingVertical: 4,
  },
  group: {
    gap: 2,
  },
  footer: {
    marginTop: 'auto',
    gap: 2,
  },
  link: {
    minHeight: 40,
    paddingHorizontal: 10,
    marginHorizontal: -10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkActive: {
    backgroundColor: alpha('frameInk', 0.08),
  },
  linkLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.frameMuted,
  },
  credit: {
    marginTop: 14,
    fontFamily: fonts.body,
    fontSize: 12,
    color: alpha('frameMuted', 0.7),
  },
  creditLink: {
    color: colors.frameMuted,
    textDecorationLine: 'underline',
  },
})
