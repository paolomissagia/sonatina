import type { Href } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Screen } from '@/components/screen'
import { articles, getReadTime } from '@/data/articles'
import { articleCategoryLabels, t } from '@/i18n'
import { articleCategories, type ArticleCategory } from '@/models/article'
import { useLanguage } from '@/state/language'
import { cardStyle, CatalogImage, Chips, PageTitle, titleOf, Touchable } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { colors, fonts, radius, shadow, type } from '@/ui/theme'

export default function ArticlesScreen() {
  useLanguage()
  const { compact } = useLayout()
  const [filter, setFilter] = useState<ArticleCategory>()
  const visible = filter ? articles.filter((article) => article.category === filter) : articles

  return (
    <Screen>
      <PageTitle title={titleOf(t('nav_articles'))} />
      <View style={styles.intro}>
        <Text role="heading" aria-level={1} style={styles.title}>
          {t('nav_articles')}
        </Text>
        <Text style={type.body}>{t('articles_page_intro')}</Text>
      </View>

      <Chips
        label={t('articles_filter_label')}
        items={[
          { key: 'all', label: t('filter_all'), active: !filter, onPress: () => setFilter(undefined) },
          ...articleCategories.map((category) => ({
            key: category,
            label: articleCategoryLabels[category],
            active: category === filter,
            onPress: () => setFilter(category),
          })),
        ]}
      />

      <View style={styles.list}>
        {visible.map((article) => (
          <Touchable
            key={article.id}
            href={`/articles/${article.id}` as Href}
            style={({ hovered, pressed }) => [styles.row, compact && styles.rowCompact, (hovered || pressed) && styles.rowLifted]}
          >
            <CatalogImage asset={article.asset} style={compact ? styles.imageCompact : styles.image} />
            <View style={styles.copy}>
              <Text style={type.kicker}>{articleCategoryLabels[article.category]}</Text>
              <Text role="heading" style={styles.rowTitle}>
                {article.title}
              </Text>
              <Text style={type.small} numberOfLines={3}>
                {article.description}
              </Text>
              <Text style={styles.readTime}>{getReadTime(article)}</Text>
            </View>
          </Touchable>
        ))}
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  intro: {
    maxWidth: 700,
    gap: 8,
    marginBottom: 20,
  },
  title: {
    ...type.display,
    fontSize: 40,
    lineHeight: 44,
  },
  list: {
    marginTop: 26,
    gap: 16,
  },
  row: {
    ...cardStyle,
    padding: 14,
    flexDirection: 'row',
    gap: 20,
    ...shadow(0.07, 10),
  },
  rowCompact: {
    flexDirection: 'column',
    gap: 12,
  },
  rowLifted: {
    borderColor: colors.ruleStrong,
  },
  image: {
    width: 240,
    aspectRatio: 16 / 10,
    borderRadius: radius - 2,
    backgroundColor: colors.linen,
  },
  imageCompact: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: radius - 2,
    backgroundColor: colors.linen,
  },
  copy: {
    flex: 1,
    gap: 6,
    justifyContent: 'center',
  },
  rowTitle: {
    fontFamily: fonts.display,
    fontSize: 24,
    lineHeight: 28,
    color: colors.ink,
  },
  readTime: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.gilt,
  },
})
