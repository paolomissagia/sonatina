import { Link, useLocalSearchParams, type Href } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RecommendationCard, RecommendationSection } from '@/components/cards'
import { DetailHero } from '@/components/detail-hero'
import { DetailTabs } from '@/components/detail-tabs'
import { NotFound } from '@/components/not-found'
import { Screen } from '@/components/screen'
import { findComposer, formatLifespan, getRecommendedComposers } from '@/data/composers'
import { findEra } from '@/data/eras'
import { getWorkAsset, getWorksByComposer } from '@/data/works'
import { labels, periodLabels, t } from '@/i18n'
import type { Composer } from '@/models/composer'
import { useLanguage } from '@/state/language'
import { cardStyle, PageTitle, titleOf, Touchable } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { colors, fonts, type } from '@/ui/theme'

const tabs = ['overview', 'works'] as const
type ComposerTab = (typeof tabs)[number]
const tabLabels = labels<ComposerTab>({ overview: 'tab_overview', works: 'tab_works' })

function ComposerPage({ composer }: { composer: Composer }) {
  useLanguage()
  const { wide } = useLayout()
  const [activeTab, setActiveTab] = useState<ComposerTab>('overview')
  const works = getWorksByComposer(composer.id)
  const essential = works.slice(0, 4)
  const era = findEra(composer.period.toLowerCase())
  const period = periodLabels[composer.period]
  const facts = [
    { label: t('composer_born'), value: `${composer.born.year}, ${composer.born.place}` },
    { label: t('composer_died'), value: `${composer.died.year}, ${composer.died.place}` },
    { label: t('composer_nationality'), value: composer.nationality },
    {
      label: t('composer_period'),
      value: era ? (
        <Link href={`/composers?era=${era.id}` as Href} style={styles.factLink}>
          {period}
        </Link>
      ) : (
        period
      ),
    },
    { label: t('composer_known_for'), value: composer.knownFor.join(', ') },
  ]

  return (
    <Screen header="back">
      <PageTitle title={titleOf(composer.name)} />
      <DetailHero
        asset={composer.asset}
        portrait
        imageLabel={t('composer_portrait', { name: composer.name })}
        breadcrumb={[{ label: t('nav_composers'), href: '/composers' }, { label: composer.name }]}
        title={composer.name}
        subtitle={formatLifespan(composer)}
        quote={composer.quote}
        facts={facts}
        factsTitle={t('composer_facts')}
      />

      <DetailTabs activeTab={activeTab} label={t('sections_label', { title: composer.name })} labels={tabLabels} tabs={tabs} onChange={setActiveTab} />

      {activeTab === 'overview' ? (
        <>
          <View style={[styles.grid, wide && styles.gridWide]}>
            <View style={[styles.overview, wide && { flex: 1.3 }]}>
              <Text role="heading" style={type.heading}>
                {t('composer_about', { name: composer.shortName })}
              </Text>
              <Text style={type.body}>{composer.overview}</Text>
            </View>

            <View style={[styles.essential, wide && { flex: 1 }]}>
              <View style={styles.essentialHeading}>
                <Text role="heading" style={[type.heading, { fontSize: 19 }]}>
                  {t('composer_essential')}
                </Text>
                {works.length > essential.length ? (
                  <Touchable onPress={() => setActiveTab('works')}>
                    <Text style={styles.textAction}>{t('view_all')}</Text>
                  </Touchable>
                ) : null}
              </View>
              {essential.length > 0 ? (
                essential.map((work) => (
                  <Touchable
                    key={work.id}
                    href={`/works/${work.id}` as Href}
                    style={({ hovered, pressed }) => [styles.workRow, (hovered || pressed) && { backgroundColor: colors.linen }]}
                  >
                    <Text style={styles.workArrow}>›</Text>
                    <Text style={styles.workTitle}>{work.title}</Text>
                    <Text style={styles.workYear}>{work.composed}</Text>
                  </Touchable>
                ))
              ) : (
                <Text style={type.small}>{t('composer_no_works')}</Text>
              )}
            </View>
          </View>

          <RecommendationSection title={t('composer_recommended')}>
            {getRecommendedComposers(composer).map((other) => (
              <RecommendationCard
                key={other.id}
                asset={other.asset}
                title={other.name}
                subtitle={periodLabels[other.period]}
                meta={formatLifespan(other)}
                href={`/composers/${other.id}` as Href}
              />
            ))}
          </RecommendationSection>
        </>
      ) : works.length > 0 ? (
        <RecommendationSection title={t('composer_works_by', { name: composer.name })}>
          {works.map((work) => (
            <RecommendationCard
              key={work.id}
              asset={getWorkAsset(work)}
              title={work.title}
              subtitle={work.form}
              meta={work.composed}
              href={`/works/${work.id}` as Href}
            />
          ))}
        </RecommendationSection>
      ) : (
        <Text style={type.small}>{t('composer_no_works')}</Text>
      )}
    </Screen>
  )
}

export default function ComposerScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const composer = findComposer(id)
  return composer ? <ComposerPage composer={composer} key={composer.id} /> : <NotFound />
}

const styles = StyleSheet.create({
  factLink: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    lineHeight: 20,
    color: colors.gilt,
    textDecorationLine: 'underline',
  },
  grid: {
    gap: 28,
  },
  gridWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
  },
  overview: {
    gap: 12,
  },
  essential: {
    ...cardStyle,
    padding: 22,
    paddingBottom: 10,
  },
  essentialHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  textAction: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.gilt,
  },
  workRow: {
    minHeight: 48,
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  workArrow: {
    fontFamily: fonts.bodySemibold,
    fontSize: 16,
    color: colors.giltLight,
  },
  workTitle: {
    flex: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.ink,
  },
  workYear: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.umber,
  },
})
