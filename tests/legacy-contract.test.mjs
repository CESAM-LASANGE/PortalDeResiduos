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

// Bloco B — documentos municipais (L04 e L12)
const { panoramaRecords } = await import('../src/data/panoramas.generated.ts')
const cidades = panoramaRecords.map((p) => ({ slug: p.slug, name: p.name }))

test('L04: os 17 Planos Municipais de Educação Ambiental ligam cada arquivo ao seu município', async () => {
  const { municipalDocumentsFrom } = await import('../src/data/municipalDocuments.ts')
  const planos = municipalDocumentsFrom(legacyDocuments, cidades).filter((d) => d.kind === 'educacao-ambiental')
  assert.equal(planos.length, 17)
  const porSlug = Object.fromEntries(planos.map((d) => [d.slug, d]))
  assert.equal(porSlug.corumba.url, 'https://drive.google.com/file/d/1Ex5UCUfVrQXO9M7UXTt-_MQW8L3TOzIv/view?usp=drive_link')
  assert.equal(porSlug.navirai.title, 'Plano Municipal de Educação Ambiental — Naviraí')
  assert.equal(porSlug['agua-clara'], undefined)
})

test('L12: os 5 documentos de compostagem de Municípios Contemplados ligam ao município', async () => {
  const { municipalDocumentsFrom } = await import('../src/data/municipalDocuments.ts')
  const docs = municipalDocumentsFrom(legacyDocuments, cidades).filter((d) => d.kind === 'compostagem')
  assert.deepEqual(docs.map((d) => d.slug).sort(), ['bataguassu', 'bonito', 'chapadao-do-sul', 'navirai', 'sao-gabriel-do-oeste'])
  assert.equal(docs.find((d) => d.slug === 'sao-gabriel-do-oeste').title, 'Gestão dos recursos orgânicos: compostagem — São Gabriel do Oeste')
})

test('L04/L12: rótulo sem município correspondente falha alto, em vez de sumir', async () => {
  const { municipalDocumentsFrom } = await import('../src/data/municipalDocuments.ts')
  const falso = [{ page: '/producoes-do-convenio/educacao-ambiental/planos-de-educacao-ambiental/', kind: 'link', label: 'Cidade Inventada', context: '', url: 'https://x', origin: 'drive' }]
  assert.throws(() => municipalDocumentsFrom(falso, cidades), /Cidade Inventada/)
})

test('L04/L12: ficha, índice, páginas e busca usam os documentos municipais', async () => {
  const fs = await import('node:fs')
  const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
  assert.match(ler('src/data/cities.ts'), /export const municipalDocuments = municipalDocumentsFrom\(legacyDocuments, cityRecords\)/)
  assert.match(ler('src/pages/CityPages.tsx').match(/export function CityDetail[\s\S]*?\n\}/)[0], /municipalDocuments\.filter/)
  const producao = ler('src/pages/ProductionPages.tsx')
  assert.match(producao.match(/export function EducationPlans[\s\S]*?\n\}/)[0], /<DocumentRow /)
  assert.match(producao.match(/export function Municipalities[\s\S]*?\n\}/)[0], /'compostagem'/)
  const indice = ler('src/components/MunicipalityIndex.tsx')
  assert.match(indice, /'com-educacao-ambiental'/)
  assert.match(indice, /'com-compostagem'/)
  assert.match(ler('src/data/search.ts'), /municipalDocuments/)
})

test('URLs: toda página publicada no WordPress resolve no site novo', async () => {
  const { loadDump, publishedPages } = await import('../scripts/lib/wordpress-dump.mjs')
  const { resolveRoute } = await import('../src/data/siteMap.ts')
  const raiz = new URL('..', import.meta.url).pathname
  const semRota = publishedPages(loadDump(raiz)).map((p) => p.path).filter((caminho) => !resolveRoute(caminho))
  assert.deepEqual(semRota, [])
})

// Bloco B — documentos do acervo (L05 a L11). Títulos: rótulo publicado, nome real do
// arquivo ou primeira página do PDF (docs/specs/legado/verificacao-2026-10-19.md).
const NOVOS = {
  'Manual da Planilha de Dimensionamento': ['Ferramenta', 'drive'],
  'Cartilha de compostagem: gestão de resíduos orgânicos': ['Cartilha', 'drive'],
  'Compostagem em 4 passos': ['Folder', 'drive'],
  'Planilha de Dimensionamento de Usina de Compostagem': ['Ferramenta', 'drive'],
  'Projeto Arquitetônico para Usina de Triagem de Resíduos de Campo Grande': ['Projeto arquitetônico', 'drive'],
  'Projeto Arquitetônico para Usina de Triagem de Resíduos de Corumbá': ['Projeto arquitetônico', 'drive'],
  'Cartilha para implantação de taxa municipal de resíduos sólidos urbanos': ['Cartilha', 'drive'],
  'Relatório Anual de Logística Reversa': ['Estudo', 'drive'],
  'Mapeamento dos Agentes da Reciclagem': ['Estudo', 'drive'],
  'Panorama da Educação Ambiental': ['Estudo', 'drive'],
  'Cadeia da Reciclagem e sua Tributação — material de divulgação': ['Estudo', 'drive'],
  'Relatório geral dos panoramas': ['Estudo', 'drive'],
  'Estudo estatístico para estimação de resíduos sólidos': ['Estudo', 'drive'],
  'Análise gravimétrica dos resíduos sólidos urbanos do município de Dourados, MS': ['Artigo', 'external'],
  'Análise das Ações de Educação Ambiental em Resíduos Sólidos no Estado de Mato Grosso do Sul': ['Artigo', 'external'],
  'Implementação de taxa municipal de resíduos sólidos urbanos': ['Artigo', 'external'],
  'Panorama da gestão dos resíduos sólidos de Dourados – MS (CONTECC)': ['Artigo', 'drive'],
  'Monografia da Claudia Aquino Gasparetto, FAENG/UFMS': ['Monografia', 'external'],
  'Dissertação de mestrado da Kamila Barbosa Nunes do Programa de Pós-Graduação em Direito da UFMS': ['Dissertação', 'external'],
}

test('L05–L11: os 19 documentos novos do acervo, com tipo e origem', async () => {
  const { documents } = await import('../src/data/documents.ts')
  assert.equal(documents.length, 30)
  for (const [titulo, [tipo, origem]] of Object.entries(NOVOS)) {
    const doc = documents.find((d) => d.title === titulo)
    assert.ok(doc, titulo)
    assert.equal(doc.type, tipo, titulo)
    assert.equal(doc.origin, origem, titulo)
  }
})

test('L05–L11: toda URL do Drive ou externa do acervo existe no banco do site antigo', async () => {
  const { documents } = await import('../src/data/documents.ts')
  const urls = new Set(legacyDocuments.map((d) => d.url))
  for (const doc of documents.filter((d) => d.origin !== 'local')) assert.ok(urls.has(doc.href), `${doc.title}: ${doc.href}`)
})

test('L11: os documentos locais voltam aos títulos completos publicados no site antigo', async () => {
  const { documents } = await import('../src/data/documents.ts')
  const titulo = (arquivo) => documents.find((d) => d.href.endsWith(arquivo)).title
  assert.equal(titulo('artigo2-1.pdf'), 'Extinção dos lixões no Mato Grosso do Sul: atuação do ministério público na mitigação das mudanças climáticas – um estudo de caso')
  assert.equal(titulo('artigo_Cadeia-de-Reciclagem.pdf'), 'Cadeia da Reciclagem e sua Tributação no Estado de Mato Grosso do Sul')
  assert.equal(titulo('Nota-tecnica-Taxa-RSU-FINAL-1.pdf'), 'Proposta de metodologia para cobrança da taxa dos serviços públicos de coleta, tratamento e disposição final de resíduos sólidos domiciliares nos municípios sul-mato-grossenses')
  assert.equal(titulo('Artigo-RSDL-1.pdf'), 'Projeto resíduos sólidos: disposição legal – a atuação articulada do ministério público estadual, tribunal de contas e o instituto do meio ambiente na busca pela extinção dos lixões em mato grosso do sul')
})
