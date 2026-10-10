import path from 'path'
import { reactRouter } from '@react-router/dev/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // React Router builds the app (routes.ts, prerendering); tests only need React.
  plugins: [process.env.VITEST ? react() : reactRouter()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
