import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const raiz = new URL('../', import.meta.url)
const html = fs.readFileSync(new URL('index.html', raiz), 'utf8')

test('favicon: SVG para navegadores atuais, ICO de reserva e ícone para a tela inicial do iOS', () => {
  assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml" \/>/)
  assert.match(html, /<link rel="icon" href="\/favicon\.ico" sizes="32x32" \/>/)
  assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png" \/>/)
  for (const arquivo of ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png']) assert.ok(fs.existsSync(new URL(`public/${arquivo}`, raiz)), arquivo)
})

test('favicon: o SVG usa as cores do selo do projeto', () => {
  const svg = fs.readFileSync(new URL('public/favicon.svg', raiz), 'utf8')
  for (const cor of ['#d2e28b', '#a9cf46', '#d0e1e3']) assert.ok(svg.includes(cor), cor)
  assert.ok(svg.length < 1024, 'favicon leve')
})
