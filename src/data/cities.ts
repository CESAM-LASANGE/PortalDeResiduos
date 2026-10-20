// Municípios com panorama: identidade (slug, nome) e arquivos, derivados do catálogo gerado.

import { panoramaRecords } from './panoramas.generated'
import { legacyDocuments } from './legacy-documents.generated'
import { municipalDocumentsFrom } from './municipalDocuments'

export type CityRecord = {
  slug: string
  name: string
  file: string
  cover: string
  sizeBytes: number
  legacyPath?: string
}

export const cityRecords: CityRecord[] = panoramaRecords.map((panorama) => ({
  slug: panorama.slug,
  name: panorama.name,
  file: panorama.file,
  cover: panorama.cover,
  sizeBytes: panorama.sizeBytes,
  ...(panorama.slug === 'corumba' ? { legacyPath: '/corumba/' } : {}),
}))

/** Remove acentos e caixa para comparar nomes ("Água" casa com "agua"). */
export const normalizeName = (value: string) => value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')

/** Planos de educação ambiental (17) e documentos de compostagem (5) do site antigo, por município. */
export const municipalDocuments = municipalDocumentsFrom(legacyDocuments, cityRecords)
