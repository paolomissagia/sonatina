import { router, useLocalSearchParams, type Href } from 'expo-router'
import { Search as SearchIcon } from '@/ui/icons'
import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Screen } from '@/components/screen'
import { catalogPageMeta } from '@/data/catalog'
import { searchCatalog, searchCategories, type SearchResult } from '@/data/search'
import { t } from '@/i18n'
import type { CatalogSection } from '@/models/catalog'
import { useLanguage } from '@/state/language'
import { cardStyle, CatalogImage, Chips, PageTitle, SectionHeading, titleOf, Touchable } from '@/ui/kit'
import { alpha, colors, fonts, radius, type } from '@/ui/theme'

const previewLimit = 3

function ResultRow({ result }: { result: SearchResult }) {
  return (
    <Touchable
      href={`/${result.category}/${result.id}` as Href}
      style={({ hovered, pressed }) => [styles.row, (hovered || pressed) && { backgroundColor: colors.linen }]}
    >
      <CatalogImage asset={result.asset} style={styles.thumb} contentPosition={{ top: '25%', left: '50%' }} />
      <View style={styles.rowCopy}>
        <Text style={styles.rowTitle} numberOfLines={2}>
          {result.title}
        </Text>
        <Text style={type.small} numberOfLines={1}>
          {result.subtitle}
          {result.meta ? ` · ${result.meta}` : ''}
        </Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </Touchable>
  )
}

function Results({ query }: { query: string }) {
  const [active, setActive] = useState<CatalogSection | 'all'>('all')
  const results = searchCatalog(query)
  const groups = searchCategories.map((category) => ({ category, results: results.filter((result) => result.category === category) }))
  const visible = active === 'all' ? groups : groups.filter((group) => group.category === active)
  const count = visible.reduce((sum, group) => sum + group.results.length, 0)

  return (
    <View style={styles.results}>
      <SectionHeading title={t('search_results_for', { query })} />
      <Chips
        label={t('search_categories_label')}
        items={[
          { key: 'all', label: `${t('filter_all')} (${results.length})`, active: active === 'all', onPress: () => setActive('all') },
          ...groups.map(({ category, results: inCategory }) => ({
            key: category,
            label: `${catalogPageMeta[category].title} (${inCategory.length})`,
            active: active === category,
            onPress: () => setActive(category),
          })),
        ]}
      />

      {count === 0 ? (
        <View style={styles.empty}>
          <Text style={type.heading}>{t('search_none_title')}</Text>
          <Text style={type.body}>{t('search_none_text')}</Text>
        </View>
      ) : (
        visible.map(({ category, results: inCategory }) => {
          if (inCategory.length === 0) {
            return null
          }
          const preview = active === 'all' && inCategory.length > previewLimit
          return (
            <View key={category} style={styles.group}>
              <View style={styles.groupHeading}>
                <Text style={[type.heading, { fontSize: 19 }]}>{catalogPageMeta[category].title}</Text>
                {preview ? (
                  <Touchable onPress={() => setActive(category)}>
                    <Text style={styles.viewAll}>
                      {t('view_all')} ({inCategory.length})
                    </Text>
                  </Touchable>
                ) : null}
              </View>
              <View style={styles.list}>
                {(preview ? inCategory.slice(0, previewLimit) : inCategory).map((result) => (
                  <ResultRow key={`${result.category}-${result.id}`} result={result} />
                ))}
              </View>
            </View>
          )
        })
      )}
    </View>
  )
}

/** Search across works, composers and articles: `/search?q=moonlight`. */
export default function SearchScreen() {
  useLanguage()
  const { q } = useLocalSearchParams<{ q?: string }>()
  const query = typeof q === 'string' ? q : ''
  const trimmed = query.trim()

  return (
    <Screen header="back">
      <PageTitle title={titleOf(trimmed ? t('search_query_title', { query: trimmed }) : t('search_title'))} />
      <View style={styles.intro}>
        <Text role="heading" aria-level={1} style={styles.title}>
          {t('search_title')}
        </Text>
        <Text style={type.body}>{t('search_intro')}</Text>
      </View>

      <View style={styles.field}>
        <SearchIcon size={18} color={colors.umber} />
        <TextInput
          autoFocus
          value={query}
          placeholder={t('search_placeholder')}
          placeholderTextColor={alpha('umber', 0.8)}
          accessibilityLabel={t('search_label')}
          returnKeyType="search"
          autoCorrect={false}
          enterKeyHint="search"
          inputMode="search"
          style={styles.input}
          onChangeText={(text) => router.setParams({ q: text || undefined })}
        />
      </View>

      {trimmed ? (
        <Results query={trimmed} key={trimmed} />
      ) : (
        <View style={styles.empty}>
          <Text style={type.heading}>{t('search_empty_title')}</Text>
          <Text style={type.body}>{t('search_empty_text')}</Text>
        </View>
      )}
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
  field: {
    maxWidth: 720,
    minHeight: 52,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.ruleStrong,
    backgroundColor: colors.ivory,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 50,
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.ink,
  },
  results: {
    marginTop: 32,
    gap: 18,
  },
  empty: {
    marginTop: 32,
    maxWidth: 560,
    gap: 8,
  },
  group: {
    gap: 10,
  },
  groupHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewAll: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.gilt,
  },
  list: {
    ...cardStyle,
  },
  row: {
    minHeight: 72,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  thumb: {
    width: 64,
    height: 48,
    borderRadius: radius - 3,
    backgroundColor: colors.linen,
  },
  rowCopy: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.ink,
  },
  arrow: {
    fontFamily: fonts.bodySemibold,
    fontSize: 20,
    color: colors.giltLight,
  },
})
