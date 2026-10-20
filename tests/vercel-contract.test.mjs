import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const config = JSON.parse(ler('vercel.json'))
const cabecalhos = (fonte) => Object.fromEntries(config.headers.find((h) => h.source === fonte).headers.map((h) => [h.key, h.value]))
const csp = Object.fromEntries(cabecalhos('/(.*)')['Content-Security-Policy'].split(';').map((d) => d.trim().split(/\s+(.*)/s)).filter(([nome]) => nome))

test('Vercel: URLs com barra final, como o resto dos sites do CESAM', () => {
  assert.equal(config.trailingSlash, true)
  assert.equal(config.cleanUrls, false)
})

test('Vercel: cabeçalhos de segurança e CSP sem script inline nem eval', () => {
  const todos = cabecalhos('/(.*)')
  assert.equal(todos['X-Content-Type-Options'], 'nosniff')
  assert.equal(todos['X-Frame-Options'], 'DENY')
  assert.equal(todos['Referrer-Policy'], 'strict-origin-when-cross-origin')
  assert.match(todos['Permissions-Policy'], /camera=\(\)/)
  assert.equal(csp['script-src'], "'self'")
  assert.ok(!Object.values(csp).some((valor) => valor.includes('unsafe-eval')))
  assert.equal(csp['object-src'], "'none'")
  assert.equal(csp['frame-ancestors'], "'none'")
})

test('Vercel: a CSP libera só o que o site usa de fora (fontes do Google e o painel do Power BI)', () => {
  assert.equal(csp['frame-src'], 'https://app.powerbi.com')
  assert.match(csp['style-src'], /https:\/\/fonts\.googleapis\.com/)
  assert.equal(csp['font-src'], 'https://fonts.gstatic.com')
  assert.equal(csp['connect-src'], "'self'")
  assert.match(csp['img-src'], /^'self' data:$/)
})

test('Vercel: /uploads/ vai para o Supabase Storage e o resto cai no index.html, nessa ordem', () => {
  const [uploads, fallback] = config.rewrites
  assert.equal(uploads.source, '/uploads/:path*')
  assert.match(uploads.destination, /^https:\/\/[A-Za-z0-9-]+\.supabase\.co\/storage\/v1\/object\/public\/uploads\/:path\*$/)
  assert.deepEqual(fallback, { source: '/(.*)', destination: '/index.html' })
  assert.equal(config.rewrites.length, 2)
})

test('Vercel: o build não leva os 409 MB de arquivos, que a Vercel serviria antes da regra', () => {
  assert.match(config.buildCommand, /npm run build && rm -rf dist\/uploads$/)
})

test('Vercel: cache longo nos arquivos do build e nos uploads', () => {
  assert.match(cabecalhos('/assets/(.*)')['Cache-Control'], /immutable/)
  assert.match(cabecalhos('/uploads/(.*)')['Cache-Control'], /max-age=2592000/)
})

test('Supabase: o envio pula nome com acento, que o Storage não aceita, e confere o limite do plano gratuito', () => {
  const script = ler('scripts/upload-to-supabase.mjs')
  assert.match(script, /--dry-run/)
  assert.match(script, /50 \* 1024 \* 1024/)
  assert.match(script, /SUPABASE_SERVICE_ROLE_KEY/)
  assert.ok(!/eyJ[A-Za-z0-9_-]{20,}/.test(script), 'nenhuma chave no código')
  assert.match(script, /const SIMULTANEOS = 3/, 'poucos envios em paralelo: o Storage corta a conexão (ENHANCE_YOUR_CALM)')
  assert.match(script, /TENTATIVAS/, 'tenta de novo quando a conexão cai')
  assert.match(script, /method: 'HEAD'/, 'pula o que já está no bucket, para retomar um envio interrompido')
  assert.match(script, /startsWith\('sb_'\)/, 'chave nova (sb_secret_) não é JWT: só vai em apikey')
  assert.ok(!/sb_secret_[A-Za-z0-9]{10,}/.test(script), 'nenhuma chave no código')
})

test('Supabase: o /uploads/ aponta para o projeto do portal', () => {
  assert.equal(config.rewrites[0].destination, 'https://ijnpqueinuhuauykqxvh.supabase.co/storage/v1/object/public/uploads/:path*')
})

test('domínio vem de VITE_SITE_URL, com o padrão em site.json', () => {
  assert.equal(JSON.parse(ler('site.json')).url, 'https://portalresiduosms.online')
  assert.ok(ler('index.html').includes('%VITE_SITE_URL%/og-logo.png'))
  assert.match(ler('vite.config.ts'), /import site from '\.\/site\.json'/)
})
