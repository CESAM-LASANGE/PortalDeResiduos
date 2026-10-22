import test from 'node:test'
import assert from 'node:assert/strict'
import { disposalCategories, disposalSummary } from '../src/data/municipality-disposal.generated.ts'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'

const grupo = (categoria) => Object.entries(disposalCategories).filter(([, valor]) => valor === categoria).map(([slug]) => slug).sort()

test('Figura 3 (TCE, 2024): os 79 municípios do catálogo, cada um em uma categoria', () => {
  assert.deepEqual(Object.keys(disposalCategories).sort(), panoramaRecords.map((record) => record.slug).sort())
})

test('Figura 3: totais do quadro da própria figura (75 adequada, 95%; 4 inadequada, 5%)', () => {
  assert.deepEqual(disposalSummary, { ano: 2024, fonte: 'TCE (2024)', total: 79, adequada: 75, inadequada: 4 })
  assert.equal(grupo('lixao').length, disposalSummary.inadequada)
  assert.equal(79 - grupo('lixao').length, disposalSummary.adequada)
})

test('Figura 3: os 4 lixões, os aterros públicos e privados e o transbordo', () => {
  assert.deepEqual(grupo('lixao'), ['anaurilandia', 'corumba', 'ladario', 'ponta-pora'])
  assert.deepEqual(grupo('privado'), ['campo-grande', 'dourados', 'rio-verde-de-mato-grosso', 'sidrolandia', 'tres-lagoas'])
  assert.deepEqual(grupo('publico'), ['chapadao-do-sul', 'costa-rica', 'gloria-de-dourados', 'jardim', 'navirai', 'nova-andradina', 'paranaiba', 'taquarussu'])
  assert.equal(grupo('transbordo').length, 62)
  for (const slug of ['bonito', 'aquidauana', 'maracaju', 'antonio-joao']) assert.equal(disposalCategories[slug], 'transbordo', slug)
})
