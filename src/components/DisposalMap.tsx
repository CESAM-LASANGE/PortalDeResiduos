import { useId } from 'react'
import { mapViewBox, municipalityShapes } from '../data/municipality-map.generated'
import { disposalCategories, disposalSummary, type DisposalCategory } from '../data/municipality-disposal.generated'

const CATEGORIAS: Array<{ id: DisposalCategory; rotulo: string }> = [
  { id: 'publico', rotulo: 'Aterro sanitário público' },
  { id: 'privado', rotulo: 'Aterro sanitário privado' },
  { id: 'transbordo', rotulo: 'Transbordo e transporte dos resíduos para aterro sanitário em outro município' },
  { id: 'lixao', rotulo: 'Lixão' },
]

const porNome = (a: string, b: string) => a.localeCompare(b, 'pt-BR')
const municipiosDe = (id: DisposalCategory) => municipalityShapes.filter((shape) => disposalCategories[shape.slug] === id).map((shape) => shape.name).sort(porNome)

/**
 * Situação dos municípios quanto à disposição final dos resíduos sólidos domiciliares em 2024 (Figura 3 do
 * relatório geral, fonte TCE), redesenhada sobre os contornos do IBGE. O lixão tem hachura, para não depender
 * só da cor, e a lista de municípios por categoria é a alternativa em texto do mapa.
 */
export function DisposalMap() {
  const id = useId()
  const hachura = `${id}-hachura`
  const rotuloDe = new Map(CATEGORIAS.map((categoria) => [categoria.id, categoria.rotulo]))
  return (
    <figure className="disposal-map">
      <svg viewBox={mapViewBox} role="img" aria-labelledby={`${id}-titulo ${id}-desc`} className="disposal-map-svg">
        <title id={`${id}-titulo`}>Situação dos municípios de Mato Grosso do Sul quanto à disposição final dos resíduos em {disposalSummary.ano}</title>
        <desc id={`${id}-desc`}>
          {disposalSummary.adequada} dos {disposalSummary.total} municípios têm disposição final adequada e {disposalSummary.inadequada} têm disposição inadequada (lixão): {municipiosDe('lixao').join(', ')}. A lista completa por categoria está abaixo do mapa.
        </desc>
        <defs>
          <pattern id={hachura} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="7" height="7" className="disposal-hachura-fundo" />
            <line x1="0" y1="0" x2="0" y2="7" className="disposal-hachura-linha" />
          </pattern>
        </defs>
        {municipalityShapes.map((shape) => {
          const categoria = disposalCategories[shape.slug]
          return (
            <path key={shape.slug} d={shape.d} className={`disp-${categoria}`} fill={categoria === 'lixao' ? `url(#${hachura})` : undefined}>
              <title>{`${shape.name}: ${rotuloDe.get(categoria)}`}</title>
            </path>
          )
        })}
      </svg>

      <ul className="disposal-legend" aria-label="Legenda do mapa">
        {CATEGORIAS.map(({ id: categoria, rotulo }) => (
          <li key={categoria}>
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <rect width="18" height="18" className={`disp-${categoria}`} fill={categoria === 'lixao' ? `url(#${hachura})` : undefined} />
            </svg>
            <span>{rotulo}</span>
            <span className="disposal-legend-count">{municipiosDe(categoria).length}</span>
          </li>
        ))}
      </ul>

      <figcaption>
        Situação dos municípios quanto à disposição final dos resíduos sólidos domiciliares em {disposalSummary.ano}. Fonte: {disposalSummary.fonte}, Figura 3 do relatório geral.
      </figcaption>

      <details className="disposal-details">
        <summary>Ver os municípios de cada categoria</summary>
        {CATEGORIAS.map(({ id: categoria, rotulo }) => (
          <div key={categoria}>
            <h3>{rotulo} ({municipiosDe(categoria).length})</h3>
            <p>{municipiosDe(categoria).join(', ')}.</p>
          </div>
        ))}
      </details>
    </figure>
  )
}
