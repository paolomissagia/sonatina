import { Stack } from 'expo-router'
import { colors } from '@/ui/theme'

// A detail page opened from elsewhere (a link, search, the player) keeps the list behind it.
export const unstable_settings = { initialRouteName: 'index' }

export default function SectionLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.parchment } }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[id]" />
    </Stack>
  )
}
