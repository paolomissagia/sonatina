import { LinearGradient } from 'expo-linear-gradient'
import { Pause, Play } from '@/ui/icons'
import { StyleSheet, Text, View } from 'react-native'
import { Screen } from '@/components/screen'
import { getStations, type Station } from '@/data/stations'
import { t } from '@/i18n'
import { usePlayer } from '@/player/player-context'
import { useLanguage } from '@/state/language'
import { CatalogImage, Chips, Grid, PageTitle, SectionHeading, titleOf, Touchable } from '@/ui/kit'
import { alpha, colors, fonts, radius, type } from '@/ui/theme'

/** Opening the Radio never starts music on its own: playback begins when you pick a station. */
export default function RadioScreen() {
  useLanguage()
  const player = usePlayer()

  // Tapping the station that is on pauses or resumes it; any other station tunes in.
  const handleStation = (station: Station) => {
    if (player.station?.id === station.id) {
      player.toggle()
    } else {
      player.tune(station)
    }
  }
  const isOn = (station: Station) => player.station?.id === station.id && player.playing

  const chips = (title: string, label: string, stations: Station[]) => (
    <View style={styles.more}>
      <SectionHeading title={title} style={{ fontSize: 19 }} />
      <Chips
        label={label}
        items={stations.map((station) => ({
          key: station.id,
          label: station.name,
          active: player.station?.id === station.id,
          icon: isOn(station) ? Pause : Play,
          onPress: () => handleStation(station),
        }))}
      />
    </View>
  )

  return (
    <Screen>
      <PageTitle title={titleOf(t('nav_radio'))} />
      <View style={styles.intro}>
        <Text role="heading" aria-level={1} style={styles.title}>
          {t('nav_radio')}
        </Text>
        <Text style={type.body}>{t('radio_intro')}</Text>
      </View>

      <Grid minColumnWidth={220} gap={16}>
        {getStations('main').map((station) => {
          const on = isOn(station)
          const Icon = on ? Pause : Play
          return (
            <Touchable
              key={station.id}
              accessibilityState={{ selected: player.station?.id === station.id }}
              accessibilityLabel={station.name}
              onPress={() => handleStation(station)}
              style={({ hovered, pressed }) => [
                styles.station,
                player.station?.id === station.id && styles.stationActive,
                (hovered || pressed) && { opacity: 0.94 },
              ]}
            >
              <CatalogImage asset={station.asset} style={StyleSheet.absoluteFill} />
              <LinearGradient
                style={StyleSheet.absoluteFill}
                colors={[alpha('scrim', 0.82), alpha('scrim', 0.2)]}
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                pointerEvents="none"
              />
              <View style={styles.playBadge}>
                <Icon size={18} color={colors.frameDeep} fill={colors.frameDeep} />
              </View>
              <Text style={styles.stationName}>{station.name}</Text>
              <Text style={styles.stationText}>{on ? t('radio_now_playing') : station.description}</Text>
            </Touchable>
          )
        })}
      </Grid>

      {chips(t('radio_by_era'), t('radio_by_era_label'), getStations('era'))}
      {chips(t('radio_by_country'), t('radio_by_country_label'), getStations('country'))}
    </Screen>
  )
}

const styles = StyleSheet.create({
  intro: {
    maxWidth: 700,
    gap: 8,
    marginBottom: 24,
  },
  title: {
    ...type.display,
    fontSize: 40,
    lineHeight: 44,
  },
  station: {
    minHeight: 180,
    padding: 20,
    borderRadius: radius,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
    justifyContent: 'flex-end',
    backgroundColor: colors.scrim,
    gap: 6,
  },
  stationActive: {
    borderColor: colors.frameGilt,
  },
  playBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.frameGilt,
  },
  stationName: {
    fontFamily: fonts.display,
    fontSize: 28,
    color: colors.onImage,
  },
  stationText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    lineHeight: 20,
    color: colors.onImageSoft,
  },
  more: {
    marginTop: 36,
    gap: 14,
  },
})
