// Antes de publicar: falha se o vercel.json ainda aponta para o projeto Supabase de exemplo. Fora do gate.
// Uso: npm run check:vercel
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(fs.readFileSync(path.join(raiz, 'vercel.json'), 'utf8'))
const destino = config.rewrites.find((r) => r.source === '/uploads/:path*').destination
if (destino.includes('SEU-PROJETO')) {
  console.error('vercel.json ainda usa SEU-PROJETO: troque pela referência do projeto Supabase (docs/deploy.md, passo 3).')
  process.exit(1)
}
console.log(`/uploads/* → ${destino}`)
