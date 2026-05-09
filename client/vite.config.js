import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // This is built into Node.js

// https://vite.js.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This allows you to use "@" instead of "../../.."
      "@": path.resolve(__dirname, "./src"),
    },
  },
})