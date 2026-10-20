// Envia public/uploads/ (PDFs, imagens e documentos do WordPress) para um bucket público do Supabase Storage.
// A Vercel encaminha /uploads/* para esse bucket (vercel.json), então as URLs do site não mudam.
// Uso:
//   node scripts/upload-to-supabase.mjs --dry-run      confere os arquivos sem enviar nada
//   SUPABASE_URL=https://<projeto>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<chave> node scripts/upload-to-supabase.mjs
// A chave secreta (sb_secret_…, ou a service_role antiga) dá acesso total ao projeto: use só no terminal, nunca em arquivo versionado nem na Vercel.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const origem = path.join(root, 'public/uploads')
const BUCKET = 'uploads'
const LIMITE = 50 * 1024 * 1024 // arquivo máximo do plano gratuito
const TOTAL_GRATUITO = 1024 * 1024 * 1024 // 1 GB de armazenamento
const SIMULTANEOS = 3 // mais que isso e o Storage corta a conexão (ENHANCE_YOUR_CALM)
const TENTATIVAS = 6
const espera = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const dryRun = process.argv.includes('--dry-run')
const TIPOS = { pdf: 'application/pdf', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml', doc: 'application/msword', docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', xls: 'application/vnd.ms-excel', xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }

const arquivos = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? arquivos(path.join(dir, e.name)) : [path.join(dir, e.name)]))
const todos = arquivos(origem).map((arquivo) => ({ arquivo, chave: path.relative(origem, arquivo).split(path.sep).join('/'), bytes: fs.statSync(arquivo).size }))
// O Storage rejeita chaves com acento ou caracteres especiais.
const aceita = (chave) => /^[A-Za-z0-9._\-/]+$/.test(chave)
const enviar = todos.filter((f) => aceita(f.chave) && f.bytes <= LIMITE)
const puladas = todos.filter((f) => !enviar.includes(f))
const bytes = enviar.reduce((soma, f) => soma + f.bytes, 0)

console.log(`${enviar.length} arquivos, ${(bytes / 1048576).toFixed(0)} MB de 1024 MB do plano gratuito.`)
for (const f of puladas) console.log(`  pulado: ${f.chave} (${aceita(f.chave) ? 'acima de 50 MB' : 'nome com acento ou caractere especial'})`)
if (bytes > TOTAL_GRATUITO) throw new Error('acima do armazenamento do plano gratuito')
if (dryRun) process.exit(0)

const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY: chave } = process.env
if (!SUPABASE_URL || !chave) throw new Error('defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY')
const base = SUPABASE_URL.replace(/\/+$/, '')
// Chave nova (sb_secret_…) não é um JWT: vai só em apikey. A antiga (service_role, JWT) também vai em Authorization.
const cabecalho = chave.startsWith('sb_') ? { apikey: chave } : { Authorization: `Bearer ${chave}`, apikey: chave }

const criar = await comTentativas(() => fetch(`${base}/storage/v1/bucket`, { method: 'POST', headers: { ...cabecalho, 'Content-Type': 'application/json' }, body: JSON.stringify({ id: BUCKET, name: BUCKET, public: true, file_size_limit: LIMITE }) }))
if (!criar.ok && !/already exists|Duplicate/i.test(await criar.text())) throw new Error(`não criou o bucket (${criar.status})`)

// Repete quando a conexão cai ou o Storage pede calma (429, 5xx); espera mais a cada tentativa.
async function comTentativas(fazer) {
  let ultimo
  for (let tentativa = 1; tentativa <= TENTATIVAS; tentativa++) {
    try {
      const resposta = await fazer()
      if (resposta.status !== 429 && resposta.status < 500) return resposta
      ultimo = `HTTP ${resposta.status}`
    } catch (erro) {
      ultimo = erro.cause?.code ?? erro.message
    }
    await espera(1000 * 2 ** tentativa)
  }
  throw new Error(ultimo)
}

let feitos = 0
let jaEstavam = 0
const falhas = []
const fila = [...enviar]
const publico = (chave) => `${base}/storage/v1/object/public/${BUCKET}/${chave.split('/').map(encodeURIComponent).join('/')}`
await Promise.all(Array.from({ length: SIMULTANEOS }, async () => {
  while (fila.length) {
    const f = fila.shift()
    try {
      // Já está no bucket com o mesmo tamanho: pula, assim um envio interrompido retoma de onde parou.
      const existente = await comTentativas(() => fetch(publico(f.chave), { method: 'HEAD' }))
      if (existente.ok && Number(existente.headers.get('content-length')) === f.bytes) { jaEstavam++; continue }
      const tipo = TIPOS[path.extname(f.chave).slice(1).toLowerCase()] ?? 'application/octet-stream'
      const resposta = await comTentativas(() => fetch(`${base}/storage/v1/object/${BUCKET}/${f.chave.split('/').map(encodeURIComponent).join('/')}`, {
        method: 'POST',
        headers: { ...cabecalho, 'Content-Type': tipo, 'x-upsert': 'true', 'Cache-Control': 'max-age=2592000' },
        body: fs.readFileSync(f.arquivo),
      }))
      if (resposta.ok) feitos++
      else falhas.push(`${f.chave}: ${resposta.status}`)
    } catch (erro) {
      falhas.push(`${f.chave}: ${erro.message}`)
    }
    const andamento = feitos + jaEstavam + falhas.length
    if (andamento % 100 === 0) console.log(`  ${andamento}/${enviar.length}`)
  }
}))
console.log(`${feitos} enviados, ${jaEstavam} já estavam no bucket, ${falhas.length} com falha.`)
if (falhas.length) { console.log(falhas.join('\n')); console.log('Rode o comando de novo: ele só envia o que falta.'); process.exit(1) }
console.log(`Confira: ${publico(enviar[0].chave)}`)
