// L02 e L03: locais de entrega voluntária e indicadores de coleta seletiva de 2018 e 2019
// das 5 fichas de município do site antigo (docs/specs/legado/). Lê o texto como está:
// célula vazia fica null, nunca 0, e o número guarda as casas decimais da fonte.
// Uso: npm run sync:data
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { htmlText, loadDump, readTable } from './lib/wordpress-dump.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CIDADES = ['campo-grande', 'corumba', 'dourados', 'ponta-pora', 'tres-lagoas']
const INDICADORES = [
  ['recolhida', /^Quantidade recolhida \(T\):(.*)$/],
  ['populacao', /^População com coleta seletiva porta a porta:(.*)$/],
  ['recuperadoTotal', /^Total:(.*)$/],
  ['papelao', /^Papelão:(.*)$/],
  ['plasticos', /^Plásticos:(.*)$/],
  ['metais', /^Metais:(.*)$/],
  ['vidros', /^Vidros:(.*)$/],
  ['outros', /^Outros:(.*)$/],
]

// "1.339,402" → { valor: 1339.402, casas: 3 }; "" → null.
function numero(texto, onde) {
  const limpo = texto.replace(/ /g, ' ').trim()
  if (limpo === '') return null
  if (!/^\d{1,3}(\.\d{3})*(,\d+)?$|^\d+(,\d+)?$/.test(limpo)) throw new Error(`${onde}: "${limpo}" não é um número`)
  return { valor: Number(limpo.replace(/\./g, '').replace(',', '.')), casas: limpo.split(',')[1]?.length ?? 0 }
}

function entrega(html, texto) {
  const iframe = html.match(/<iframe[^>]*src="([^"]+)"/)
  if (iframe) return { tipo: 'mapa', url: iframe[1].replace(/&amp;/g, '&') }
  if (/não possui locais de entrega voluntária/.test(texto)) return { tipo: 'nao-possui' }
  const grupos = [...html.matchAll(/<h4>([\s\S]*?)<\/h4>\s*<p>([\s\S]*?)<\/p>/g)].map(([, titulo, itens]) => ({
    titulo: htmlText(titulo).trim(),
    itens: itens.split(/<br\s*\/?>/).map((item) => htmlText(item).trim()).filter(Boolean),
  }))
  return grupos.length ? { tipo: 'listas', grupos } : { tipo: 'incompleto' }
}

const sql = loadDump(root)
const paginas = readTable(sql, 'wp_posts').filter((post) => post.post_type === 'page' && post.post_status === 'publish')
const dados = CIDADES.map((slug) => {
  const pagina = paginas.find((post) => post.post_name === slug)
  if (!pagina) throw new Error(`falta a página publicada /cidades/${slug}/`)
  const html = pagina.post_content
  const [locais, coleta, producao] = [
    html.slice(html.indexOf('Locais de entrega voluntária'), html.indexOf('Informações sobre coleta seletiva')),
    html.slice(html.indexOf('Informações sobre coleta seletiva'), html.indexOf('Produção de Lixo Diária')),
    html.slice(html.indexOf('Produção de Lixo Diária')),
  ]
  // htmlText junta as linhas; parte em parágrafos, títulos, <br> e quebras antes de limpar.
  const linhas = (trecho) => trecho.split(/<\/?(?:p|h\d)[^>]*>|<br\s*\/?>|\n/).map((parte) => htmlText(parte).replace(/ /g, ' ').trim()).filter(Boolean)
  const porAno = (trecho) => Object.fromEntries(trecho.split(/<h3>(\d{4})<\/h3>/).slice(1).reduce((pares, parte, i, partes) => (i % 2 === 0 ? [...pares, [Number(parte), partes[i + 1]]] : pares), []))
  const coletaPorAno = porAno(coleta)
  const producaoPorAno = porAno(producao)
  const anos = [2018, 2019].map((ano) => {
    const texto = linhas(coletaPorAno[ano] ?? '')
    const registro = { ano }
    for (const [campo, padrao] of INDICADORES) {
      const linha = texto.find((item) => padrao.test(item))
      if (!linha) throw new Error(`${slug} ${ano}: falta "${campo}"`)
      registro[campo] = numero(linha.match(padrao)[1], `${slug} ${ano} ${campo}`)
    }
    const [diaria] = linhas(producaoPorAno[ano] ?? '')
    registro.producaoDiaria = numero((diaria ?? '').replace(/\(T\)/, ''), `${slug} ${ano} produção diária`)
    return registro
  })
  return {
    slug,
    publicadoEm: pagina.post_date.slice(0, 10),
    entrega: entrega(locais, htmlText(locais)),
    coleta: anos,
    producaoDiariaComUnidade: /\(T\)/.test(producao),
  }
})

const out = `// Este arquivo é gerado por scripts/generate-legacy-city-data.mjs (L02, L03).
// Fonte: fichas de município publicadas em BD/u195698278_HZYqx.sql (wp_posts). Não editar à mão.

/** Número como a fonte o escreveu: valor e casas decimais. */
export type Indicador = { valor: number; casas: number }

export type ColetaDoAno = {
  ano: 2018 | 2019
  /** Quantidade recolhida, em t. */
  recolhida: Indicador | null
  /** População com coleta seletiva porta a porta. */
  populacao: Indicador | null
  /** Materiais recuperados, em t. */
  recuperadoTotal: Indicador | null
  papelao: Indicador | null
  plasticos: Indicador | null
  metais: Indicador | null
  vidros: Indicador | null
  outros: Indicador | null
  /** Produção de lixo diária, em t. */
  producaoDiaria: Indicador | null
}

export type LocaisDeEntrega =
  | { tipo: 'mapa'; url: string }
  | { tipo: 'listas'; grupos: Array<{ titulo: string; itens: string[] }> }
  | { tipo: 'nao-possui' }
  | { tipo: 'incompleto' }

export type LegacyCityData = {
  slug: string
  /** Data de publicação da ficha no site antigo (AAAA-MM-DD). */
  publicadoEm: string
  entrega: LocaisDeEntrega
  coleta: ColetaDoAno[]
  /** false quando a fonte não escreve "(T)" na produção diária. */
  producaoDiariaComUnidade: boolean
}

export const legacyCityData: LegacyCityData[] = ${JSON.stringify(dados, null, 2)}
`
fs.writeFileSync(path.join(root, 'src/data/legacy-city-data.generated.ts'), out)
console.log(`Dados das cidades do legado: ${dados.map((item) => `${item.slug} (${item.entrega.tipo})`).join(', ')}.`)
