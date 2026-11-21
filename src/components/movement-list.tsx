import { Pause, Play } from '@/ui/icons'
import { StyleSheet, Text, View } from 'react-native'
import { t } from '@/i18n'
import type { Movement } from '@/models/work'
import { toRoman } from '@/player/roman'
import { cardStyle, Touchable } from '@/ui/kit'
import { alpha, colors, fonts, type } from '@/ui/theme'

type MovementListProps = {
  movements: Movement[]
  title: string
  /** Movements that have a recording; their rows play it, with the icon at the end so numerals stay aligned. */
  playable?: Set<number>
  /** The movement now playing, if it belongs to this work. */
  activeMovement?: number
  playing?: boolean
  onPlay?: (movement: number) => void
}

/** Roman-numeral movement lists: "I. Allegro con brio". Names only, no notes. */
export function MovementList({ activeMovement, movements, onPlay, playable, playing, title }: MovementListProps) {
  return (
    <View style={styles.card}>
      <Text role="heading" style={styles.title}>
        {title}
      </Text>
      {movements.map((movement, index) => {
        const numeral = `${toRoman(index + 1)}.`
        const active = activeMovement === index
        const canPlay = Boolean(onPlay && playable?.has(index))
        const Icon = active && playing ? Pause : Play
        const content = (
          <>
            <Text style={styles.numeral}>{numeral}</Text>
            <Text style={[styles.name, active && { color: colors.gilt }]}>{movement.title}</Text>
            {canPlay ? <Icon size={13} color={active ? colors.gilt : colors.umber} fill={active ? colors.gilt : 'transparent'} /> : null}
          </>
        )

        return canPlay ? (
          <Touchable
            key={`${index}-${movement.title}`}
            accessibilityLabel={t(active && playing ? 'movement_pause' : 'movement_play', { movement: `${numeral} ${movement.title}` })}
            onPress={() => onPlay?.(index)}
            style={({ hovered, pressed }) => [styles.row, (active || hovered || pressed) && styles.rowActive]}
          >
            {content}
          </Touchable>
        ) : (
          <View key={`${index}-${movement.title}`} style={styles.row}>
            {content}
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    ...cardStyle,
    padding: 22,
    paddingBottom: 10,
  },
  title: {
    ...type.heading,
    fontSize: 19,
    marginBottom: 12,
  },
  row: {
    minHeight: 48,
    paddingHorizontal: 8,
    marginHorizontal: -8,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  rowActive: {
    backgroundColor: alpha('linen', 0.6),
  },
  numeral: {
    width: 36,
    fontFamily: fonts.display,
    fontSize: 17,
    color: colors.giltLight,
  },
  name: {
    flex: 1,
    paddingVertical: 10,
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.ink,
  },
})
