import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { acoesDoMunicipio } from '../src/data/municipalActions.ts'
import { municipalDocumentsFrom } from '../src/data/municipalDocuments.ts'
import { legacyDocuments } from '../src/data/legacy-documents.generated.ts'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'
import { selectiveCollectionPlans } from '../src/data/selective-collection-plans.generated.ts'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const dados = {
  planos: new Map(selectiveCollectionPlans.map((p) => [p.slug, p.primaryDocumentUrl])),
  documentos: municipalDocumentsFrom(legacyDocuments, panoramaRecords.map((r) => ({ slug: r.slug, name: r.name }))),
}
const cidade = (slug) => panoramaRecords.find((r) => r.slug === slug)
const urls = (filtro, slug, incluirPlano = false) => acoesDoMunicipio(filtro, cidade(slug), dados, incluirPlano).map((a) => a.url)

test('cada filtro abre só o documento do filtro (Bonito tem os quatro)', () => {
  assert.deepEqual(urls('todos', 'bonito'), ['/uploads/2025/03/Panorama-de-Gestao-de-RS-de-Bonito_final.pdf'])
  assert.deepEqual(urls('com-plano', 'bonito'), ['https://drive.google.com/file/d/1b8YjtOiuhIl4QXnNvbq0Bgm3qG2qtjlM/view?usp=drive_link'])
  assert.deepEqual(urls('com-educacao-ambiental', 'bonito'), ['https://drive.google.com/file/d/1I1E_X5piwXUwD9r-4J6X-3sFFH-5v5fZ/view?usp=drive_link'])
  assert.deepEqual(urls('com-compostagem', 'bonito'), ['https://drive.google.com/file/d/1tZhydlhvw29lEOrzgHAvsGmJLEQEV8Te/view?usp=drive_link'])
})

test('outros municípios: Corumbá (educação ambiental) e Naviraí (compostagem), nunca o panorama', () => {
  assert.deepEqual(urls('com-educacao-ambiental', 'corumba'), ['https://drive.google.com/file/d/1Ex5UCUfVrQXO9M7UXTt-_MQW8L3TOzIv/view?usp=drive_link'])
  assert.deepEqual(urls('com-compostagem', 'navirai'), ['https://drive.google.com/file/d/100yRThASV5psm9pVBQW3YAfZNBQP1Nux/view?usp=drive_link'])
  for (const f of ['com-plano', 'com-educacao-ambiental', 'com-compostagem']) for (const r of panoramaRecords) for (const u of urls(f, r.slug)) assert.ok(!u.includes('Panorama-de-Gestao'), `${f} ${r.slug}`)
})

test('rótulos: o do filtro, e o link do plano junto do panorama só onde foi pedido', () => {
  assert.deepEqual(acoesDoMunicipio('com-compostagem', cidade('navirai'), dados).map((a) => a.rotulo), ['Documento de compostagem'])
  assert.deepEqual(acoesDoMunicipio('com-plano', cidade('bonito'), dados).map((a) => a.rotulo), ['Plano de coleta seletiva'])
  assert.deepEqual(acoesDoMunicipio('todos', cidade('bonito'), dados, true).map((a) => a.rotulo), ['Panorama · PDF', 'Plano de coleta seletiva'])
  assert.deepEqual(acoesDoMunicipio('todos', cidade('campo-grande'), dados, true).map((a) => a.rotulo), ['Panorama · PDF'])
})

test('lista e painel do mapa usam a mesma função', () => {
  const indice = ler('src/components/MunicipalityIndex.tsx')
  assert.equal((indice.match(/acoesDoMunicipio\(/g) ?? []).length, 2, 'linha e mapa')
  const mapa = ler('src/components/MunicipalityMap.tsx')
  assert.match(mapa, /atual\.acoes\.map/)
  assert.doesNotMatch(mapa, /atual\.panorama|atual\.plano/)
})

test('filtros de Panoramas na ordem: Panorama (Todos), coleta seletiva, compostagem, educação ambiental', () => {
  const ids = [...ler('src/components/MunicipalityIndex.tsx').match(/const FILTROS[\s\S]*?\n\]/)[0].matchAll(/\{ id: '([a-z-]+)'/g)].map((m) => m[1])
  assert.deepEqual(ids, ['todos', 'com-plano', 'com-compostagem', 'com-educacao-ambiental'])
})
