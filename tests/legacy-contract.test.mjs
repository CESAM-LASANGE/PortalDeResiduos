// Contratos da migração do legado (docs/specs/legado/). Valores esperados vêm das
// tabelas das specs, levantadas do banco à parte; não são recalculados aqui.
import assert from 'node:assert/strict'
import test from 'node:test'

const { legacyDocuments } = await import('../src/data/legacy-documents.generated.ts')
const daPagina = (pagina) => legacyDocuments.filter((doc) => doc.page === pagina)
const driveIds = (docs) => docs.map((doc) => doc.driveId)

test('L00: os 17 planos de educação ambiental vêm do banco com o município como rótulo', () => {
  const planos = daPagina('/producoes-do-convenio/educacao-ambiental/planos-de-educacao-ambiental/')
  assert.equal(planos.length, 17)
  assert.ok(planos.every((doc) => doc.origin === 'drive' && doc.kind === 'link'))
  const corumba = planos.find((doc) => doc.label === 'Corumbá')
  assert.equal(corumba.driveId, '1Ex5UCUfVrQXO9M7UXTt-_MQW8L3TOzIv')
  assert.equal(planos.find((doc) => doc.label === 'Rio Brilhante').driveId, '1-1k_sdbDaNo4w3hLOCgTclCez-WvWJO3')
})

test('L00: o kit de compostagem tem os quatro arquivos com o rótulo publicado', () => {
  const kit = daPagina('/producoes-do-convenio/materiais-compilados/plano-de-compostagem/')
  assert.deepEqual(kit.map((doc) => doc.label), ['Manual da Planilha', 'Cartilha', 'Folder Compostagem', 'Planilha de Dimensionamento de Usina de Compostagem'])
  assert.deepEqual(driveIds(kit), ['1jMH8gmUiMow3Hf7rl-3WxCTjuPFkm6ka', '1355gzxzSPeuwMm623MKCGvKcle05d0mq', '1ry-7dcyVviDYUYuxErVeFHQXxiytO19s', '1X6vLjzmSetjmFBbfKg4ouv-xjcTn9mj1'])
})

test('L00: o guia do GRS tem o PDF e três vídeos incorporados, com o subtítulo como contexto', () => {
  const guia = daPagina('/apoio-a-decisao/guia-do-usuario-do-grs/')
  const videos = guia.filter((doc) => doc.kind === 'embed')
  assert.deepEqual(videos.map((doc) => doc.context), ['Parte 1', 'Parte 2', 'Parte 4'])
  assert.deepEqual(driveIds(videos), ['1hI44A4QRaJEqHI_YH6XzQVB1BnU_F6T-', '1yxW_8TKnAdviydhHauPpnHFOckaHDFIQ', '1H_swkYCo0WZSdU0ovMCC3c--ERkrN-E8'])
  assert.ok(guia.some((doc) => doc.kind === 'link' && doc.driveId === '1kDYgsl6WVUqYSDmI2ffLSdkeKpF_Ulje'))
})

test('L00: Publicações guarda o título do artigo no texto anterior ao link "Baixe o artigo"', () => {
  const pub = daPagina('/publicacoes/')
  const externos = pub.filter((doc) => doc.origin === 'external')
  assert.equal(externos.length, 5)
  assert.ok(externos.every((doc) => doc.label === 'Baixe o artigo'))
  const gravimetrica = externos.find((doc) => doc.url === 'https://interacoes.ucdb.br/multitemas/article/view/3608/2704')
  assert.equal(gravimetrica.context, 'Análise gravimétrica dos resíduos sólidos urbanos do município de Dourados, MS')
  const local = pub.find((doc) => doc.url.endsWith('/2021/11/artigo2-1.pdf'))
  assert.equal(local.origin, 'local')
  assert.equal(local.localPath, '/uploads/2021/11/artigo2-1.pdf')
})

test('L00: só páginas publicadas entram e o gerador não inclui imagens nem scripts', () => {
  assert.ok(legacyDocuments.every((doc) => !/\.(png|jpe?g|gif|css|js)(\?|$)/i.test(doc.url)))
  assert.equal(daPagina('/politica-de-privacidade/').length, 0)
})

test('L00: DocumentRow e PortalDocument aceitam documento local, do Drive e link externo', async () => {
  const fs = await import('node:fs')
  const row = fs.readFileSync(new URL('../src/components/DocumentRow.tsx', import.meta.url), 'utf8')
  assert.match(row, /origin: 'local' \| 'drive' \| 'external'/)
  assert.match(row, /'Link externo'/)
  assert.match(row, /'Abrir link'/)
  const docs = fs.readFileSync(new URL('../src/data/documents.ts', import.meta.url), 'utf8')
  assert.match(docs, /origin: 'local' \| 'drive' \| 'external'/)
})

const PLANOS_ANTIGOS = ['alcinopolis', 'amambai', 'bataguassu', 'bonito', 'chapadao-do-sul', 'costa-rica', 'coxim', 'gloria-de-dourados', 'japora', 'miranda', 'mundo-novo', 'nova-alvorada-do-sul', 'porto-murtinho', 'rio-brilhante', 'sidrolandia']

test('L13: as 15 URLs antigas dos planos são aliases legados que levam à ficha do município', async () => {
  const { resolveRoute } = await import('../src/data/siteMap.ts')
  for (const slug of PLANOS_ANTIGOS) {
    const rota = resolveRoute(`/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/${slug}/`)
    assert.ok(rota, slug)
    assert.equal(rota.status, 'legacy', slug)
    assert.equal(rota.redirectTo, `/cidades/${slug}/`, slug)
  }
  // A página antiga de Rio Brilhante tinha o título "Bataguassu"; vale o slug.
  assert.equal(resolveRoute('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/rio-brilhante').title, 'Rio Brilhante')
})

test('L13: a rota da página de planos continua sendo a página de planos, sem redirecionar', async () => {
  const { resolveRoute } = await import('../src/data/siteMap.ts')
  const rota = resolveRoute('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/')
  assert.equal(rota.redirectTo, undefined)
})
