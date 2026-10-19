import type { Indicador } from './legacy-city-data.generated'

/** Indicador em pt-BR com as casas decimais da fonte (L03); vazio na fonte vira "—", nunca 0. */
export function formatarIndicador(indicador: Indicador | null): string {
  if (!indicador) return '—'
  return indicador.valor.toLocaleString('pt-BR', { minimumFractionDigits: indicador.casas, maximumFractionDigits: indicador.casas })
}
