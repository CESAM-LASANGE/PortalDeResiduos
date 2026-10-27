import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

test('busca da inicial: tocar numa sugestão no celular não fecha a lista antes do clique', () => {
  const home = fs.readFileSync(new URL('../src/components/HomePage.tsx', import.meta.url), 'utf8')
  assert.match(home, /id="home-hero-search-results"[^>]*onMouseDown=\{\(event\) => event\.preventDefault\(\)\}/)
})

test('painel de busca: o toque não vira "hover" (no iPhone isso engole o clique)', () => {
  const painel = fs.readFileSync(new URL('../src/components/SiteSearch.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(painel, /onMouseEnter/)
  assert.match(painel, /pointerType === 'mouse'/)
})
