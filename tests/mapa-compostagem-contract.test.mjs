import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { resolveRoute } from '../src/data/siteMap.ts'
import { municipalDocumentsFrom } from '../src/data/municipalDocuments.ts'
import { legacyDocuments } from '../src/data/legacy-documents.generated.ts'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'
import { municipalityShapes } from '../src/data/municipality-map.generated.ts'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const compostagem = municipalDocumentsFrom(legacyDocuments, panoramaRecords.map((r) => ({ slug: r.slug, name: r.name }))).filter((d) => d.kind === 'compostagem')

test('mapa de compostagem: os 5 municípios contemplados existem no desenho do Estado e têm o plano', () => {
  assert.deepEqual(compostagem.map((d) => d.slug).sort(), ['bataguassu', 'bonito', 'chapadao-do-sul', 'navirai', 'sao-gabriel-do-oeste'])
  const slugs = new Set(municipalityShapes.map((s) => s.slug))
  for (const doc of compostagem) { assert.ok(slugs.has(doc.slug), doc.slug); assert.match(doc.url, /^https:\/\/drive\.google\.com\/file\/d\//, doc.slug) }
})

test('Plano de Compostagem: o botão que levava aos municípios saiu e o mapa entrou antes dos documentos', () => {
  const pagina = ler('src/pages/ProductionPages.tsx').match(/export function Composting[\s\S]*?\n\}/)[0]
  assert.doesNotMatch(pagina, /Ver municípios contemplados|plano-de-compostagem\/municipios-contemplados/)
  assert.match(pagina, /<CompostagemMap \/>[\s\S]*<DocumentosDaPagina contexto="\/plano-de-compostagem\/" \/>/)
})

test('mapa de compostagem: só os contemplados têm cor e podem ser escolhidos; o resto fica transparente', () => {
  const mapa = ler('src/components/CompostagemMap.tsx')
  assert.match(mapa, /municipalDocuments\.filter\(\(doc\) => doc\.kind === 'compostagem'\)/, 'os contemplados vêm dos dados')
  assert.match(mapa, /aria-label=\{`\$\{[a-z.]+\}: ver o plano de compostagem`\}/)
  assert.match(mapa, /'Escape'/)
  assert.match(mapa, /rel="noopener"/)
  const css = ler('src/styles/pages.css')
  assert.match(css, /\.compost-map \.municipality-map-svg path \{[^}]*fill: none/, 'quem não é contemplado não tem cor')
  assert.match(css, /\.compost-map \.municipality-map-svg path\.is-contemplado \{[^}]*fill: var\(--mata\)/)
  assert.match(css, /\.compost-map \.municipality-map-svg path\.is-selected \{[^}]*fill: var\(--cerrado\)/)
})

test('as páginas antigas de municípios contemplados da compostagem levam ao Plano de Compostagem', () => {
  assert.equal(resolveRoute('/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/').redirectTo, '/plano-de-compostagem/')
  assert.equal(resolveRoute('/producoes-do-convenio/materiais-compilados/municipios-contemplados/').redirectTo, '/plano-de-compostagem/')
  const producoes = ler('src/pages/ProductionPages.tsx')
  assert.doesNotMatch(producoes.match(/export function Municipalities[\s\S]*?\n\}/)[0], /compostagem/i)
  assert.doesNotMatch(ler('src/App.tsx'), /mode="compostagem"/)
})
