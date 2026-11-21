import type { ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { colors, fonts, type } from '@/ui/theme'

export type FactListItem = {
  label: string
  value: ReactNode
}

/** Label and value pairs under a rule: born, died, form, instrumentation. */
export function FactList({ items, title }: { items: FactListItem[]; title?: string }) {
  return (
    <View style={styles.list}>
      {title ? (
        <Text role="heading" style={styles.title}>
          {title}
        </Text>
      ) : null}
      {items.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          {typeof item.value === 'string' ? <Text style={styles.value}>{item.value}</Text> : <View style={styles.valueBox}>{item.value}</View>}
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 8,
  },
  title: {
    ...type.kicker,
    color: colors.umber,
    marginBottom: 6,
  },
  row: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.rule,
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    width: 116,
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    lineHeight: 20,
    color: colors.umber,
  },
  value: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink,
  },
  valueBox: {
    flex: 1,
  },
})
