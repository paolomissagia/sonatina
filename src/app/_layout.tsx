import {
  EBGaramond_500Medium,
  EBGaramond_500Medium_Italic,
  EBGaramond_600SemiBold,
} from '@expo-google-fonts/eb-garamond'
import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold, Geist_700Bold, Geist_800ExtraBold } from '@expo-google-fonts/geist'
import { useFonts } from 'expo-font'
import { Tabs } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { BottomBar } from '@/components/bottom-bar'
import { PlayerBar } from '@/components/player-bar'
import { Sidebar } from '@/components/sidebar'
import { PlayerProvider } from '@/player/player-provider'
import { loadRecordings } from '@/player/use-recording'
import { loadLanguage, useLanguage } from '@/state/language'
import { useLayout } from '@/ui/layout'
import { colors } from '@/ui/theme'

void SplashScreen.preventAutoHideAsync()

/** The app's routes. A navigator in SDK 58 shows only the screens its layout declares. */
const routes = [
  'index',
  'works',
  'composers',
  'articles',
  'radio',
  'search',
  'about',
  'guides/index',
  'guides/[id]',
  '[locale]/index',
  '[locale]/[...rest]',
  '+not-found',
]

/**
 * The frame around every screen: the sidebar on wide windows, the tab bar on phones, and the
 * player at the foot of both. Each section is a tab, so it keeps its place while you browse
 * the others, and the player above them never stops for navigation.
 */
function Shell() {
  useLanguage()
  const { wide } = useLayout()

  return (
    <View style={styles.shell}>
      <StatusBar style="dark" />
      {wide ? <Sidebar /> : null}
      <View style={styles.main}>
        <Tabs
          backBehavior="history"
          screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.parchment } }}
          tabBar={() => (
            <View>
              <PlayerBar />
              {wide ? null : <BottomBar />}
            </View>
          )}
        >
          {/* Every route is a tab; the sidebar and tab bar choose which ones to show. */}
          {routes.map((name) => (
            <Tabs.Screen key={name} name={name} />
          ))}
        </Tabs>
      </View>
    </View>
  )
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    EBGaramond_500Medium,
    EBGaramond_500Medium_Italic,
    EBGaramond_600SemiBold,
    Geist_400Regular,
    Geist_500Medium,
    Geist_600SemiBold,
    Geist_700Bold,
    Geist_800ExtraBold,
  })
  const [languageLoaded, setLanguageLoaded] = useState(false)
  const ready = (fontsLoaded || Boolean(fontError)) && languageLoaded

  useEffect(() => {
    void loadLanguage().finally(() => setLanguageLoaded(true))
  }, [])

  useEffect(() => {
    if (!ready) {
      return
    }
    void SplashScreen.hideAsync()
    // Load the recordings table once the app is up, so Listen appears at once on work pages.
    const timer = setTimeout(() => void loadRecordings(), 1200)
    return () => clearTimeout(timer)
  }, [ready])

  if (!ready) {
    return <View style={styles.loading} />
  }

  return (
    <PlayerProvider>
      <Shell />
    </PlayerProvider>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: colors.frame,
  },
  shell: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.parchment,
  },
  main: {
    flex: 1,
    minWidth: 0,
  },
})
