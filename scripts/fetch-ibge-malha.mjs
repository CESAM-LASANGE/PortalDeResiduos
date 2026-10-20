// L01. Baixa da API do IBGE os limites e os nomes oficiais dos 79 municípios de MS para BD/ibge/.
// Usa rede, por isso fica fora de sync:data e do check:quality; o gerador do mapa lê só os arquivos gravados.
// Uso: node scripts/fetch-ibge-malha.mjs
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const destino = path.join(root, 'BD/ibge')
const FONTES = {
  'ms-municipios-malha.geojson': 'https://servicodados.ibge.gov.br/api/v3/malhas/estados/50?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=municipio',
  'ms-municipios-nomes.json': 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/50/municipios',
}

fs.mkdirSync(destino, { recursive: true })
for (const [arquivo, url] of Object.entries(FONTES)) {
  const resposta = await fetch(url)
  if (!resposta.ok) throw new Error(`${url} respondeu ${resposta.status}`)
  const dados = await resposta.json()
  fs.writeFileSync(path.join(destino, arquivo), `${JSON.stringify(dados)}\n`)
  console.log(`${arquivo}: ${dados.features?.length ?? dados.length} municípios`)
}
const data = new Date().toISOString().slice(0, 10)
fs.writeFileSync(path.join(destino, 'FONTE.md'), `# Malha municipal de MS (IBGE)

Baixada em ${data} por \`scripts/fetch-ibge-malha.mjs\`. Não editar à mão.

${Object.entries(FONTES).map(([arquivo, url]) => `- \`${arquivo}\`: <${url}>`).join('\n')}
`)
