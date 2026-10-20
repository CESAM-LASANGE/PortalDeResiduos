// Verifica os links externos do acervo (L00). Depende de rede: fica fora do check:quality.
// Uso: node scripts/check-external-links.mjs [--json saida.json]
// Para cada link: status HTTP e, no Google Drive, o nome real do arquivo (do <title> público).
import fs from 'node:fs'

const { legacyDocuments } = await import('../src/data/legacy-documents.generated.ts')
const { selectiveCollectionPlans } = await import('../src/data/selective-collection-plans.generated.ts')

const alvos = new Map()
for (const doc of legacyDocuments) if (doc.origin !== 'local') alvos.set(doc.url, { url: doc.url, onde: doc.page, rotulo: doc.label || doc.context })
for (const plano of selectiveCollectionPlans) for (const doc of plano.documents) if (!alvos.has(doc.url)) alvos.set(doc.url, { url: doc.url, onde: `plano de coleta: ${plano.name}`, rotulo: doc.title })

async function verificar(alvo) {
  try {
    const resposta = await fetch(alvo.url, { redirect: 'manual', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'portal-residuos-ms/check-external-links' } })
    const html = /drive\.google\.com/.test(alvo.url) ? await resposta.text() : ''
    const nome = html.match(/<title>(.*?) - Google Drive<\/title>/)?.[1]
    const situacao = resposta.status < 400 ? 'ok' : 'quebrado'
    return { ...alvo, status: resposta.status, situacao, nome: nome?.replace(/&amp;/g, '&') ?? null }
  } catch (erro) {
    const codigo = String(erro.cause?.code ?? erro.name)
    // Domínio que não existe mais é quebrado; timeout e outros erros de rede ficam como não verificados.
    return { ...alvo, status: 0, situacao: codigo === 'ENOTFOUND' ? 'quebrado' : 'nao-verificado', nome: null, erro: codigo }
  }
}

const resultados = []
const lista = [...alvos.values()]
for (let i = 0; i < lista.length; i += 6) resultados.push(...await Promise.all(lista.slice(i, i + 6).map(verificar)))

const falhas = resultados.filter((r) => r.situacao === 'quebrado')
const ROTULO = { ok: 'OK  ', quebrado: 'FAIL', 'nao-verificado': '??  ' }
for (const r of resultados) console.log(`${ROTULO[r.situacao]} ${String(r.status).padEnd(3)} ${r.onde.padEnd(48).slice(0, 48)} ${(r.rotulo || '').slice(0, 40).padEnd(40)} ${r.nome ?? ''}`)
const naoVerificados = resultados.filter((r) => r.situacao === 'nao-verificado').length
console.log(`\n${resultados.length} links: ${falhas.length} quebrados, ${naoVerificados} não verificados (rede).`)
const saida = process.argv.indexOf('--json')
if (saida > 0) fs.writeFileSync(process.argv[saida + 1], JSON.stringify(resultados, null, 1))
process.exit(falhas.length ? 1 : 0)
