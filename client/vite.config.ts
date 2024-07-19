import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/auth': 'http://localhost:3000',
      '/api/alerts': 'http://localhost:3001',
      '/api/data': 'http://localhost:3002'
    }
  }
})
