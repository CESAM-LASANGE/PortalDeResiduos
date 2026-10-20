import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import site from './site.json'

export default defineConfig(({ mode }) => {
  // Domínio público (metatags de index.html): VITE_SITE_URL, ou o padrão de site.json.
  const dominio = (loadEnv(mode, '.', 'VITE_').VITE_SITE_URL ?? site.url).replace(/\/+$/, '')
  return {
    plugins: [
      react(),
      { name: 'dominio-do-site', transformIndexHtml: { order: 'pre', handler: (html: string) => html.split('%VITE_SITE_URL%').join(dominio) } },
    ],
    server: {
      port: 5173,
      host: '0.0.0.0',
    },
  }
})
