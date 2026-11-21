import { Redirect } from 'expo-router'

/** Articles used to be called guides; keep old links working. */
export default function GuidesRedirect() {
  return <Redirect href="/articles" />
}
