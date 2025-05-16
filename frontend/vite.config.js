import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api/* to backend on port 3001
      '/api': 'https://fullstack-singsation-test.onrender.com:3001'
    }
  }
})
