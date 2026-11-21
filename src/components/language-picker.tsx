import { Check, ChevronsUpDown, Languages } from '@/ui/icons'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { localeNames, locales, t } from '@/i18n'
import { chooseLanguage, useLanguage } from '@/state/language'
import { Touchable } from '@/ui/kit'
import { alpha, colors, fonts, radius } from '@/ui/theme'

/** The sidebar's language menu: it opens upwards from the foot of the sidebar. */
export function LanguageMenu() {
  const locale = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <View>
      {open ? (
        <View style={styles.menu} role="menu" accessibilityLabel={t('language')}>
          {locales.map((option) => (
            <Touchable
              key={option}
              role="menuitem"
              accessibilityState={{ selected: option === locale }}
              onPress={() => {
                chooseLanguage(option)
                setOpen(false)
              }}
              style={({ hovered }) => [styles.option, hovered && { backgroundColor: alpha('frameInk', 0.08) }]}
            >
              <Text style={[styles.optionLabel, option === locale && { color: colors.frameInk }]}>{localeNames[option]}</Text>
              {option === locale ? <Check size={16} color={colors.frameGilt} strokeWidth={2} /> : null}
            </Touchable>
          ))}
        </View>
      ) : null}
      <Touchable
        accessibilityLabel={`${t('language')}: ${localeNames[locale]}`}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((value) => !value)}
        style={({ hovered }) => [styles.trigger, hovered && { backgroundColor: alpha('frameInk', 0.06) }]}
      >
        <Languages size={17} color={colors.frameMuted} strokeWidth={1.9} />
        <Text style={styles.triggerLabel}>{localeNames[locale]}</Text>
        <ChevronsUpDown size={15} color={colors.frameMuted} strokeWidth={1.9} />
      </Touchable>
    </View>
  )
}

/** The language choice as chips, for the About screen on phones. */
export function LanguageChips() {
  const locale = useLanguage()

  return (
    <View style={styles.chips} role="radiogroup" accessibilityLabel={t('language')}>
      {locales.map((option) => {
        const active = option === locale
        return (
          <Touchable
            key={option}
            role="radio"
            accessibilityState={{ checked: active }}
            onPress={() => chooseLanguage(option)}
            style={[styles.chip, active && styles.chipActive]}
          >
            <Text style={[styles.chipLabel, active && { color: colors.ivory }]}>{localeNames[option]}</Text>
          </Touchable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  menu: {
    marginBottom: 6,
    padding: 6,
    borderRadius: radius,
    borderWidth: 1,
    borderColor: colors.frameRule,
    backgroundColor: colors.frameDeep,
  },
  option: {
    minHeight: 38,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.frameMuted,
  },
  trigger: {
    minHeight: 40,
    paddingHorizontal: 10,
    marginHorizontal: -10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  triggerLabel: {
    flex: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: 15,
    color: colors.frameMuted,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 38,
    paddingHorizontal: 15,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.rule,
    backgroundColor: alpha('ivory', 0.7),
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  chipLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.ink,
  },
})
