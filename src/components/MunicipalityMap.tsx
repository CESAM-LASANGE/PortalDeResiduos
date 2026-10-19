import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import { Link } from './router'
import { mapViewBox, municipalityShapes } from '../data/municipality-map.generated'

export type MunicipioNoMapa = {
  slug: string
  name: string
  /** URL do panorama em PDF. */
  panorama: string
  /** URL do plano de coleta seletiva, nos municípios que têm. */
  plano?: string
}

const [, , LARGURA, ALTURA] = mapViewBox.split(' ').map(Number)
// Com poucos marcadores, os nomes ficam sempre à vista, como no mapa do site antigo.
const NOMES_SEMPRE_VISIVEIS = 15
// Raio, em px, em que o toque escolhe o marcador mais próximo (alvo de 24 px).
const RAIO_DO_TOQUE = 12
// No leste do Estado, o nome vai à esquerda do marcador para não sair do mapa.
const ROTULO_A_ESQUERDA = 0.62

/**
 * Mapa dos municípios (L01). Contornos do IBGE em SVG decorativo; cada município visível
 * é um botão posicionado sobre o mapa. A lista do índice continua sendo a alternativa.
 */
export default function MunicipalityMap({ cidades }: { cidades: MunicipioNoMapa[] }) {
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const [realce, setRealce] = useState<string | null>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const marcadores = useRef(new Map<string, HTMLButtonElement>())
  const tituloRef = useRef<HTMLHeadingElement>(null)
  const painelId = useId()
  const porSlug = new Map(cidades.map((cidade) => [cidade.slug, cidade]))
  const atual = selecionado ? porSlug.get(selecionado) : undefined

  // A busca ou o filtro podem tirar o município escolhido do mapa.
  useEffect(() => {
    if (selecionado && !porSlug.has(selecionado)) setSelecionado(null)
  })

  const abrir = (slug: string) => {
    setSelecionado(slug)
    requestAnimationFrame(() => tituloRef.current?.focus())
  }
  // Marcadores vizinhos se sobrepõem no celular. O ponteiro escolhe o marcador mais próximo e, longe
  // de todos, o município sob ele: cada marcador fica dentro do próprio contorno (gerador do mapa).
  const sobOPonteiro = (event: MouseEvent) => {
    const caixa = canvasRef.current?.getBoundingClientRect()
    if (!caixa) return null
    const escala = caixa.width / LARGURA
    const [px, py] = [event.clientX - caixa.left, event.clientY - caixa.top]
    let maisPerto: { slug: string; distancia: number } | null = null
    for (const shape of municipalityShapes) {
      if (!porSlug.has(shape.slug)) continue
      const distancia = Math.hypot(shape.x * escala - px, shape.y * escala - py)
      if (!maisPerto || distancia < maisPerto.distancia) maisPerto = { slug: shape.slug, distancia }
    }
    if (maisPerto && maisPerto.distancia <= RAIO_DO_TOQUE) return maisPerto.slug
    const contorno = (event.target as Element).getAttribute('data-slug')
    return contorno && porSlug.has(contorno) ? contorno : null
  }

  const fechar = () => {
    const slug = selecionado
    setSelecionado(null)
    if (slug) marcadores.current.get(slug)?.focus()
  }

  return (
    <div
      className={`municipality-map${cidades.length <= NOMES_SEMPRE_VISIVEIS ? ' is-few' : ''}`}
      onKeyDown={(event) => {
        if (event.key === 'Escape' && selecionado) {
          event.preventDefault()
          fechar()
        }
      }}
    >
      <div
        ref={canvasRef}
        className="municipality-map-canvas"
        onClick={(event) => { const slug = sobOPonteiro(event); if (slug) abrir(slug) }}
        onMouseMove={(event) => { const slug = sobOPonteiro(event); if (slug !== realce) setRealce(slug) }}
        onMouseLeave={() => setRealce(null)}
      >
        <svg viewBox={mapViewBox} aria-hidden="true" className="municipality-map-svg">
          {municipalityShapes.map((shape) => (
            <path
              key={shape.slug}
              d={shape.d}
              data-slug={shape.slug}
              className={shape.slug === selecionado ? 'is-selected' : porSlug.has(shape.slug) ? 'is-visible' : undefined}
            />
          ))}
        </svg>
        <ul className="municipality-map-markers" aria-label="Municípios no mapa">
          {municipalityShapes.filter((shape) => porSlug.has(shape.slug)).map((shape) => (
            <li key={shape.slug} style={{ left: `${(shape.x / LARGURA) * 100}%`, top: `${(shape.y / ALTURA) * 100}%` }}>
              <button
                ref={(el) => { if (el) marcadores.current.set(shape.slug, el); else marcadores.current.delete(shape.slug) }}
                type="button"
                className={`municipality-map-marker${shape.slug === realce ? ' is-hover' : ''}${shape.x > LARGURA * ROTULO_A_ESQUERDA ? ' is-label-left' : ''}`}
                aria-label={`${shape.name}: abrir opções`}
                aria-expanded={shape.slug === selecionado}
                aria-controls={painelId}
                onClick={(event) => { event.stopPropagation(); abrir(shape.slug) }}
              >
                <span className="municipality-map-label" aria-hidden="true">{shape.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div id={painelId} className="municipality-map-panel">
        {atual ? (
          <>
            <Eyebrow>Município</Eyebrow>
            <h3 ref={tituloRef} tabIndex={-1}>{atual.name}</h3>
            <div className="municipality-map-actions">
              <Link to={`/cidades/${atual.slug}/`} className="button button-dark">Ficha</Link>
              <a className="button button-ghost" href={atual.panorama} target="_blank" rel="noopener">
                Panorama · PDF <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
              </a>
              {atual.plano && (
                <a className="button button-ghost" href={atual.plano} target="_blank" rel="noopener">
                  Plano de coleta seletiva <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
                </a>
              )}
            </div>
            <button type="button" className="text-link municipality-map-close" onClick={fechar}>
              <X size={15} aria-hidden="true" /> Fechar
            </button>
          </>
        ) : (
          <p>Escolha um município no mapa para ver a ficha, o panorama e o plano.</p>
        )}
      </div>
    </div>
  )
}
