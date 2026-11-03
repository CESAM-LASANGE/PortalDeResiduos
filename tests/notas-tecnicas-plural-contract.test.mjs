import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('links e rótulos que levam à página de Notas Técnicas estão no plural', () => {
  const inicial = ler('src/components/HomePage.tsx')
  assert.match(inicial, /<strong className="home-tile-title">Notas Técnicas<\/strong>/)
  assert.match(inicial, /Abrir Notas Técnicas </)
  const producoes = ler('src/pages/ProductionPages.tsx')
  assert.match(producoes, /label: 'Ler as notas técnicas', href: '\/nota-tecnica\/'/)
  assert.match(producoes, />Ler notas técnicas relacionadas </)
  assert.match(ler('src/pages/ResourcePages.tsx'), />Ler as notas técnicas </)
})

test('nenhum link para /nota-tecnica/ tem rótulo no singular', () => {
  for (const arquivo of ['src/components/HomePage.tsx', 'src/pages/ProductionPages.tsx', 'src/pages/ResourcePages.tsx', 'src/App.tsx']) {
    const src = ler(arquivo)
    for (const m of src.matchAll(/(?:to="\/nota-tecnica\/"|href: '\/nota-tecnica\/')[^]*?(?:<\/Link>|\})/g))
      assert.doesNotMatch(m[0], /[Nn]ota [Tt][ée]cnica(?!s)/, `${arquivo}: ${m[0].slice(0, 90)}`)
  }
})
