import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,        // copy runs here (original stays on 5173)
    strictPort: true   // fail with an error instead of silently switching ports
  },
  preview: {
    port: 4174         // used by "npm run preview" in the copy (original uses 4173)
  }
})