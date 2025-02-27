import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true, // Active les tests globaux
    environment: "jsdom", // Simule un navigateur avec jsdom
  },
})
