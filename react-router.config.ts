import type { Config } from '@react-router/dev/config'
import { articles } from './src/data/articles'
import { composers } from './src/data/composers'
import { works } from './src/data/works'

export default {
  appDirectory: 'src',
  // No server: every page is built as static HTML, so search engines and link previews get
  // the content, and Vercel serves the files.
  ssr: false,
  prerender: ({ getStaticPaths }) => [
    ...getStaticPaths(),
    ...works.map((work) => `/works/${work.id}`),
    ...composers.map((composer) => `/composers/${composer.id}`),
    ...articles.map((article) => `/articles/${article.id}`),
  ],
} satisfies Config
