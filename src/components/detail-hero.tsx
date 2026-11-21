import { LinearGradient } from 'expo-linear-gradient'
import { Link, type Href } from 'expo-router'
import { Fragment, type ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import type { CatalogAssetKey } from '@/assets/catalog-assets'
import { t } from '@/i18n'
import type { Quote } from '@/models/composer'
import { CatalogImage } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { alpha, colors, fonts, radius, shadow, type } from '@/ui/theme'
import { FactList, type FactListItem } from './fact-list'
import { ImageCredit } from './image-credit'

type Crumb = {
  label: string
  href?: Href
}

type DetailHeroProps = {
  asset: CatalogAssetKey
  /** Portraits keep the face in frame when cropped. */
  portrait?: boolean
  imageLabel?: string
  breadcrumb: Crumb[]
  title: string
  subtitle?: string
  quote?: Quote
  description?: string
  meta?: string[]
  actions?: ReactNode
  facts?: FactListItem[]
  factsTitle?: string
}

/** Keeps keys and catalogue numbers on one line: "D major, Op. 35", never "D" then "major". */
function keepNumbersTogether(title: string) {
  return title
    .replace(/\b(Op\.|No\.|K\.|BWV|D\.|S\.|L\.|SV|WAB|Hob\.) /g, '$1 ')
    .replace(/\b([A-G](?:-flat|-sharp)?) (major|minor)\b/g, '$1 $2')
}

/**
 * The top of a work, composer or article page: the picture fades into parchment, with the
 * copy beside it on wide screens and below it on phones.
 */
export function DetailHero({
  asset,
  portrait = false,
  imageLabel,
  breadcrumb,
  title,
  subtitle,
  quote,
  description,
  meta,
  actions,
  facts,
  factsTitle,
}: DetailHeroProps) {
  const { wide, compact } = useLayout()
  const side = wide

  const image = (
    <View style={side ? styles.sideImage : [styles.topImage, { aspectRatio: compact ? (portrait ? 1.1 : 1.45) : 1.9 }]}>
      <CatalogImage
        asset={asset}
        style={StyleSheet.absoluteFill}
        contentPosition={portrait ? { top: '22%', left: '50%' } : 'center'}
        accessibilityLabel={imageLabel}
        accessible={Boolean(imageLabel)}
      />
      <LinearGradient
        style={StyleSheet.absoluteFill}
        colors={[colors.parchment, alpha('parchment', 0)]}
        start={side ? { x: 0, y: 0.5 } : { x: 0.5, y: 1 }}
        end={side ? { x: 0.45, y: 0.5 } : { x: 0.5, y: 0.55 }}
        pointerEvents="none"
      />
      <ImageCredit asset={asset} short={compact} />
    </View>
  )

  return (
    <View style={[styles.hero, side && styles.heroWide]}>
      {image}
      <View style={[styles.copy, side ? styles.copyWide : styles.copyNarrow]}>
        <View style={styles.breadcrumb} role="navigation" accessibilityLabel={t('breadcrumb')}>
          {breadcrumb.map((crumb, at) => (
            <Fragment key={`${crumb.label}-${at}`}>
              {crumb.href ? (
                <Link href={crumb.href} style={styles.crumbLink}>
                  {crumb.label}
                </Link>
              ) : (
                <Text style={styles.crumbCurrent} numberOfLines={1}>
                  {crumb.label}
                </Text>
              )}
              {at < breadcrumb.length - 1 ? (
                <Text style={styles.crumbSeparator} aria-hidden>
                  ›
                </Text>
              ) : null}
            </Fragment>
          ))}
        </View>

        <Text role="heading" aria-level={1} style={[styles.title, { fontSize: compact ? 36 : 50, lineHeight: compact ? 38 : 52 }]}>
          {keepNumbersTogether(title)}
        </Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {quote ? (
          <View style={styles.quote}>
            <Text style={styles.quoteText}>“{quote.text}”</Text>
            <Text style={styles.quoteSource}>{quote.source}</Text>
          </View>
        ) : null}
        {description ? <Text style={styles.description}>{description}</Text> : null}
        {meta && meta.length > 0 ? (
          <View style={styles.meta}>
            {meta.map((item) => (
              <Text key={item} style={styles.metaItem}>
                {item}
              </Text>
            ))}
          </View>
        ) : null}
        {actions ? <View style={styles.actions}>{actions}</View> : null}
        {facts ? <FactList items={facts} title={factsTitle} /> : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    borderWidth: 1,
    borderColor: colors.rule,
    borderRadius: radius,
    overflow: 'hidden',
    backgroundColor: colors.parchment,
    ...shadow(0.12, 18),
  },
  heroWide: {
    minHeight: 560,
  },
  sideImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '60%',
  },
  topImage: {
    width: '100%',
  },
  copy: {
    gap: 12,
  },
  copyWide: {
    width: '46%',
    maxWidth: 540,
    paddingVertical: 44,
    paddingHorizontal: 56,
  },
  copyNarrow: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    marginTop: -8,
  },
  breadcrumb: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 8,
    rowGap: 2,
  },
  crumbLink: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.gilt,
  },
  crumbCurrent: {
    flexShrink: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.umber,
  },
  crumbSeparator: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.giltLight,
  },
  title: {
    ...type.display,
    marginTop: 6,
    letterSpacing: -1,
  },
  subtitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 17,
    color: colors.umber,
  },
  quote: {
    paddingLeft: 14,
    borderLeftWidth: 2,
    borderLeftColor: colors.giltLight,
    gap: 4,
  },
  quoteText: {
    fontFamily: fonts.displayItalic,
    fontSize: 19,
    lineHeight: 25,
    color: colors.inkSoft,
  },
  quoteSource: {
    ...type.small,
  },
  description: {
    ...type.body,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: alpha('ivory', 0.8),
    borderWidth: 1,
    borderColor: colors.rule,
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.inkSoft,
    overflow: 'hidden',
  },
  actions: {
    marginTop: 6,
    gap: 10,
  },
})
