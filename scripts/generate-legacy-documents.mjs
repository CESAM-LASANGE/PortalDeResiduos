// L00: links de documento das páginas publicadas do WordPress (docs/specs/legado/).
// Grava o rótulo do link e o texto que vem logo antes dele, sem interpretar.
// Uso: npm run sync:data
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { htmlText, loadDump, publishedPages } from './lib/wordpress-dump.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PORTAL = /^https?:\/\/portalresiduosms\.online/
const IGNORAR = /\.(png|jpe?g|gif|svg|webp|css|js)(\?|$)|unpkg\.com|jsdelivr\.net|cdnjs\.|fonts\.(googleapis|gstatic)|demo\.phlox\.pro/i

function classify(url) {
  const drive = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/)
  if (drive) return { origin: 'drive', driveId: drive[1] }
  if (PORTAL.test(url)) {
    const upload = url.match(/\/wp-content(\/uploads\/[^?#]+\.(?:pdf|docx?|xlsx?))$/i)
    return upload ? { origin: 'local', localPath: upload[1] } : null
  }
  return /^https?:\/\//.test(url) ? { origin: 'external' } : null
}

const docs = []
for (const page of publishedPages(loadDump(root))) {
  const html = page.post_content ?? ''
  const tag = /<(a|iframe)\b[^>]*?\b(?:href|src)="([^"]+)"[^>]*>/gi
  let m
  while ((m = tag.exec(html))) {
    const [, kind, url] = m
    if (IGNORAR.test(url)) continue
    const info = classify(url)
    if (!info) continue
    const isLink = kind.toLowerCase() === 'a'
    const label = isLink ? htmlText(html.slice(tag.lastIndex, html.indexOf('</a>', tag.lastIndex))) : ''
    // Texto do último bloco antes do link: título de artigo, subtítulo "Parte 1"…
    const before = html.slice(Math.max(0, m.index - 4000), m.index)
    const blocks = [...before.matchAll(/>([^<>]+)</g)].map((b) => htmlText(b[1])).filter(Boolean)
    docs.push({ page: page.path, kind: isLink ? 'link' : 'embed', label, context: blocks.at(-1) ?? '', url, ...info })
  }
}

const out = `// Este arquivo é gerado por scripts/generate-legacy-documents.mjs.
// Fonte: páginas publicadas em BD/u195698278_HZYqx.sql (wp_posts). Não editar à mão.

export type LegacyDocument = {
  /** Caminho da página no site antigo. */
  page: string
  kind: 'link' | 'embed'
  /** Texto do link no site antigo ("" para conteúdo incorporado). */
  label: string
  /** Texto do bloco imediatamente anterior ao link (título de artigo, subtítulo). */
  context: string
  url: string
  origin: 'local' | 'drive' | 'external'
  driveId?: string
  localPath?: string
}

export const legacyDocuments: LegacyDocument[] = ${JSON.stringify(docs, null, 2)}
`
fs.writeFileSync(path.join(root, 'src/data/legacy-documents.generated.ts'), out)
console.log(`Documentos do legado: ${docs.length} links em ${new Set(docs.map((d) => d.page)).size} páginas.`)
