import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { resolveRoute, newsSlugs } from '../src/data/siteMap.ts'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const SITE = 'https://portalresiduosms.online'
const urls = [...ler('public/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const caminhos = urls.map((url) => url.replace(SITE, ''))

test('sitemap: só páginas canônicas, no domínio do site, sem repetição', () => {
  assert.ok(urls.every((url) => url.startsWith(`${SITE}/`)))
  assert.equal(new Set(urls).size, urls.length)
  for (const caminho of caminhos) {
    const rota = resolveRoute(caminho)
    assert.ok(rota && !rota.redirectTo, `${caminho} deve ser uma página, não um alias`)
    assert.notEqual(rota.status, 'legacy', caminho)
    if (caminho.startsWith('/producoes-do-convenio/materiais-compilados/')) assert.equal(caminho, '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/', `${caminho} é caminho longo que repete outra página`)
  }
})

test('sitemap: início, os 79 municípios e as 8 notícias', () => {
  assert.ok(caminhos.includes('/'))
  for (const { slug } of panoramaRecords) assert.ok(caminhos.includes(`/cidades/${slug}/`), slug)
  for (const slug of newsSlugs) assert.ok(caminhos.includes(`/noticias/${slug}/`), slug)
  assert.ok(caminhos.includes('/documentos/') === false, '/documentos/ é alias legado de /publicacoes/')
  assert.ok(caminhos.includes('/publicacoes/'))
  assert.ok(caminhos.includes('/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/'), 'a página de compostagem só existe nesse caminho')
  assert.ok(!caminhos.includes('/planos-de-educacao-ambiental/'), 'repete /educacao-ambiental/planos-de-educacao-ambiental/')
})

test('robots.txt libera tudo e aponta o sitemap', () => {
  const robots = ler('public/robots.txt')
  assert.match(robots, /User-agent: \*\s+Allow: \//)
  assert.ok(robots.includes(`Sitemap: ${SITE}/sitemap.xml`))
})

test('servidor: rota desconhecida devolve o index.html, em Apache e em Netlify/Cloudflare Pages', () => {
  const htaccess = ler('public/.htaccess')
  assert.match(htaccess, /RewriteCond %\{REQUEST_FILENAME\} !-f/)
  assert.match(htaccess, /RewriteRule \. \/index\.html \[L\]/)
  assert.match(ler('public/_redirects'), /^\/\*\s+\/index\.html\s+200$/m)
})

test('prévia de compartilhamento e cor do tema', () => {
  const html = ler('index.html')
  for (const propriedade of ['og:type', 'og:locale', 'og:site_name', 'og:title', 'og:description', 'og:url', 'og:image', 'twitter:card'])
    assert.ok(html.includes(`"${propriedade}"`), propriedade)
  assert.ok(html.includes('content="%VITE_SITE_URL%/og-image.png"'), 'o domínio vem de VITE_SITE_URL')
  assert.match(html, /<meta name="theme-color" content="#1b4b3a" \/>/)
  assert.ok(fs.existsSync(new URL('../public/og-image.png', import.meta.url)))
})
