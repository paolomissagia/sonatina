import { StyleSheet, Text, View } from 'react-native'
import { t } from '@/i18n'
import { useLanguage } from '@/state/language'
import { Button, PageTitle, titleOf } from '@/ui/kit'
import { type } from '@/ui/theme'
import { Screen } from './screen'

export function NotFound() {
  useLanguage()

  return (
    <Screen header="back">
      <PageTitle title={titleOf(t('not_found_title'))} />
      <View style={styles.body}>
        <Text role="heading" aria-level={1} style={styles.title}>
          {t('not_found_title')}
        </Text>
        <Text style={type.body}>{t('not_found_text')}</Text>
        <Button label={t('not_found_back')} href="/" />
      </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
  body: {
    maxWidth: 560,
    gap: 16,
    paddingTop: 24,
  },
  title: {
    ...type.display,
    fontSize: 44,
    lineHeight: 48,
  },
})
