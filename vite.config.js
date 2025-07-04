import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Weather-App/',  // ✅ Must match your GitHub repo name
  plugins: [react()],
})
