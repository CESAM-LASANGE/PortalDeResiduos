import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { resolveRoute } from '../src/data/siteMap.ts'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('menu: Início, Produções do Convênio, Notas técnicas, Notícias e Contato', () => {
  const app = ler('src/App.tsx')
  const itens = [...app.match(/const NAV_LINKS = \[([\s\S]*?)\] as const/)[1].matchAll(/^\s*\['([^']+)', '(\/[^']*)'/gm)].map((m) => `${m[1]} ${m[2]}`)
  assert.deepEqual(itens, ['Início /', 'Produções do Convênio /producoes-do-convenio/', 'Notas técnicas /nota-tecnica/', 'Notícias /noticias/', 'Contato /contact/'])
})

test('Notas técnicas tem tipo de rota próprio: só o seu item do menu fica ativo', () => {
  const rota = resolveRoute('/nota-tecnica/')
  assert.equal(rota.kind, 'technical')
  assert.equal(rota.title, 'Notas Técnicas')
  assert.match(ler('src/App.tsx'), /\['Notas técnicas', '\/nota-tecnica\/', \['technical'\]\]/)
  assert.match(ler('src/App.tsx'), /route === 'technical' && <TechnicalNote \/>/)
})

test('a página de Notas Técnicas traz a nota dos catadores e as outras notas técnicas do catálogo', async () => {
  const pagina = ler('src/pages/ResourcePages.tsx').match(/export function TechnicalNote[\s\S]*?\n\}/)[0]
  assert.match(pagina, /title="Notas Técnicas"/)
  assert.match(pagina, /doc\.type === 'Nota técnica'/)
  assert.match(pagina, /<DocumentRow /)
  const { documents } = await import('../src/data/documents.ts')
  assert.equal(documents.filter((doc) => doc.type === 'Nota técnica').length, 2, 'duas notas técnicas no catálogo')
})

test('Documentos saiu do menu e virou card da tela inicial, ao lado de Logística Reversa', () => {
  const home = ler('src/components/HomePage.tsx')
  const areas = [...home.match(/const homeAreas: HomeArea\[\] = \[([\s\S]*?)\n\]/)[1].matchAll(/title: "([^"]+)"[^\n]*?href: "([^"]+)"/g)].map((m) => [m[1], m[2]])
  const titulos = areas.map(([titulo]) => titulo)
  assert.deepEqual(areas.find(([titulo]) => titulo === 'Documentos'), ['Documentos', '/publicacoes/'])
  assert.equal(Math.abs(titulos.indexOf('Documentos') - titulos.indexOf('Logística Reversa')), 1, 'um ao lado do outro')
  assert.ok(!titulos.includes('Publicações'))
  assert.doesNotMatch(ler('src/App.tsx').match(/const NAV_LINKS = \[([\s\S]*?)\] as const/)[1], /Documentos/)
})
