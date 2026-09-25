import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@content': path.resolve(root, '../content'),
    },
  },
  server: {
    fs: {
      allow: [root, path.resolve(root, '../content')],
    },
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
