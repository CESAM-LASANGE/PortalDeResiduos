import test from 'node:test'
import assert from 'node:assert/strict'
import { legacyCityData } from '../src/data/legacy-city-data.generated.ts'
import { formatarIndicador } from '../src/data/indicadores.ts'

const cidade = (slug) => legacyCityData.find((item) => item.slug === slug)
const ano = (slug, n) => cidade(slug).coleta.find((item) => item.ano === n)

test('L02/L03: só as 5 fichas do site antigo têm dados, publicados em 16/11/2021', () => {
  assert.deepEqual(legacyCityData.map((item) => item.slug).sort(), ['campo-grande', 'corumba', 'dourados', 'ponta-pora', 'tres-lagoas'])
  for (const item of legacyCityData) assert.equal(item.publicadoEm, '2021-11-16', item.slug)
})

test('L02: locais de entrega voluntária como a fonte os tem', () => {
  assert.deepEqual(cidade('campo-grande').entrega, { tipo: 'mapa', url: 'https://www.google.com/maps/d/embed?mid=10d04hhnk92iLxujjfK0q2_IxMpRh70o&ehbc=2E312F' })
  const dourados = cidade('dourados').entrega
  assert.equal(dourados.tipo, 'listas')
  assert.deepEqual(dourados.grupos.map((g) => [g.titulo, g.itens.length]), [["PEV'S", 6], ['Projeto PapaPilha', 40]])
  assert.equal(dourados.grupos[0].itens[0], 'Ecoponto de galhos 1')
  assert.equal(dourados.grupos[0].itens[5], 'PEV Resíduos de Construção Civil')
  assert.ok(dourados.grupos[1].itens.includes('PAP040'))
  assert.equal(cidade('corumba').entrega.tipo, 'nao-possui')
  assert.equal(cidade('ponta-pora').entrega.tipo, 'nao-possui')
  assert.equal(cidade('tres-lagoas').entrega.tipo, 'incompleto')
})

test('L03: indicadores de 2018 e 2019 conferem com o texto do banco', () => {
  const v = (n) => n && n.valor
  const cg19 = ano('campo-grande', 2019)
  assert.deepEqual([v(cg19.recolhida), v(cg19.populacao), v(cg19.recuperadoTotal), v(cg19.producaoDiaria)], [7119.5, 491528, 1492.4, 1279.74])
  const cg18 = ano('campo-grande', 2018)
  assert.deepEqual([cg18.papelao, cg18.plasticos, cg18.metais, cg18.vidros, cg18.outros].map(v), [1323.9, 619.8, 109.1, 124.5, 104.3])
  assert.deepEqual(cg18.producaoDiaria, { valor: 1339.402, casas: 3 })
  assert.deepEqual([v(ano('tres-lagoas', 2019).populacao), v(ano('ponta-pora', 2018).outros), v(ano('corumba', 2019).vidros)], [113000, 0.1, 0])
})

test('L03: célula vazia na origem fica vazia, nunca zero', () => {
  const d18 = ano('dourados', 2018)
  assert.equal(d18.recuperadoTotal.valor, 420)
  assert.deepEqual([d18.papelao, d18.plasticos, d18.metais, d18.vidros, d18.outros], [null, null, null, null, null])
  assert.deepEqual(ano('dourados', 2019).outros, { valor: 0, casas: 1 })
})

test('L03: Ponta Porã é a única sem unidade na produção diária', () => {
  assert.deepEqual(legacyCityData.filter((item) => !item.producaoDiariaComUnidade).map((item) => item.slug), ['ponta-pora'])
})

test('L03: o número aparece com as casas decimais da fonte, em pt-BR', () => {
  assert.equal(formatarIndicador({ valor: 1279.74, casas: 2 }), '1.279,74')
  assert.equal(formatarIndicador({ valor: 491528, casas: 0 }), '491.528')
  assert.equal(formatarIndicador({ valor: 0, casas: 1 }), '0,0')
  assert.equal(formatarIndicador(null), '—')
})

test('L02/L03: a ficha mostra os dados do portal anterior com a fonte e a data visíveis', async () => {
  const fs = await import('node:fs')
  const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
  assert.match(ler('src/pages/CityPages.tsx'), /<DadosDoPortalAnterior slug=\{city\.slug\} nome=\{city\.name\} \/>/)
  const bloco = ler('src/components/DadosDoPortalAnterior.tsx')
  assert.match(bloco, /<caption>/)
  assert.match(bloco, /scope="col"/)
  assert.match(bloco, /scope="row"/)
  assert.match(bloco, /tabIndex=\{0\}/, 'a tabela rola por teclado no celular')
  for (const texto of ['Locais de entrega voluntária', 'Coleta seletiva em 2018 e 2019', 'Fonte: portal anterior (dados de 2018 e 2019)', 'Em migração', 'Ver locais no mapa', 'no portal anterior']) assert.ok(bloco.includes(texto), texto)
})
