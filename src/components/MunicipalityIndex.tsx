import { useMemo, useRef, useState, type ReactNode } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import { Link } from './router'
import { cityRecords, municipalDocuments, normalizeName } from '../data/cities'
import { selectiveCollectionPlans } from '../data/selective-collection-plans.generated'
import { documents } from '../data/documents'

export type Filtro = 'todos' | 'com-plano' | 'com-educacao-ambiental' | 'com-compostagem'

const planos = new Map(selectiveCollectionPlans.map((plan) => [plan.slug, plan]))
const comPlano = new Set(planos.keys())
const comDocumento = (kind: 'educacao-ambiental' | 'compostagem') => new Set(municipalDocuments.filter((doc) => doc.kind === kind).map((doc) => doc.slug))

// Sem `slugs`, o filtro mostra todos os municípios.
const FILTROS: Array<{ id: Filtro; label: string; slugs?: Set<string> }> = [
  { id: 'todos', label: 'Todos' },
  { id: 'com-plano', label: 'Com plano de coleta seletiva', slugs: comPlano },
  { id: 'com-educacao-ambiental', label: 'Com plano de educação ambiental', slugs: comDocumento('educacao-ambiental') },
  { id: 'com-compostagem', label: 'Com documento de compostagem', slugs: comDocumento('compostagem') },
]
// Visão estadual dos panoramas (L09), no topo do índice.
const relatorioGeral = documents.find((doc) => doc.title === 'Relatório geral dos panoramas')
const inicial = (name: string) => normalizeName(name).charAt(0).toUpperCase()

type MunicipalityIndexProps = {
  /** Filtro ao abrir; "com-plano" em Municípios Contemplados da coleta seletiva. */
  filtroInicial?: Filtro
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
}

/**
 * Índice único dos municípios (CP-06), usado em /cidades/, /diretorios/ e
 * /panoramas-da-gestao-de-residuos/ (ADR-001). Busca sem acentos, filtro pelos
 * municípios com plano de coleta seletiva e salto por letra.
 */
export function MunicipalityIndex({ eyebrow, title, description, filtroInicial = 'todos' }: MunicipalityIndexProps) {
  const [query, setQuery] = useState('')
  const [filtro, setFiltro] = useState<Filtro>(filtroInicial)
  const inputRef = useRef<HTMLInputElement>(null)
  const termo = normalizeName(query.trim())

  const visiveis = useMemo(
    () => {
      const slugs = FILTROS.find((item) => item.id === filtro)?.slugs
      return cityRecords.filter((city) => (!slugs || slugs.has(city.slug)) && normalizeName(city.name).includes(termo))
    },
    [filtro, termo],
  )
  const grupos = useMemo(() => {
    const porLetra = new Map<string, typeof visiveis>()
    for (const city of visiveis) porLetra.set(inicial(city.name), [...(porLetra.get(inicial(city.name)) ?? []), city])
    return [...porLetra.entries()]
  }, [visiveis])

  const limpar = () => {
    setQuery('')
    inputRef.current?.focus()
  }

  return (
    <section className="section container municipality-index" aria-labelledby="indice-municipios-titulo">
      <div className="municipality-index-head">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 id="indice-municipios-titulo">{title}</h2>
        {description && <p>{description}</p>}
        {relatorioGeral && (
          <a className="text-link" href={relatorioGeral.href} target="_blank" rel="noopener">
            Relatório geral dos panoramas <ExternalLink size={15} aria-hidden="true" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
      </div>

      <div className="municipality-index-tools">
        <label className="search-field">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Buscar município</span>
          <input ref={inputRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar município" />
        </label>
        <div className="segmented" role="group" aria-label="Filtrar municípios">
          {FILTROS.map((item) => (
            <button key={item.id} type="button" aria-pressed={filtro === item.id} onClick={() => setFiltro(item.id)}>
              {item.label} <span className="segmented-count">{item.slugs?.size ?? cityRecords.length}</span>
            </button>
          ))}
        </div>
      </div>

      {grupos.length > 0 && (
        <nav className="municipality-az" aria-label="Índice alfabético">
          {grupos.map(([letra]) => <a key={letra} href={`#municipios-${letra.toLowerCase()}`}>{letra}</a>)}
        </nav>
      )}

      <p className="municipality-index-count" aria-live="polite">
        {visiveis.length} de {cityRecords.length} municípios{termo ? <> para “{query.trim()}”</> : null}
      </p>

      {visiveis.length === 0 ? (
        <div className="municipality-index-empty">
          <p>Nenhum município encontrado para “{query}”.</p>
          <button type="button" className="button button-ghost" onClick={limpar}>Limpar busca</button>
        </div>
      ) : (
        <div className="municipality-groups">
          {grupos.map(([letra, cidades]) => (
            <section key={letra} className="municipality-group" aria-labelledby={`municipios-${letra.toLowerCase()}`}>
              <h3 id={`municipios-${letra.toLowerCase()}`}>{letra}</h3>
              <ul>
                {cidades.map((city) => {
                  const plano = planos.get(city.slug)
                  return (
                    <li key={city.slug}>
                      <Link to={`/cidades/${city.slug}/`} className="municipality-name" aria-label={`${city.name}: abrir ficha`}>{city.name}</Link>
                      <span className="municipality-actions">
                        <a className="municipality-action" href={`/uploads/2025/03/${city.file}`} target="_blank" rel="noopener">
                          <span className="municipality-action-long">Panorama · PDF</span><span className="municipality-action-short">PDF</span>
                          <span className="sr-only"> de {city.name} (abre em nova aba)</span>
                        </a>
                        {plano && (
                          <a className="municipality-action" href={plano.primaryDocumentUrl} target="_blank" rel="noopener">
                            <span className="municipality-action-long">Plano de coleta seletiva</span><span className="municipality-action-short">Plano</span>
                            <span className="sr-only"> de {city.name} (abre em nova aba)</span>
                          </a>
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      )}
    </section>
  )
}
