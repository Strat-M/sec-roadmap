import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change this to your repo name
  // If your repo is https://github.com/username/seccert-roadmap
  // then base should be '/seccert-roadmap/'
  // If deploying to username.github.io (root), use '/'
  base: '/seccert-roadmap/',
})
