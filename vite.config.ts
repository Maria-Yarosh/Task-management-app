import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {NodePackageImporter} from 'sass-embedded'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        importers: [new NodePackageImporter()],
      },
    },
  },
})
