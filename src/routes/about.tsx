import type { MetaFunction } from 'react-router'
import { aboutMeta } from '@/data/page-meta'
import { AboutPage } from '@/pages/about-page'
import { metaTags } from '@/seo'

export const meta: MetaFunction = () => metaTags(aboutMeta())

export default function AboutRoute() {
  return <AboutPage />
}
