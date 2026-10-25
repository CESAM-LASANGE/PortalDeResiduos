import type { LegacyDocument } from './legacy-documents.generated'

export type VideoDoGuia = { parte: number; driveId: string; embed: string }

/**
 * Vídeos do guia do GRS, na ordem do site antigo (L10). Lá o terceiro se chamava "Parte 4", mas o arquivo é
 * Parte_3.mp4 (docs/specs/legado/verificacao-2026-10-19.md), então a numeração aqui é 1, 2 e 3.
 */
export function videosDoGuiaFrom(legacy: LegacyDocument[]): VideoDoGuia[] {
  return legacy
    .filter((doc) => doc.page === '/apoio-a-decisao/guia-do-usuario-do-grs/' && doc.kind === 'embed' && doc.driveId)
    .map((doc, indice) => ({ parte: indice + 1, driveId: doc.driveId as string, embed: doc.url }))
}
