import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const hub = ler('src/pages/ProductionPages.tsx').match(/export function ProductionHub[\s\S]*?\n\}/)[0]
const css = ler('src/styles/pages.css')

test('Produções do Convênio: as produções são cards em grade, não uma lista', () => {
  assert.match(hub, /className="container production-grid"/)
  assert.match(hub, /<article key=\{producao\.id\} id=\{producao\.id\} className="production-card"/)
  assert.doesNotMatch(hub, /production-item|production-list/)
  assert.match(hub, /production-anchors/, 'os atalhos do topo continuam')
})

test('card: rótulo, título, texto e ações, com as ações no pé e cards da mesma altura', () => {
  assert.match(css, /\.production-grid \{[^}]*display: grid[^}]*grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/)
  assert.match(css, /\.production-card \{[^}]*display: flex[^}]*flex-direction: column[^}]*background: var\(--paper-raised\)/)
  assert.match(css, /\.production-card p \{[^}]*flex: 1/)
  assert.match(css, /@media \(max-width: 1080px\)[\s\S]*?\.production-grid \{[^}]*repeat\(2, /)
  assert.match(css, /@media \(max-width: 700px\)[\s\S]*?\.production-grid \{[^}]*grid-template-columns: 1fr/)
})
