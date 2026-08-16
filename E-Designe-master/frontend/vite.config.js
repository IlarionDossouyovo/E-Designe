import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Pour GitHub Pages: utiliser le nom du dépôt
const base = process.env.NODE_ENV === 'production' ? '/E-Designe/' : '/'

export default defineConfig({
  plugins: [react()],
  base: base,
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 600,
    outDir: 'dist',
    assetsDir: 'assets'
  }
})