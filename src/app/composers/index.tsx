import { router, useLocalSearchParams, type Href } from 'expo-router'
import { Radio } from '@/ui/icons'
import { StyleSheet, Text, View } from 'react-native'
import { CollectionScreen } from '@/components/collection-screen'
import { catalogPageMeta, getCatalogItems } from '@/data/catalog'
import { eras, findEra, getComposersByEra, getEraArticle, getEraStation } from '@/data/eras'
import { periodLabels, t } from '@/i18n'
import { usePlayer } from '@/player/player-context'
import { useLanguage } from '@/state/language'
import { Button, Chips, Touchable } from '@/ui/kit'
import { colors, fonts, type } from '@/ui/theme'

/** All composers, or one era's as a timeline: `/composers?era=baroque`. */
export default function ComposersScreen() {
  useLanguage()
  const player = usePlayer()
  const { era: eraId } = useLocalSearchParams<{ era?: string }>()
  const era = findEra(typeof eraId === 'string' ? eraId : undefined)
  const article = era ? getEraArticle(era) : undefined
  const station = era ? getEraStation(era) : undefined
  const all = getCatalogItems('composers')
  // Within an era, composers are listed oldest first, so the list reads as a timeline.
  const items = era ? getComposersByEra(era).flatMap((composer) => all.filter((item) => item.id === composer.id)) : all

  return (
    <CollectionScreen
      section="composers"
      title={catalogPageMeta.composers.title}
      description={catalogPageMeta.composers.description}
      items={items}
    >
      <Chips
        label={t('composers_filter_label')}
        items={[
          { key: 'all', label: t('filter_all'), active: !era, onPress: () => router.setParams({ era: undefined }) },
          ...eras.map((option) => ({
            key: option.id,
            label: periodLabels[option.period],
            active: era?.id === option.id,
            onPress: () => router.setParams({ era: option.id }),
          })),
        ]}
      />
      {era ? (
        <View style={styles.era}>
          {article ? <Text style={type.body}>{article.description}</Text> : null}
          <View style={styles.actions}>
            {station ? (
              <Button icon={Radio} label={t('era_radio', { period: periodLabels[era.period] })} onPress={() => player.tune(station)} />
            ) : null}
            {article ? (
              <Touchable href={`/articles/${article.id}` as Href}>
                <Text style={styles.link}>{t('era_article')}</Text>
              </Touchable>
            ) : null}
          </View>
        </View>
      ) : null}
    </CollectionScreen>
  )
}

const styles = StyleSheet.create({
  era: {
    maxWidth: 700,
    gap: 14,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 20,
  },
  link: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.gilt,
    textDecorationLine: 'underline',
  },
})
