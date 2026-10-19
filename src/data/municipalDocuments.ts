// Documentos municipais do site antigo que não são panorama nem plano de coleta seletiva:
// Planos Municipais de Educação Ambiental (L04) e documentos de compostagem (L12).
// Função pura: recebe os links gerados do banco e os municípios; sem imports de runtime.

import type { LegacyDocument } from './legacy-documents.generated'

export type MunicipalDocumentKind = 'educacao-ambiental' | 'compostagem'

export type MunicipalDocument = {
  slug: string
  name: string
  kind: MunicipalDocumentKind
  title: string
  url: string
}

// Página do site antigo → tipo. O rótulo de cada link nessas páginas é o nome do município.
const PAGINAS: Record<string, MunicipalDocumentKind> = {
  '/producoes-do-convenio/educacao-ambiental/planos-de-educacao-ambiental/': 'educacao-ambiental',
  '/producoes-do-convenio/materiais-compilados/municipios-contemplados/': 'compostagem',
}

// Títulos a partir do nome real dos arquivos ("PMEA <MUNICÍPIO>.pdf" e
// "<Município>_Gestão dos recursos orgânicos - Compostagem.pdf"; ver verificacao-2026-10-19.md).
const TITULO: Record<MunicipalDocumentKind, (municipio: string) => string> = {
  'educacao-ambiental': (municipio) => `Plano Municipal de Educação Ambiental — ${municipio}`,
  compostagem: (municipio) => `Gestão dos recursos orgânicos: compostagem — ${municipio}`,
}

const semAcento = (texto: string) => texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

export function municipalDocumentsFrom(legacy: readonly LegacyDocument[], cities: readonly { slug: string; name: string }[]): MunicipalDocument[] {
  const porNome = new Map(cities.map((city) => [semAcento(city.name), city]))
  return legacy.flatMap((doc) => {
    const kind = PAGINAS[doc.page]
    if (!kind || doc.kind !== 'link') return []
    const city = porNome.get(semAcento(doc.label))
    if (!city) throw new Error(`Documento municipal sem município no catálogo: "${doc.label}" (${doc.page})`)
    return [{ slug: city.slug, name: city.name, kind, title: TITULO[kind](city.name), url: doc.url }]
  })
}
