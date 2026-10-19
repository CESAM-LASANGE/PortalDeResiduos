// Leitura do dump MySQL do WordPress em BD/ (fonte de migração, nunca alterada).
// Sem dependências: um tokenizador de INSERT ... VALUES (...), (...);
import fs from 'node:fs'
import path from 'node:path'

const ESCAPES = { n: '\n', r: '\r', t: '\t', 0: '\0' }

/** Linhas de um INSERT, como arrays de strings (ou null para NULL). */
function* parseValues(text, start) {
  let i = start
  const n = text.length
  while (i < n) {
    const c = text[i]
    if (c === ';') return
    if (c !== '(') { i += 1; continue }
    i += 1
    const row = []
    for (;;) {
      while (text[i] === ' ' || text[i] === '\n') i += 1
      if (text[i] === "'") {
        i += 1
        let value = ''
        for (;;) {
          const ch = text[i]
          if (ch === '\\') { value += ESCAPES[text[i + 1]] ?? text[i + 1]; i += 2; continue }
          if (ch === "'") {
            if (text[i + 1] === "'") { value += "'"; i += 2; continue }
            i += 1
            break
          }
          value += ch
          i += 1
        }
        row.push(value)
      } else {
        const begin = i
        while (text[i] !== ',' && text[i] !== ')') i += 1
        const raw = text.slice(begin, i).trim()
        row.push(raw === 'NULL' ? null : raw)
      }
      while (text[i] === ' ') i += 1
      if (text[i] === ',') { i += 1; continue }
      i += 1
      break
    }
    yield row
  }
}

/** Todas as linhas de uma tabela, como objetos { coluna: valor }. */
export function readTable(sql, table) {
  const create = sql.match(new RegExp('CREATE TABLE `' + table + '` \\(([\\s\\S]*?)\\n\\)'))
  if (!create) throw new Error(`Tabela ${table} não encontrada no dump`)
  const columns = [...create[1].matchAll(/^\s*`([^`]+)`/gm)].map((m) => m[1])
  const rows = []
  const marker = 'INSERT INTO `' + table + '`'
  let at = sql.indexOf(marker)
  while (at !== -1) {
    const values = sql.indexOf('VALUES', at) + 'VALUES'.length
    for (const row of parseValues(sql, values)) rows.push(Object.fromEntries(columns.map((col, k) => [col, row[k]])))
    at = sql.indexOf(marker, values)
  }
  return rows
}

/** Caminho público de uma página (slugs dos pais + o próprio), como o WordPress montava. */
export function pagePath(page, byId) {
  const parts = [page.post_name]
  let parent = page.post_parent
  while (parent && parent !== '0' && byId.has(parent)) {
    const p = byId.get(parent)
    parts.unshift(p.post_name)
    parent = p.post_parent
  }
  return `/${parts.join('/')}/`
}

export function loadDump(root) {
  return fs.readFileSync(path.join(root, 'BD', 'u195698278_HZYqx.sql'), 'utf8')
}

/** Páginas publicadas, com o caminho público já calculado. */
export function publishedPages(sql) {
  const posts = readTable(sql, 'wp_posts')
  const byId = new Map(posts.map((p) => [p.ID, p]))
  return posts
    .filter((p) => p.post_type === 'page' && p.post_status === 'publish')
    .map((p) => ({ ...p, path: pagePath(p, byId) }))
}

const ENTIDADES = { '&amp;': '&', '&nbsp;': ' ', '&quot;': '"', '&#8211;': '–', '&#8212;': '—', '&#8217;': '’', '&#039;': "'" }

/** Texto visível de um trecho de HTML. */
export function htmlText(html) {
  return html
    .replace(/<(style|script)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[#a-z0-9]+;/gi, (e) => ENTIDADES[e] ?? e)
    .replace(/\s+/g, ' ')
    .trim()
}
