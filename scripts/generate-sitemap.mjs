// Gera public/sitemap.xml e public/robots.txt a partir do mapa de rotas, dos 79 panoramas e das notícias.
// Só entram páginas canônicas: aliases com redirecionamento, rotas legadas e os caminhos longos do
// WordPress (que repetem páginas) ficam de fora.
// Domínio: VITE_SITE_URL (ambiente), ou o padrão de site.json; o mesmo das metatags de index.html.
// Uso: npm run sync:data
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { newsSlugs, siteRoutes } from '../src/data/siteMap.ts'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const padrao = JSON.parse(fs.readFileSync(path.join(root, 'site.json'), 'utf8')).url
const SITE = (process.env.VITE_SITE_URL ?? padrao).replace(/\/+$/, '')

// /planos-de-educacao-ambiental/ repete a página do menu.
const REPETIDAS = ['/corumba/', '/planos-de-educacao-ambiental/']

const paginas = siteRoutes
  .filter((rota) => !rota.redirectTo && rota.status !== 'legacy')
  .map((rota) => rota.path)
  .filter((caminho) => !caminho.startsWith('/producoes-do-convenio/materiais-compilados/') && !caminho.startsWith('/producoes-do-convenio/panorama-e-censo-dos-catadores/'))
  .filter((caminho) => !REPETIDAS.includes(caminho) && !caminho.startsWith('/cidades/'))
const caminhos = [...new Set([
  ...paginas,
  ...panoramaRecords.map((panorama) => `/cidades/${panorama.slug}/`),
  ...newsSlugs.map((slug) => `/noticias/${slug}/`),
])].sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)))

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${caminhos.map((caminho) => `  <url><loc>${SITE}${caminho}</loc></url>`).join('\n')}
</urlset>
`
fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml)
fs.writeFileSync(path.join(root, 'public/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
console.log(`Sitemap: ${caminhos.length} páginas em ${SITE}.`)
