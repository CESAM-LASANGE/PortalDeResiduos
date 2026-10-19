import test from 'node:test'
import assert from 'node:assert/strict'
import { municipalityShapes, mapViewBox } from '../src/data/municipality-map.generated.ts'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'

const porSlug = new Map(municipalityShapes.map((shape) => [shape.slug, shape]))

test('L01: um contorno do IBGE e um marcador para cada um dos 79 municípios do catálogo', () => {
  assert.equal(municipalityShapes.length, 79)
  assert.deepEqual([...porSlug.keys()].sort(), panoramaRecords.map((record) => record.slug).sort())
  for (const shape of municipalityShapes) assert.match(shape.d, /^M-?\d/, shape.slug)
})

test('L01: os marcadores usam as coordenadas do mapa do site antigo', () => {
  assert.deepEqual([porSlug.get('maracaju').lat, porSlug.get('maracaju').lng, porSlug.get('maracaju').posicao], [-21.6145, -55.1683, 'banco'])
  assert.deepEqual([porSlug.get('antonio-joao').lat, porSlug.get('antonio-joao').lng], [-22.1928, -55.9517])
  assert.equal(porSlug.get('antonio-joao').name, 'Antônio João')
})

test('L01: coordenada do banco fora do próprio município vai para o centro do contorno oficial', () => {
  // Novo Horizonte do Sul: o site antigo o punha em Nova Andradina. Rochedo: a malha simplificada desloca a divisa.
  assert.deepEqual(municipalityShapes.filter((shape) => shape.posicao === 'ibge').map((shape) => shape.slug).sort(), ['novo-horizonte-do-sul', 'rochedo'])
  assert.notEqual(porSlug.get('novo-horizonte-do-sul').lat, -22.2189)
})

test('L01: todo marcador fica dentro da área desenhada', () => {
  const [, , largura, altura] = mapViewBox.split(' ').map(Number)
  for (const { slug, x, y } of municipalityShapes) assert.ok(x > 0 && x < largura && y > 0 && y < altura, slug)
})
