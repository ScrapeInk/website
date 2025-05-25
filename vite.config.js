

// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to your Flask backend
      '/api': {
        target: 'http://simple4j.pythonanywhere.com', // Your backend server
        changeOrigin: true, // Recommended for virtual hosted sites
        // secure: false, // Uncomment if your backend is not HTTPS
        // rewrite: (path) => path.replace(/^\/api/, '') // Not needed if your Flask routes already include /api
      }
    }
  }
})