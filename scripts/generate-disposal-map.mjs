// Situação dos municípios quanto à disposição final dos RSD em 2024 (Figura 3 do Relatório Técnico de Conclusão,
// fonte TCE). A classificação por município só existe na imagem (BD/relatorio/FONTE.md): o script alinha a imagem
// à malha do IBGE, deixa cada município "votar" pelas cores dos seus pixels e confere os totais do quadro da figura
// (75 adequada, 4 inadequada). Se algo não bater, falha em vez de gravar um dado duvidoso. Sem dependências.
// Uso: npm run sync:data
import fs from 'node:fs'
import path from 'node:path'
import zlib from 'node:zlib'
import { fileURLToPath } from 'node:url'
import { panoramaRecords } from '../src/data/panoramas.generated.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Quadro da própria figura ("Situação Atual 2024").
const QUADRO = { ano: 2024, fonte: 'TCE (2024)', total: 79, adequada: 75, inadequada: 4 }
// Cores da legenda, lidas na imagem (a figura é um JPEG: tolerância de cor).
const CORES = { lixao: [225, 25, 27], publico: [50, 160, 43], privado: [54, 211, 86], transbordo: [98, 179, 200] }
const TOLERANCIA = 38
const FORCA_MINIMA = 0.3 // fração dos pixels do município que precisa ter a cor vencedora
const ANTES_DA_LEGENDA = 895 // o mapa fica à esquerda da tabela e da legenda

const normalize = (value) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z]/g, '')

// PNG de 8 bits, RGB ou RGBA, sem entrelaçamento (o que `pdfimages -png` grava).
function lerPng(buffer) {
  let pos = 8, largura, altura, tipo
  const idat = []
  while (pos < buffer.length) {
    const tamanho = buffer.readUInt32BE(pos)
    const nome = buffer.toString('ascii', pos + 4, pos + 8)
    const dados = buffer.subarray(pos + 8, pos + 8 + tamanho)
    pos += 12 + tamanho
    if (nome === 'IHDR') { largura = dados.readUInt32BE(0); altura = dados.readUInt32BE(4); tipo = dados[9]; if (dados[8] !== 8 || dados[12] !== 0) throw new Error('PNG de 8 bits sem entrelaçamento esperado') }
    if (nome === 'IDAT') idat.push(dados)
  }
  const bpp = tipo === 2 ? 3 : tipo === 6 ? 4 : 0
  if (!bpp) throw new Error(`tipo de cor ${tipo} não suportado`)
  const bruto = zlib.inflateSync(Buffer.concat(idat))
  const linha = largura * bpp
  const pixels = Buffer.alloc(altura * linha)
  const paeth = (a, b, c) => { const p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? b : c }
  for (let y = 0; y < altura; y++) {
    const filtro = bruto[y * (linha + 1)]
    for (let x = 0; x < linha; x++) {
      const a = x >= bpp ? pixels[y * linha + x - bpp] : 0
      const b = y ? pixels[(y - 1) * linha + x] : 0
      const c = x >= bpp && y ? pixels[(y - 1) * linha + x - bpp] : 0
      const v = bruto[y * (linha + 1) + 1 + x]
      pixels[y * linha + x] = (filtro === 0 ? v : filtro === 1 ? v + a : filtro === 2 ? v + b : filtro === 3 ? v + ((a + b) >> 1) : v + paeth(a, b, c)) & 255
    }
  }
  return { largura, altura, pixel: (x, y) => { const i = y * linha + x * bpp; return [pixels[i], pixels[i + 1], pixels[i + 2]] } }
}

const imagem = lerPng(fs.readFileSync(path.join(root, 'BD/relatorio/figura-3-situacao-2024.png')))
const categoria = (rgb) => {
  let melhor = null, menor = Infinity
  for (const [nome, cor] of Object.entries(CORES)) { const d = Math.hypot(rgb[0] - cor[0], rgb[1] - cor[1], rgb[2] - cor[2]); if (d < menor) { menor = d; melhor = nome } }
  return menor < TOLERANCIA ? melhor : null
}

// Caixa do mapa na imagem = caixa da malha do IBGE (a figura usa longitude e latitude sem projeção).
let x0 = Infinity, x1 = -1, y0 = Infinity, y1 = -1
for (let y = 0; y < imagem.altura; y++) for (let x = 0; x < ANTES_DA_LEGENDA; x++) {
  if (!categoria(imagem.pixel(x, y))) continue
  if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y
}
const malha = JSON.parse(fs.readFileSync(path.join(root, 'BD/ibge/ms-municipios-malha.geojson'), 'utf8'))
const nomesIbge = new Map(JSON.parse(fs.readFileSync(path.join(root, 'BD/ibge/ms-municipios-nomes.json'), 'utf8')).map((m) => [String(m.id), m.nome]))
const poligonos = (geometry) => (geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates)
const pontos = malha.features.flatMap((f) => poligonos(f.geometry).flat(2))
const [minLng, maxLng] = [Math.min(...pontos.map((p) => p[0])), Math.max(...pontos.map((p) => p[0]))]
const [minLat, maxLat] = [Math.min(...pontos.map((p) => p[1])), Math.max(...pontos.map((p) => p[1]))]
const razaoImagem = (x1 - x0) / (y1 - y0), razaoMalha = (maxLng - minLng) / (maxLat - minLat)
if (Math.abs(razaoImagem / razaoMalha - 1) > 0.02) throw new Error(`a imagem não tem as proporções da malha do IBGE (${razaoImagem.toFixed(3)} contra ${razaoMalha.toFixed(3)})`)
const naImagem = ([lng, lat]) => [x0 + ((lng - minLng) / (maxLng - minLng)) * (x1 - x0), y0 + ((maxLat - lat) / (maxLat - minLat)) * (y1 - y0)]
const dentro = ([x, y], anel) => {
  let c = false
  for (let i = 0, j = anel.length - 1; i < anel.length; j = i++) {
    const [xi, yi] = anel[i], [xj, yj] = anel[j]
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}

const porSlug = new Map(panoramaRecords.map((r) => [normalize(r.name), r.slug]))
const resultado = {}
for (const feature of malha.features) {
  const nome = nomesIbge.get(String(feature.properties.codarea))
  const slug = porSlug.get(normalize(nome))
  if (!slug) throw new Error(`"${nome}" não corresponde a nenhum município do catálogo`)
  const votos = {}
  let total = 0
  for (const [externo, ...furos] of poligonos(feature.geometry)) {
    const anel = externo.map(naImagem), aneisFuros = furos.map((f) => f.map(naImagem))
    const [xa, xb] = [Math.floor(Math.min(...anel.map((p) => p[0]))), Math.ceil(Math.max(...anel.map((p) => p[0])))]
    const [ya, yb] = [Math.floor(Math.min(...anel.map((p) => p[1]))), Math.ceil(Math.max(...anel.map((p) => p[1])))]
    for (let y = ya; y <= yb; y++) for (let x = xa; x <= xb; x++) {
      if (!dentro([x, y], anel) || aneisFuros.some((f) => dentro([x, y], f))) continue
      total++
      const c = categoria(imagem.pixel(x, y))
      if (c) votos[c] = (votos[c] ?? 0) + 1
    }
  }
  const [vencedora, n] = Object.entries(votos).sort((a, b) => b[1] - a[1])[0] ?? []
  if (!vencedora || n / total < FORCA_MINIMA) throw new Error(`${nome}: leitura incerta da figura (${vencedora ?? 'sem cor'}, ${total ? (n / total).toFixed(2) : 0} dos pixels)`)
  resultado[slug] = vencedora
}

const lixoes = Object.values(resultado).filter((c) => c === 'lixao').length
if (Object.keys(resultado).length !== QUADRO.total || lixoes !== QUADRO.inadequada || QUADRO.total - lixoes !== QUADRO.adequada)
  throw new Error(`a leitura não fecha com o quadro da figura: ${lixoes} lixões, esperados ${QUADRO.inadequada}`)

const ordenado = Object.fromEntries(Object.entries(resultado).sort(([a], [b]) => a.localeCompare(b)))
const out = `// Este arquivo é gerado por scripts/generate-disposal-map.mjs. Não editar à mão.
// Fonte: Figura 3 do Relatório Técnico de Conclusão — Etapa 1.1 (Convênio MPMS | UEMS), "Situação dos municípios
// quanto à disposição final dos RSD em 2024" (fonte TCE, 2024), lida da imagem em BD/relatorio/.

export type DisposalCategory = 'publico' | 'privado' | 'transbordo' | 'lixao'

/** Aterro sanitário público ou privado, transbordo e transporte para aterro de outro município, ou lixão. */
export const disposalCategories: Record<string, DisposalCategory> = ${JSON.stringify(ordenado, null, 2)}

/** Quadro "Situação Atual 2024" da figura. Adequada = todas as categorias menos lixão. */
export const disposalSummary = ${JSON.stringify(QUADRO, null, 2)} as const
`
fs.writeFileSync(path.join(root, 'src/data/municipality-disposal.generated.ts'), out)
const contagem = Object.values(resultado).reduce((c, v) => ({ ...c, [v]: (c[v] ?? 0) + 1 }), {})
console.log(`Disposição final 2024: ${JSON.stringify(contagem)}; ${QUADRO.adequada} adequada e ${QUADRO.inadequada} inadequada, como no quadro da figura.`)
