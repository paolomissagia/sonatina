// Metro bundles imported images as assets: a module id on phones, a URL on the web.
declare module '*.webp' {
  const source: number
  export default source
}

declare module '*.png' {
  const source: number
  export default source
}
