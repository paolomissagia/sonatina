import { Image } from 'expo-image'
import { X } from '@/ui/icons'
import { useState } from 'react'
import { Linking, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { assetCredits, catalogAssets, type CatalogAssetKey } from '@/assets/catalog-assets'
import { t } from '@/i18n'
import { IconButton, Touchable } from '@/ui/kit'
import { alpha, colors, fonts } from '@/ui/theme'

/**
 * The full, uncropped artwork, served from the archive like the recordings. Commons only
 * scales to fixed widths, so phones get the smaller file.
 */
function fullImage(source: string, screenWidth: number) {
  const file = source.split('/wiki/File:')[1]
  return file ? `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${screenWidth > 1280 ? 1920 : 1280}` : undefined
}

type ImageCreditProps = {
  asset: CatalogAssetKey
  /** Hide the artwork's title on narrow images, leaving the artist and year. */
  short?: boolean
}

/**
 * Credit pill for a public-domain image. It opens the artwork in a viewer rather than leaving
 * the app; the source is one link away inside it.
 */
export function ImageCredit({ asset, short = false }: ImageCreditProps) {
  const credit = assetCredits[asset]
  const [open, setOpen] = useState(false)
  const [failed, setFailed] = useState(false)
  const { width } = useWindowDimensions()
  const insets = useSafeAreaInsets()

  if (!credit) {
    return null
  }

  const name = credit.title ?? t('image_portrait')
  const full = fullImage(credit.source, width)

  return (
    <>
      <Touchable
        accessibilityLabel={`${name}, ${credit.artist}, ${credit.year}`}
        accessibilityHint={t('image_source')}
        onPress={() => setOpen(true)}
        style={styles.pill}
      >
        <Text style={styles.pillLabel} numberOfLines={1}>
          {credit.title ? (short ? '' : `${credit.title} - `) : `${t('image_portrait')}: `}
          {credit.artist}, {credit.year}
        </Text>
      </Touchable>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)} statusBarTranslucent>
        <View style={[styles.viewer, { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 }]}>
          {/* A tap on the backdrop closes the viewer. */}
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setOpen(false)} accessibilityLabel={t('close')} />
          <Image
            style={styles.artwork}
            source={failed || !full ? catalogAssets[asset] : { uri: full }}
            placeholder={catalogAssets[asset]}
            contentFit="contain"
            transition={200}
            accessibilityLabel={
              credit.title ? t('image_title_by', { title: credit.title, artist: credit.artist }) : t('image_portrait_by', { artist: credit.artist })
            }
            onError={() => setFailed(true)}
          />
          <View style={styles.caption}>
            <Text style={styles.captionText}>
              <Text style={styles.captionName}>{name}</Text> {credit.artist}, {credit.year}
            </Text>
            <Text style={styles.source} role="link" onPress={() => void Linking.openURL(credit.source)}>
              {t('image_source')}
            </Text>
          </View>
          <IconButton
            icon={X}
            label={t('close')}
            color={colors.onImage}
            onPress={() => setOpen(false)}
            style={[styles.close, { top: insets.top + 12 }]}
          />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  pill: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    maxWidth: '80%',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: alpha('scrim', 0.55),
  },
  pillLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: alpha('onImage', 0.9),
  },
  viewer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: alpha('scrim', 0.94),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  artwork: {
    width: '100%',
    flex: 1,
  },
  caption: {
    maxWidth: 720,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 12,
  },
  captionText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.onImageSoft,
    textAlign: 'center',
  },
  captionName: {
    fontFamily: fonts.bodySemibold,
    color: colors.onImage,
  },
  source: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.frameGilt,
    textDecorationLine: 'underline',
  },
  close: {
    position: 'absolute',
    right: 16,
    backgroundColor: alpha('scrim', 0.5),
  },
})
