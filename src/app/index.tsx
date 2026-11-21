import { LinearGradient } from 'expo-linear-gradient'
import type { Href } from 'expo-router'
import { CalendarDays, Clock3, Disc3, Radio } from '@/ui/icons'
import { StyleSheet, Text, View } from 'react-native'
import { ImageCredit } from '@/components/image-credit'
import { Screen } from '@/components/screen'
import { exploreCategories } from '@/data/explore-categories'
import { editorPicks } from '@/data/home'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { Button, cardStyle, CatalogImage, Grid, PageTitle, SectionHeading, Touchable } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { alpha, colors, fonts, radius, shadow } from '@/ui/theme'

function HomeHero() {
  const { compact, wide } = useLayout()
  const size = compact ? 48 : wide ? 76 : 62

  return (
    <View style={[styles.hero, { minHeight: compact ? 480 : 430 }]}>
      <CatalogImage asset="burgtheaterAuditorium" style={StyleSheet.absoluteFill} contentPosition="right center" />
      {/* The house lights down: the painting glows through a deep overlay behind the headline. */}
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={[alpha('frameDeep', 0.94), alpha('frameDeep', 0.7), alpha('frameDeep', 0.15)]}
        locations={[0, 0.45, 1]}
        start={compact ? { x: 0.5, y: 1 } : { x: 0, y: 0.5 }}
        end={compact ? { x: 0.5, y: 0 } : { x: 1, y: 0.5 }}
        pointerEvents="none"
      />
      <ImageCredit asset="burgtheaterAuditorium" short={compact} />
      <View style={[styles.heroCopy, compact ? styles.heroCopyCompact : styles.heroCopyWide]}>
        <Text role="heading" aria-level={1} style={[styles.heroTitle, { fontSize: size, lineHeight: size * 0.98 }]}>
          {t('home_hero_discover')}
          {'\n'}
          {t('home_hero_world')}
          {'\n'}
          <Text style={styles.heroEmphasis}>{t('home_hero_music')}</Text>
        </Text>
        <Text style={styles.heroText}>{t('home_hero_text')}</Text>
        <View style={styles.heroActions}>
          <Button label={t('home_start')} href="/works" tone="gilt" />
          <Button label={t('home_radio')} icon={Radio} href="/radio" tone="outline-frame" />
        </View>
      </View>
    </View>
  )
}

export default function DiscoverScreen() {
  useLanguage()

  return (
    <Screen>
      <PageTitle title={t('home_title')} />
      <HomeHero />

      <View style={styles.section}>
        <SectionHeading title={t('home_explore')} />
        <Grid minColumnWidth={220} gap={16}>
          {exploreCategories.map((category) => (
            <Touchable
              key={category.to}
              href={category.to as Href}
              style={({ hovered, pressed }) => [styles.category, (hovered || pressed) && { opacity: 0.94 }]}
            >
              <CatalogImage asset={category.asset} style={StyleSheet.absoluteFill} />
              <LinearGradient
                style={StyleSheet.absoluteFill}
                colors={[alpha('scrim', 0.78), alpha('scrim', 0.2)]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                pointerEvents="none"
              />
              <Text style={styles.categoryTitle}>{category.title}</Text>
              <Text style={styles.categoryText}>{category.description}</Text>
            </Touchable>
          ))}
        </Grid>
      </View>

      <View style={styles.section}>
        <SectionHeading title={t('home_picks')} />
        <Grid minColumnWidth={220} gap={18}>
          {editorPicks.map((pick) => {
            const Icon = pick.recording ? Disc3 : pick.section === 'articles' ? Clock3 : CalendarDays
            return (
              <Touchable
                key={`${pick.section}-${pick.title}`}
                href={pick.to as Href}
                style={({ hovered, pressed }) => [styles.pick, (hovered || pressed) && styles.pickLifted]}
              >
                <CatalogImage asset={pick.asset} style={styles.pickImage} contentPosition={{ top: '25%', left: '50%' }} />
                <View style={styles.pickCopy}>
                  <Text style={styles.pickType}>{pick.type}</Text>
                  <Text style={styles.pickTitle} numberOfLines={3}>
                    {pick.title}
                  </Text>
                  <Text style={styles.pickSubtitle} numberOfLines={1}>
                    {pick.subtitle}
                  </Text>
                  <View style={styles.pickMeta}>
                    <Icon size={14} color={colors.umber} />
                    <Text style={styles.pickMetaText}>{pick.meta}</Text>
                  </View>
                </View>
              </Touchable>
            )
          })}
        </Grid>
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.frameRule,
    overflow: 'hidden',
    backgroundColor: colors.frameDeep,
    ...shadow(0.2, 18),
  },
  heroCopy: {
    maxWidth: 580,
  },
  heroCopyWide: {
    paddingVertical: 60,
    paddingHorizontal: 58,
  },
  heroCopyCompact: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 22,
    paddingBottom: 48,
  },
  heroTitle: {
    fontFamily: fonts.display,
    color: colors.frameInk,
    letterSpacing: -1.6,
  },
  heroEmphasis: {
    fontFamily: fonts.displayItalic,
    color: colors.frameGilt,
  },
  heroText: {
    maxWidth: 410,
    marginTop: 22,
    marginBottom: 28,
    fontFamily: fonts.bodySemibold,
    fontSize: 17,
    lineHeight: 26,
    color: colors.frameMuted,
  },
  heroActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  section: {
    marginTop: 44,
    gap: 18,
  },
  category: {
    minHeight: 160,
    padding: 20,
    borderRadius: radius,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: colors.scrim,
    gap: 6,
  },
  categoryTitle: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: colors.onImage,
  },
  categoryText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onImageSoft,
  },
  pick: {
    ...cardStyle,
    flex: 1,
    ...shadow(0.08, 12),
  },
  pickLifted: {
    borderColor: colors.ruleStrong,
    ...shadow(0.14, 14),
  },
  pickImage: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: colors.linen,
  },
  pickCopy: {
    padding: 16,
    gap: 4,
  },
  pickType: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1.1,
    textTransform: 'uppercase',
    color: colors.gilt,
  },
  pickTitle: {
    fontFamily: fonts.display,
    fontSize: 21,
    lineHeight: 24,
    color: colors.ink,
  },
  pickSubtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.umber,
  },
  pickMeta: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pickMetaText: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.umber,
  },
})
