import { type RouteConfig, route } from '@react-router/dev/routes'

// The app keeps its own <Routes> in App.tsx; React Router builds and prerenders around it.
export default [route('*?', 'App.tsx')] satisfies RouteConfig
