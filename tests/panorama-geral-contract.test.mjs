import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { resolveRoute } from '../src/data/siteMap.ts'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('menu: a aba Municípios saiu; os municípios abrem só pela tela inicial', () => {
  const app = ler('src/App.tsx')
  const itens = [...app.match(/const NAV_LINKS = \[([\s\S]*?)\] as const/)[1].matchAll(/^\s*\['([^']+)', '(\/[^']*)'/gm)].map((m) => `${m[1]} ${m[2]}`)
  assert.deepEqual(itens, ['Início /', 'Documentos /publicacoes/', 'Produções do Convênio /producoes-do-convenio/', 'Notícias /noticias/', 'Contato /contact/'])
  const destinos = [...ler('src/components/HomePage.tsx').matchAll(/<Link to="([^"]+)" className="home-tile"/g)].map((m) => m[1])
  assert.equal(destinos[0], '/cidades/')
})

test('/diretorios/ continua existindo e leva à mesma página que a tela inicial', () => {
  assert.equal(resolveRoute('/diretorios/').redirectTo, '/cidades/')
  assert.ok(!/to="\/diretorios\/"/.test(ler('src/App.tsx')), 'o rodapé não repete o mesmo destino')
})

test('texto: "pareceres" virou "panoramas" nos textos que a pessoa lê', () => {
  for (const arquivo of ['src/components/HomePage.tsx', 'src/pages/CityPages.tsx', 'src/App.tsx']) assert.doesNotMatch(ler(arquivo), /[Pp]arecer/, arquivo)
  const tile = ler('src/components/HomePage.tsx').match(/<Link to="\/cidades\/" className="home-tile">[\s\S]*?<\/Link>/)[0]
  assert.match(tile, /home-tile-kicker">Panoramas</)
  assert.match(tile, /municípios com panorama publicado\./)
})

test('Panorama geral: aparece acima da lista de municípios, com o relatório geral e o mapa', () => {
  const pagina = ler('src/pages/CityPages.tsx').match(/export function CityDirectory[\s\S]*?\n\}/)[0]
  assert.match(pagina, /<PanoramaGeral \/>[\s\S]*<MunicipalityIndex /)
  assert.match(pagina, /relatorioGeral=\{false\}/, 'o link do relatório fica no Panorama geral, não repetido no índice')
  const bloco = ler('src/components/PanoramaGeral.tsx')
  for (const texto of ['Panorama geral', 'Relatório geral dos panoramas']) assert.ok(bloco.includes(texto), texto)
  assert.match(bloco, /<DisposalMap \/>/)
  assert.match(bloco, /disposalSummary/, 'os números vêm dos dados, não digitados')
  assert.match(ler('src/styles/pages.css'), /\.panorama-geral-layout \{[^}]*grid-template-columns/)
})

test('mapa da disposição final: legenda com as 4 categorias, contagens dos dados, fonte e alternativa em texto', () => {
  const mapa = ler('src/components/DisposalMap.tsx')
  for (const rotulo of ['Aterro sanitário público', 'Aterro sanitário privado', 'Transbordo e transporte', 'Lixão', 'Fonte: {disposalSummary.fonte}']) assert.ok(mapa.includes(rotulo), rotulo)
  assert.match(mapa, /<svg[^>]*role="img"[^>]*aria-labelledby/)
  assert.match(mapa, /<details/)
  assert.match(mapa, /disposalCategories/)
  assert.match(mapa, /<pattern/, 'o lixão tem hachura: não depende só da cor')
})
