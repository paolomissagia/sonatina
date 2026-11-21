import Slider from '@react-native-community/slider'
import {
  Pause,
  Play,
  Radio,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
} from '@/ui/icons'
import { useState } from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { getComposerName } from '@/data/composers'
import { t } from '@/i18n'
import { formatTime, usePlayer } from '@/player/player-context'
import { toRoman } from '@/player/roman'
import { useLanguage } from '@/state/language'
import { IconButton, Touchable } from '@/ui/kit'
import { useLayout } from '@/ui/layout'
import { alpha, colors, fonts } from '@/ui/theme'

/** The track's place in the work, scrubbable. The thumb follows your finger until you let go. */
function Progress() {
  const { time, duration, seek } = usePlayer()
  const [scrub, setScrub] = useState<number | null>(null)
  const shown = scrub ?? Math.min(time, duration || 0)

  return (
    <View style={styles.progress}>
      <Text style={styles.time}>{formatTime(shown)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={shown}
        step={1}
        disabled={!duration}
        minimumTrackTintColor={colors.frameGilt}
        maximumTrackTintColor={alpha('frameInk', 0.25)}
        thumbTintColor={colors.frameGilt}
        accessibilityLabel={t('player_seek')}
        accessibilityValue={{ text: t('player_seek_value', { time: formatTime(shown), duration: formatTime(duration) }) }}
        onValueChange={setScrub}
        onSlidingComplete={(value) => {
          seek(value)
          setScrub(null)
        }}
      />
      <Text style={styles.time}>{formatTime(duration)}</Text>
    </View>
  )
}

/** "Now playing", part of the dark frame, at the foot of every screen while a recording is loaded. */
export function PlayerBar() {
  useLanguage()
  const player = usePlayer()
  const { wide } = useLayout()
  const { work, recording, index, last, playing, error, station, shuffle, repeat, volume, muted } = player

  if (!work || !recording) {
    return null
  }

  const track = recording.tracks[index]
  const label = work.movements.length > 1 ? `${toRoman(track.movement + 1)}. ${track.title}` : track.title
  const repeatLabel = { off: t('player_repeat_off'), work: t('player_repeat_work'), track: t('player_repeat_track') }[repeat]
  const nextDisabled = index >= last && !station && !shuffle

  const playButton = (
    <Touchable
      accessibilityLabel={playing ? t('pause') : t('play')}
      onPress={player.toggle}
      style={({ hovered, pressed }) => [styles.play, (hovered || pressed) && { opacity: 0.88 }]}
    >
      {playing ? <Pause size={18} color={colors.frameDeep} fill={colors.frameDeep} /> : <Play size={18} color={colors.frameDeep} fill={colors.frameDeep} />}
    </Touchable>
  )

  const modes = (
    <>
      <IconButton
        icon={Shuffle}
        label={shuffle ? t('player_shuffle_on') : t('player_shuffle')}
        active={shuffle}
        color={shuffle ? colors.frameGilt : colors.frameMuted}
        size={16}
        onPress={player.toggleShuffle}
      />
      <IconButton
        icon={repeat === 'track' ? Repeat1 : Repeat}
        label={repeatLabel}
        active={repeat !== 'off'}
        color={repeat === 'off' ? colors.frameMuted : colors.frameGilt}
        size={16}
        onPress={player.cycleRepeat}
      />
    </>
  )

  const info = (
    <View style={styles.info}>
      {station ? (
        <Touchable href="/radio" style={styles.station}>
          <Radio size={12} color={colors.frameGilt} />
          <Text style={styles.stationLabel} numberOfLines={1}>
            {t('player_station', { station: station.name })}
          </Text>
        </Touchable>
      ) : null}
      <Touchable href={`/works/${work.id}`}>
        <Text style={styles.work} numberOfLines={1}>
          {work.title} <Text style={styles.composer}>· {getComposerName(work.composerId)}</Text>
        </Text>
      </Touchable>
      <Text style={styles.track} numberOfLines={1}>
        {error ? t('player_error') : label}
      </Text>
    </View>
  )

  const close = (
    <IconButton icon={X} label={t('player_close')} color={colors.frameMuted} size={16} onPress={player.close} />
  )

  if (!wide) {
    return (
      <View style={styles.compact} role="region" accessibilityLabel={t('player_label')}>
        <View style={styles.compactRow}>
          {info}
          {playButton}
          <IconButton icon={SkipForward} label={t('player_next')} color={colors.frameInk} size={18} disabled={nextDisabled} onPress={player.next} />
          {close}
        </View>
        <View style={styles.compactRow}>
          <Progress />
          {modes}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.bar} role="region" accessibilityLabel={t('player_label')}>
      <View style={styles.group}>
        <IconButton icon={SkipBack} label={t('player_previous')} color={colors.frameInk} size={17} onPress={player.previous} />
        {playButton}
        <IconButton icon={SkipForward} label={t('player_next')} color={colors.frameInk} size={17} disabled={nextDisabled} onPress={player.next} />
      </View>
      <View style={styles.group}>{modes}</View>
      {info}
      <View style={styles.progressWide}>
        <Progress />
      </View>
      {/* Phones and iOS browsers use the device's own volume buttons. */}
      {Platform.OS === 'web' ? (
        <View style={styles.group}>
          <IconButton
            icon={muted || volume === 0 ? VolumeX : Volume2}
            label={muted ? t('player_unmute') : t('player_mute')}
            color={colors.frameMuted}
            size={16}
            onPress={player.toggleMute}
          />
          <Slider
            style={styles.volume}
            minimumValue={0}
            maximumValue={1}
            step={0.05}
            value={muted ? 0 : volume}
            minimumTrackTintColor={colors.frameMuted}
            maximumTrackTintColor={alpha('frameInk', 0.25)}
            thumbTintColor={colors.frameInk}
            accessibilityLabel={t('player_volume')}
            onValueChange={player.setVolume}
          />
        </View>
      ) : null}
      {close}
    </View>
  )
}

const styles = StyleSheet.create({
  bar: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: colors.frame,
    borderTopWidth: 1,
    borderTopColor: colors.frameRule,
  },
  compact: {
    paddingTop: 10,
    paddingHorizontal: 14,
    gap: 2,
    backgroundColor: colors.frame,
    borderTopWidth: 1,
    borderTopColor: colors.frameRule,
  },
  compactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  play: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.frameGilt,
  },
  info: {
    flex: 1.2,
    minWidth: 0,
    gap: 1,
  },
  station: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  stationLabel: {
    fontFamily: fonts.bodyBold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.frameGilt,
  },
  work: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.frameInk,
  },
  composer: {
    fontFamily: fonts.body,
    color: colors.frameMuted,
  },
  track: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.frameMuted,
  },
  progressWide: {
    flex: 1.4,
    minWidth: 0,
  },
  progress: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  slider: {
    flex: 1,
    height: 36,
  },
  time: {
    minWidth: 36,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.frameMuted,
    fontVariant: ['tabular-nums'],
    textAlign: 'center',
  },
  volume: {
    width: 96,
    height: 36,
  },
})
