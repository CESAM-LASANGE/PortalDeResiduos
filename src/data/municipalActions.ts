import type { MunicipalDocument } from './municipalDocuments'

export type FiltroDoIndice = 'todos' | 'com-plano' | 'com-educacao-ambiental' | 'com-compostagem'

export type AcaoDoMunicipio = {
  /** Rótulo longo (desktop) e curto (celular). */
  rotulo: string
  curto: string
  url: string
}

type Dados = {
  /** Plano de coleta seletiva por município (slug → URL). */
  planos: Map<string, string>
  documentos: MunicipalDocument[]
}

/**
 * Documento que a linha de um município abre, conforme o filtro da lista. Cada filtro abre só o documento dele:
 * em "Com documento de compostagem", o link é o da compostagem, nunca o panorama. Em "Todos" abre o panorama e,
 * onde `incluirPlano` pede, também o plano de coleta seletiva.
 */
export function acoesDoMunicipio(filtro: FiltroDoIndice, cidade: { slug: string; file: string }, dados: Dados, incluirPlano = false): AcaoDoMunicipio[] {
  const documento = (kind: MunicipalDocument['kind'], rotulo: string): AcaoDoMunicipio[] => {
    const doc = dados.documentos.find((item) => item.slug === cidade.slug && item.kind === kind)
    return doc ? [{ rotulo, curto: 'Plano', url: doc.url }] : []
  }
  const plano = dados.planos.get(cidade.slug)
  const planoDeColeta: AcaoDoMunicipio[] = plano ? [{ rotulo: 'Plano de coleta seletiva', curto: 'Plano', url: plano }] : []
  if (filtro === 'com-plano') return planoDeColeta
  if (filtro === 'com-educacao-ambiental') return documento('educacao-ambiental', 'Plano de educação ambiental')
  if (filtro === 'com-compostagem') return documento('compostagem', 'Documento de compostagem')
  return [{ rotulo: 'Panorama · PDF', curto: 'PDF', url: `/uploads/2025/03/${cidade.file}` }, ...(incluirPlano ? planoDeColeta : [])]
}
