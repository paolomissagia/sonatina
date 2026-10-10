import { index, route, type RouteConfig } from '@react-router/dev/routes'

/** Every page; react-router.config.ts prerenders each one to static HTML. */
export default [
  index('routes/home.tsx'),
  route('works', 'routes/works.tsx'),
  route('works/:id', 'routes/work.tsx'),
  route('composers', 'routes/composers.tsx'),
  route('composers/:id', 'routes/composer.tsx'),
  route('articles', 'routes/articles.tsx'),
  route('articles/:id', 'routes/article.tsx'),
  route('radio', 'routes/radio.tsx'),
  route('search', 'routes/search.tsx'),
  route('about', 'routes/about.tsx'),
  route('sitemap.xml', 'routes/sitemap.ts'),
  route('robots.txt', 'routes/robots.ts'),
  route('*', 'routes/not-found.tsx'),
] satisfies RouteConfig
