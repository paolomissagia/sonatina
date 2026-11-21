import { Redirect, useLocalSearchParams, type Href } from 'expo-router'

/** Articles used to be called guides; keep old links working. */
export default function GuideRedirect() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return <Redirect href={`/articles/${id}` as Href} />
}
