import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { resolveRoute } from '../src/data/siteMap.ts'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')

test('menu: a aba Municípios saiu; os municípios abrem só pela tela inicial', () => {
  const app = ler('src/App.tsx')
  const itens = [...app.match(/const NAV_LINKS = \[([\s\S]*?)\] as const/)[1].matchAll(/^\s*\['([^']+)', '(\/[^']*)'/gm)].map((m) => `${m[1]} ${m[2]}`)
  assert.ok(!itens.some((item) => item.startsWith('Municípios')), 'a aba Municípios continua fora do menu (a lista completa está em tests/menu-contract.test.mjs)')
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

test('nome da página: "Panoramas" no lugar de "Cidades" (título, trilha, aba, rodapé, cartão e links)', () => {
  assert.equal(resolveRoute('/cidades/').title, 'Panoramas')
  const cidades = ler('src/pages/CityPages.tsx')
  assert.match(cidades, /<Hero title="Panoramas"/)
  assert.equal([...cidades.matchAll(/\{ label: 'Panoramas'/g)].length, 2, 'trilha da lista e da ficha')
  assert.doesNotMatch(cidades, /label: 'Cidades'|title="Cidades"|Voltar para cidades|Ver cidades disponíveis|diretório de cidades/)
  const app = ler('src/App.tsx')
  assert.match(app, /<Link to="\/cidades\/">Panoramas<\/Link>/)
  assert.match(app, /title: 'Panoramas', text: 'Acesse informações municipais/)
  assert.doesNotMatch(app, /<Link to="\/cidades\/">Cidades<\/Link>|title: 'Cidades'/)
  assert.match(ler('src/pages/InstitutionalPages.tsx'), /Consultar panoramas/)
  assert.ok(ler('src/data/search.ts').includes('/cidades/'), 'a busca continua achando a página')
})

test('lista de panoramas: sem o link do plano de coleta seletiva (a página do plano já o tem)', () => {
  const funcao = (arquivo, nome) => ler(arquivo).match(new RegExp(`export function ${nome}[\\s\\S]*?\\n\\}`))[0]
  assert.match(funcao('src/pages/CityPages.tsx', 'CityDirectory'), /<MunicipalityIndex [^>]*planoDeColeta=\{false\}/)
  assert.equal(resolveRoute('/panoramas-da-gestao-de-residuos/').redirectTo, '/cidades/')
  assert.equal(resolveRoute('/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/').redirectTo, '/cidades/')
  // Onde o plano é o assunto, o link continua.
  assert.doesNotMatch(funcao('src/pages/ProductionPages.tsx', 'Municipalities'), /planoDeColeta=\{false\}/)
  assert.doesNotMatch(funcao('src/pages/ProductionPages.tsx', 'MaterialsCompiled'), /planoDeColeta=\{false\}/)
  const indice = ler('src/components/MunicipalityIndex.tsx')
  assert.match(indice, /planoDeColeta: mostrarPlano = true/)
  assert.match(indice, /const plano = mostrarPlano \? planos\.get\(city\.slug\) : undefined/)
  assert.match(indice, /plano: mostrarPlano \? planos\.get\(city\.slug\)\?\.primaryDocumentUrl : undefined/, 'o painel do mapa também')
})

test('Produções do Convênio: seção própria dos panoramas, com a lista e o relatório geral', () => {
  const producoes = ler('src/pages/ProductionPages.tsx')
  const secao = producoes.match(/\{ id: 'panoramas', eyebrow:[^\n]*\},?\n/)[0]
  assert.match(secao, /title: 'Panoramas da Gestão de Resíduos'/)
  assert.match(secao, /label: 'Ver os panoramas', href: '\/cidades\/'/)
  assert.match(secao, /label: 'Relatório geral dos panoramas', href: arquivo\('Relatório geral dos panoramas'\), externo: true/)
  // Sem repetir os mesmos links em Materiais compilados.
  const materiais = producoes.match(/\{ id: 'materiais-compilados', eyebrow:[^\n]*\},?\n/)[0]
  assert.doesNotMatch(materiais, /Ver municípios|Panoramas da gestão de resíduos|href: '\/cidades\/'/)
  assert.match(materiais, /Plano de coleta seletiva/)
})
