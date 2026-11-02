import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = process.env.VITE_BASE_URL || (process.env.GITHUB_ACTIONS ? '/DigiPal-Decoder/' : './')

  return {
    base,
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      port: 3000,
      open: false
    }
  }
})
