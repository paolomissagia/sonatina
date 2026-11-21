import type { Href } from 'expo-router'
import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { CatalogAssetKey } from '@/assets/catalog-assets'
import { cardStyle, CatalogImage, Grid, SectionHeading, Touchable } from '@/ui/kit'
import { colors, fonts, radius, shadow } from '@/ui/theme'

type CardProps = {
  asset: CatalogAssetKey
  title: string
  subtitle: string
  meta?: string
  href: Href
}

/** A catalogue card: the picture, then the title and who or what it is. */
export function CollectionCard({ asset, title, subtitle, href }: CardProps) {
  return (
    <Touchable
      href={href}
      style={({ hovered, pressed }) => [styles.collection, (hovered || pressed) && styles.lifted]}
    >
      <CatalogImage asset={asset} style={styles.collectionImage} contentPosition={{ top: '25%', left: '50%' }} />
      <Text style={styles.collectionTitle} numberOfLines={3}>
        {title}
      </Text>
      <Text style={styles.subtitle} numberOfLines={1}>
        {subtitle}
      </Text>
    </Touchable>
  )
}

/** A smaller card for "You might also like" and a composer's works. */
export function RecommendationCard({ asset, title, subtitle, meta, href }: CardProps) {
  return (
    <Touchable
      href={href}
      style={({ hovered, pressed }) => [styles.recommendation, (hovered || pressed) && styles.lifted]}
    >
      <CatalogImage asset={asset} style={styles.recommendationImage} contentPosition={{ top: '25%', left: '50%' }} />
      <View style={styles.recommendationCopy}>
        <Text style={styles.recommendationTitle} numberOfLines={3}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={2}>
          {subtitle}
        </Text>
        {meta ? <Text style={styles.meta}>{meta}</Text> : null}
      </View>
    </Touchable>
  )
}

export function RecommendationSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <View style={styles.section}>
      <SectionHeading title={title} />
      <Grid minColumnWidth={160} gap={18}>
        {children}
      </Grid>
    </View>
  )
}

const styles = StyleSheet.create({
  collection: {
    ...cardStyle,
    padding: 12,
    gap: 4,
    ...shadow(0.08, 10),
  },
  lifted: {
    borderColor: colors.ruleStrong,
    ...shadow(0.14, 14),
  },
  collectionImage: {
    width: '100%',
    aspectRatio: 16 / 10,
    borderRadius: radius - 2,
    marginBottom: 8,
    backgroundColor: colors.linen,
  },
  collectionTitle: {
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 23,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 19,
    color: colors.umber,
  },
  recommendation: {
    ...cardStyle,
    flex: 1,
    ...shadow(0.07, 10),
  },
  recommendationImage: {
    width: '100%',
    aspectRatio: 16 / 10,
    backgroundColor: colors.linen,
  },
  recommendationCopy: {
    padding: 14,
    gap: 3,
  },
  recommendationTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    lineHeight: 20,
    color: colors.ink,
  },
  meta: {
    marginTop: 4,
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.gilt,
  },
  section: {
    marginTop: 44,
    gap: 18,
  },
})
