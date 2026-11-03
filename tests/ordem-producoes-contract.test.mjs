import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const src = fs.readFileSync(new URL('../src/pages/ProductionPages.tsx', import.meta.url), 'utf8')
const secao = (id) => src.match(new RegExp(`\\{ id: '${id}', eyebrow:[^\\n]*\\},?\\n`))[0]

test('Produções do Convênio: Panorama, Coleta seletiva, Compostagem e Educação ambiental, de cima para baixo, no começo', () => {
  const ids = [...src.matchAll(/\{ id: '([a-z-]+)', eyebrow:/g)].map((m) => m[1])
  assert.deepEqual(ids.slice(0, 4), ['panoramas', 'coleta-seletiva', 'compostagem', 'educacao-ambiental'])
  assert.deepEqual(ids.slice(4), ['apoio-a-decisao', 'materiais-compilados', 'projeto-valoriza', 'disposicao-legal', 'usinas-de-triagem', 'cooperativas'], 'as demais seguem na ordem de antes')
})

test('cada um desses produtos tem o próprio card, sem repetir o link do outro', () => {
  assert.match(secao('coleta-seletiva'), /title: 'Plano de coleta seletiva'[\s\S]*href: '\/plano-de-coleta-seletiva\/'/)
  assert.match(secao('compostagem'), /title: 'Plano de compostagem'[\s\S]*href: '\/plano-de-compostagem\/'/)
  assert.match(secao('compostagem'), /arquivo\('Cartilha de compostagem acelerada'\)/)
  assert.doesNotMatch(secao('educacao-ambiental'), /plano-de-compostagem|Cartilha de compostagem/)
  assert.doesNotMatch(secao('materiais-compilados'), /plano-de-coleta-seletiva/)
})
