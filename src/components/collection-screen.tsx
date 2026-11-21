import { useScrollToTop, type Href } from 'expo-router'
import { useRef, type ReactNode } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import type { CatalogItem, CatalogSection } from '@/models/catalog'
import { PageTitle, SectionHeading, titleOf } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { breakpoints, colors, type } from '@/ui/theme'
import { CollectionCard } from './cards'
import { ScreenHeader, useScreenPadding } from './screen'

type CollectionScreenProps = {
  section: CatalogSection
  title: string
  description: string
  items: CatalogItem[]
  /** Filters and anything else between the intro and the grid. */
  children?: ReactNode
}

const gap = 20

/** A section's full list as a grid of cards. Only the rows on screen are rendered. */
export function CollectionScreen({ section, title, description, items, children }: CollectionScreenProps) {
  const { width, wide, compact } = useLayout()
  const padding = useScreenPadding()
  const ref = useRef<FlatList<CatalogItem[]>>(null)
  useScrollToTop(ref)

  // The grid's width: the window, less the sidebar and the page's side padding.
  const sides = (Number(padding.paddingLeft) || 0) + (Number(padding.paddingRight) || 0)
  const inner = Math.min(width - (wide ? 240 : 0), breakpoints.full) - sides
  const columns = compact ? (inner >= 300 ? 2 : 1) : Math.max(2, Math.min(3, Math.floor((inner + gap) / (240 + gap))))
  const cardWidth = Math.floor((inner - gap * (columns - 1)) / columns)
  const rows: CatalogItem[][] = []
  for (let at = 0; at < items.length; at += columns) {
    rows.push(items.slice(at, at + columns))
  }

  return (
    <FlatList
      ref={ref}
      style={styles.list}
      contentContainerStyle={padding}
      data={rows}
      keyExtractor={(row) => row.map((item) => item.id).join('|')}
      initialNumToRender={6}
      windowSize={7}
      ListHeaderComponent={
        <View style={styles.header}>
          <PageTitle title={titleOf(title)} />
          <ScreenHeader kind="root" />
          <View style={styles.intro}>
            <SectionHeading title={title} style={styles.title} />
            <Text style={type.body}>{description}</Text>
          </View>
          {children}
        </View>
      }
      renderItem={({ item: row }) => (
        <View style={[styles.row, { gap: compact ? 12 : gap }]}>
          {row.map((item) => (
            <View key={item.id} style={{ width: compact ? Math.floor((inner - 12 * (columns - 1)) / columns) : cardWidth }}>
              <CollectionCard asset={item.asset} title={item.title} subtitle={item.subtitle} href={`/${section}/${item.id}` as Href} />
            </View>
          ))}
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: colors.parchment,
  },
  header: {
    gap: 20,
    marginBottom: 24,
  },
  intro: {
    maxWidth: 700,
    gap: 8,
  },
  title: {
    fontFamily: type.display.fontFamily,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
})
