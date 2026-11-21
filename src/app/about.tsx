import { BookOpen, Music2, UsersRound } from '@/ui/icons'
import { Linking, StyleSheet, Text, View } from 'react-native'
import { ImageCredit } from '@/components/image-credit'
import { LanguageChips } from '@/components/language-picker'
import { Screen } from '@/components/screen'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { cardStyle, CatalogImage, Grid, PageTitle, SectionHeading, titleOf } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { colors, fonts, radius, type } from '@/ui/theme'

export default function AboutScreen() {
  useLanguage()
  const { wide, compact } = useLayout()
  const principles = [
    { title: t('about_discover'), description: t('about_discover_text'), icon: UsersRound },
    { title: t('about_understand'), description: t('about_understand_text'), icon: BookOpen },
    { title: t('about_enjoy'), description: t('about_enjoy_text'), icon: Music2 },
  ]

  return (
    <Screen header="back">
      <PageTitle title={titleOf(t('nav_about'))} />
      <View style={styles.header}>
        <Text style={type.kicker}>{t('about_kicker')}</Text>
        <Text role="heading" aria-level={1} style={[styles.title, compact && { fontSize: 40, lineHeight: 44 }]}>
          {t('about_heading')} <Text style={type.emphasis}>{t('about_heading_em')}</Text>
        </Text>
        <Text style={type.body}>{t('about_intro')}</Text>
      </View>

      <Grid minColumnWidth={240} maxColumns={3} gap={16}>
        {principles.map(({ title, description, icon: Icon }) => (
          <View key={title} style={styles.principle}>
            <View style={styles.principleIcon}>
              <Icon size={24} color={colors.gilt} strokeWidth={1.8} />
            </View>
            <Text role="heading" style={[type.heading, { fontSize: 19 }]}>
              {title}
            </Text>
            <Text style={type.small}>{description}</Text>
          </View>
        ))}
      </Grid>

      <View style={styles.mission}>
        <SectionHeading title={t('about_mission')} />
        <Text style={type.body}>{t('about_mission_text')}</Text>
      </View>

      <View style={[styles.quote, wide && styles.quoteWide]}>
        <View style={[styles.quoteImage, wide && { flex: 1 }]}>
          <CatalogImage asset="concertAtSanssouci" style={StyleSheet.absoluteFill} />
          <ImageCredit asset="concertAtSanssouci" short={compact} />
        </View>
        <View style={[styles.quoteCopy, wide && { flex: 1 }]}>
          <Text style={styles.quoteText}>“{t('about_quote')}”</Text>
          <Text style={styles.quoteAuthor}>Victor Hugo</Text>
        </View>
      </View>

      {/* On phones the language choice lives here; wide windows have it in the sidebar. */}
      {!wide ? (
        <View style={styles.mission}>
          <SectionHeading title={t('language')} />
          <LanguageChips />
          <Text style={[type.small, { marginTop: 16 }]}>
            {t('made_by')}{' '}
            <Text style={styles.link} role="link" onPress={() => void Linking.openURL('https://www.paolomissagia.com')}>
              Paolo Missagia
            </Text>
          </Text>
        </View>
      ) : null}
    </Screen>
  )
}

const styles = StyleSheet.create({
  header: {
    maxWidth: 760,
    gap: 12,
    marginVertical: 24,
  },
  title: {
    ...type.display,
    fontSize: 56,
    lineHeight: 58,
  },
  principle: {
    ...cardStyle,
    flex: 1,
    padding: 22,
    gap: 10,
  },
  principleIcon: {
    width: 48,
    height: 48,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.linen,
  },
  mission: {
    maxWidth: 760,
    marginTop: 44,
    gap: 12,
  },
  quote: {
    ...cardStyle,
    marginTop: 44,
  },
  quoteWide: {
    flexDirection: 'row',
  },
  quoteImage: {
    minHeight: 280,
    backgroundColor: colors.linen,
    borderRadius: radius,
    overflow: 'hidden',
  },
  quoteCopy: {
    padding: 32,
    justifyContent: 'center',
    gap: 14,
  },
  quoteText: {
    fontFamily: fonts.displayItalic,
    fontSize: 28,
    lineHeight: 36,
    color: colors.ink,
  },
  quoteAuthor: {
    ...type.kicker,
  },
  link: {
    color: colors.gilt,
    textDecorationLine: 'underline',
  },
})
