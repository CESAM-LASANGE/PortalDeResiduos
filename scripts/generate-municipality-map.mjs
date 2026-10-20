// L01: mapa dos 79 municípios (docs/specs/legado/L01-mapa-interativo-dos-municipios.md).
// Contornos: malha do IBGE em BD/ibge/ (scripts/fetch-ibge-malha.mjs). Marcadores: coordenadas do widget
// do mapa do site antigo (_elementor_data da página 979). Coordenada fora do próprio município vai para o
// centro do contorno oficial. Nada é digitado à mão.
// Uso: npm run sync:data
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadDump, readTable } from './lib/wordpress-dump.mjs'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PAGINA_DO_MAPA = '979'
const LARGURA = 1000
const MARGEM = 12

const normalize = (value) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '')
const lerJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'))
const slugPorNome = new Map(panoramaRecords.map((record) => [normalize(record.name), record]))
const registro = (nome, fonte) => {
  const record = slugPorNome.get(normalize(nome))
  if (!record) throw new Error(`${fonte}: "${nome}" não corresponde a nenhum município do catálogo`)
  return record
}

// Marcadores do site antigo.
const meta = readTable(loadDump(root), 'wp_postmeta').find((row) => String(row.post_id) === PAGINA_DO_MAPA && row.meta_key === '_elementor_data')
const html = []
const percorrer = (node) => {
  if (Array.isArray(node)) node.forEach(percorrer)
  else if (node && typeof node === 'object') {
    if (node.settings?.html) html.push(node.settings.html)
    percorrer(node.elements)
  }
}
percorrer(JSON.parse(meta.meta_value))
const marcadores = new Map()
for (const [, lat, lng, nome] of html.join('\n').matchAll(/addCityMarker\((-?\d+\.\d+),\s*(-?\d+\.\d+),\s*"([^"]+)"/g)) {
  marcadores.set(registro(nome, 'mapa do site antigo').slug, { lat: Number(lat), lng: Number(lng) })
}

// Contornos do IBGE.
const nomesIbge = new Map(lerJson('BD/ibge/ms-municipios-nomes.json').map((m) => [String(m.id), m.nome]))
const malha = lerJson('BD/ibge/ms-municipios-malha.geojson')
const poligonos = (geometry) => (geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates)
const dentro = ([x, y], anel) => {
  let c = false
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i]
    const [xj, yj] = anel[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}
const dentroDoMunicipio = (ponto, geometry) => poligonos(geometry).some(([externo, ...furos]) => dentro(ponto, externo) && !furos.some((furo) => dentro(ponto, furo)))
// Centroide do maior anel externo (fórmula do polígono).
const centro = (geometry) => {
  let melhor = { area: 0, x: 0, y: 0 }
  for (const [anel] of poligonos(geometry)) {
    let a = 0, cx = 0, cy = 0
    for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
      const f = anel[j][0] * anel[i][1] - anel[i][0] * anel[j][1]
      a += f; cx += (anel[j][0] + anel[i][0]) * f; cy += (anel[j][1] + anel[i][1]) * f
    }
    if (Math.abs(a) > Math.abs(melhor.area)) melhor = { area: a, x: cx / (3 * a), y: cy / (3 * a) }
  }
  return [melhor.x, melhor.y]
}

// Projeção equirretangular com a escala de longitude na latitude média.
const todos = malha.features.flatMap((feature) => poligonos(feature.geometry).flat(2))
const [minLng, maxLng] = [Math.min(...todos.map((p) => p[0])), Math.max(...todos.map((p) => p[0]))]
const [minLat, maxLat] = [Math.min(...todos.map((p) => p[1])), Math.max(...todos.map((p) => p[1]))]
const kx = Math.cos((((minLat + maxLat) / 2) * Math.PI) / 180)
const escala = (LARGURA - 2 * MARGEM) / ((maxLng - minLng) * kx)
const projetar = ([lng, lat]) => [MARGEM + (lng - minLng) * kx * escala, MARGEM + (maxLat - lat) * escala]
const altura = Math.ceil(2 * MARGEM + (maxLat - minLat) * escala)
const caminho = (geometry) => poligonos(geometry).flat().map((anel) => {
  const pontos = anel.map((p) => projetar(p).map(Math.round))
  let [px, py] = pontos[0]
  let d = `M${px} ${py}`
  for (const [x, y] of pontos.slice(1)) {
    if (x === px && y === py) continue
    d += `l${x - px} ${y - py}`
    ;[px, py] = [x, y]
  }
  return `${d}z`
}).join('')

const formas = malha.features.map((feature) => {
  const record = registro(nomesIbge.get(String(feature.properties.codarea)), 'malha do IBGE')
  const marcador = marcadores.get(record.slug)
  if (!marcador) throw new Error(`mapa do site antigo: falta o marcador de ${record.name}`)
  const doBanco = dentroDoMunicipio([marcador.lng, marcador.lat], feature.geometry)
  const [lng, lat] = doBanco ? [marcador.lng, marcador.lat] : centro(feature.geometry)
  if (!dentroDoMunicipio([lng, lat], feature.geometry)) throw new Error(`${record.name}: o centro do contorno fica fora do município`)
  const [x, y] = projetar([lng, lat]).map((v) => Math.round(v * 10) / 10)
  return { slug: record.slug, name: record.name, lat: doBanco ? lat : Number(lat.toFixed(4)), lng: doBanco ? lng : Number(lng.toFixed(4)), posicao: doBanco ? 'banco' : 'ibge', x, y, d: caminho(feature.geometry) }
}).sort((a, b) => a.slug.localeCompare(b.slug))

const out = `// Este arquivo é gerado por scripts/generate-municipality-map.mjs (L01).
// Fonte: BD/ibge/ (malha municipal do IBGE) + mapa do site antigo em BD/u195698278_HZYqx.sql. Não editar à mão.

export type MunicipalityShape = {
  slug: string
  name: string
  lat: number
  lng: number
  /** "banco": coordenada do mapa do site antigo; "ibge": centro do contorno, porque a do banco cai fora do município. */
  posicao: 'banco' | 'ibge'
  /** Posição do marcador no viewBox. */
  x: number
  y: number
  /** Contorno do município em caminho SVG. */
  d: string
}

export const mapViewBox = '0 0 ${LARGURA} ${altura}'

export const municipalityShapes: MunicipalityShape[] = ${JSON.stringify(formas, null, 2)}
`
fs.writeFileSync(path.join(root, 'src/data/municipality-map.generated.ts'), out)
const corrigidos = formas.filter((forma) => forma.posicao === 'ibge').map((forma) => forma.name)
console.log(`Mapa: ${formas.length} municípios; marcador no centro do contorno: ${corrigidos.join(', ') || 'nenhum'}.`)
