import { ScrollView, StyleSheet, Text } from 'react-native'
import { Touchable } from '@/ui/kit'
import { colors, fonts } from '@/ui/theme'

type DetailTabsProps<T extends string> = {
  activeTab: T
  label: string
  labels: Readonly<Record<T, string>>
  tabs: readonly T[]
  onChange: (tab: T) => void
}

/** Overview, Movements, Details: underlined text tabs under a detail hero. */
export function DetailTabs<T extends string>({ activeTab, label, labels, tabs, onChange }: DetailTabsProps<T>) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bar} contentContainerStyle={styles.list} role="tablist" accessibilityLabel={label}>
      {tabs.map((tab) => {
        const active = tab === activeTab
        return (
          <Touchable
            key={tab}
            role="tab"
            accessibilityState={{ selected: active }}
            onPress={() => onChange(tab)}
            style={[styles.tab, active && styles.tabActive]}
          >
            <Text style={[styles.label, active && { color: colors.ink }]}>{labels[tab]}</Text>
          </Touchable>
        )
      })}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  bar: {
    flexGrow: 0,
    marginTop: 26,
    marginBottom: 28,
    borderBottomWidth: 1,
    borderBottomColor: colors.rule,
  },
  list: {
    gap: 30,
  },
  tab: {
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    marginBottom: -1,
  },
  tabActive: {
    borderBottomColor: colors.gilt,
  },
  label: {
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.umber,
  },
})
