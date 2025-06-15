import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Define global constants - use string values directly
    'import.meta.env.VITE_API_URL': JSON.stringify('http://localhost:5000/api'),
  },
  server: {
    port: 5173,
    open: true,
  },
})
