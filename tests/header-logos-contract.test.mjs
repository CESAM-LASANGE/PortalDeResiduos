import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('cabeçalho: a logo da UEMS fica entre a do portal e a do CESAM', () => {
  const marca = ler('src/App.tsx').match(/<Link to="\/" className="brand"[\s\S]*?<\/Link>/)[0]
  const imagens = [...marca.matchAll(/<img src=\{`\$\{BRAND\}([^`]+)`\} alt="([^"]*)"/g)].map((m) => m.slice(1))
  assert.deepEqual(imagens.map(([arquivo]) => arquivo), ['portal.png', 'uems.png', 'cesam-mpms.png'])
  assert.match(imagens[1][1], /UEMS/)
  for (const [arquivo] of imagens) assert.ok(fs.existsSync(new URL(`../public/brand/${arquivo}`, import.meta.url)), arquivo)
})

test('cabeçalho: no celular e abaixo de 1280 px só a marca do portal aparece, como antes', () => {
  const css = ler('src/styles/pages.css')
  assert.match(css, /@media \(max-width: 1279px\)[\s\S]*?\.brand-partner \{ display: none; \}/)
  assert.match(ler('src/App.tsx'), /className="brand-partner"/)
})
