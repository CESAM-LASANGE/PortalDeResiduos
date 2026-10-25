import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const config = JSON.parse(ler('vercel.json'))
const csp = Object.fromEntries(config.headers.find((h) => h.source === '/(.*)').headers.find((h) => h.key === 'Content-Security-Policy').value.split(';').map((d) => d.trim().split(/\s+(.*)/s)).filter(([nome]) => nome))

test('GRS: os três vídeos do guia vêm do Drive, na ordem Partes 1, 2 e 3', async () => {
  const { videosDoGuiaFrom } = await import('../src/data/grsVideos.ts')
  const { legacyDocuments } = await import('../src/data/legacy-documents.generated.ts')
  const videosDoGuia = videosDoGuiaFrom(legacyDocuments)
  assert.deepEqual(videosDoGuia.map((v) => [v.parte, v.driveId]), [
    [1, '1hI44A4QRaJEqHI_YH6XzQVB1BnU_F6T-'],
    [2, '1yxW_8TKnAdviydhHauPpnHFOckaHDFIQ'],
    [3, '1H_swkYCo0WZSdU0ovMCC3c--ERkrN-E8'],
  ])
  for (const v of videosDoGuia) assert.equal(v.embed, `https://drive.google.com/file/d/${v.driveId}/preview`)
})

test('GRS: a política de segurança libera o player do Drive, e só ele além do Power BI', () => {
  assert.deepEqual(csp['frame-src'].split(' ').sort(), ['https://app.powerbi.com', 'https://drive.google.com'])
})

test('GRS: Apoio a Decisão traz "Como usar" com vídeo e manual junto do sistema; o guia usa os mesmos dados', () => {
  const recursos = ler('src/pages/ResourcePages.tsx')
  const apoio = recursos.match(/export function DecisionSupport[\s\S]*?\n\}/)[0]
  assert.match(apoio, /<ToolPanel[\s\S]*<GrsComoUsar \/>[\s\S]*<DocumentosDaPagina contexto="\/apoio-a-decisao\/" \/>/)
  const guia = recursos.match(/export function UserGuide[\s\S]*?\n\}/)[0]
  assert.match(guia, /videosDoGuia/)
  assert.match(recursos, /import \{ GrsComoUsar, videosDoGuia \} from '\.\.\/components\/GrsComoUsar'/)
  assert.doesNotMatch(recursos, /const videosDoGuia =/, 'uma só fonte para os vídeos')
})

test('GRS: o vídeo só carrega depois do clique, com título, e o manual só aparece se existir no catálogo', () => {
  const comp = ler('src/components/GrsComoUsar.tsx')
  assert.match(comp, /aria-pressed/)
  assert.match(comp, /<iframe[\s\S]*title=/)
  assert.match(comp, /useState/)
  assert.match(comp, /Assistir/)
  assert.match(comp, /documents\.find\(\(doc\) => doc\.title === 'Guia do usuário do GRS'/)
  assert.match(comp, /manual && \(/, 'sem arquivo, nenhum botão quebrado')
})
