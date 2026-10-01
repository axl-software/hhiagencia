/* Genera preview-html/index.html: el sitio completo (todas las páginas) en un solo archivo.
   Comando: npm run preview:html */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  root: 'preview',
  base: './',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // sin servidor Next: enlaces y rutas se simulan con hashes
      'next/link': fileURLToPath(new URL('./preview/shims/link.tsx', import.meta.url)),
      'next/navigation': fileURLToPath(new URL('./preview/shims/navigation.ts', import.meta.url)),
    },
  },
  plugins: [react(), tailwindcss(), viteSingleFile()],
  build: { outDir: '../preview-html', emptyOutDir: true, assetsInlineLimit: 100_000_000, cssCodeSplit: false },
})
