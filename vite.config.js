import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // Ваш сервер на HTTP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Убирает префикс /api
      },
      '/images': {
        target: 'http://localhost:8080/images', // Ваш сервер на HTTP
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/images/, ''), // Убирает префикс /images
      },
    }
  }
})
