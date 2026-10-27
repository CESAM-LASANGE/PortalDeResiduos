import { useId, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import { mapViewBox, municipalityShapes } from '../data/municipality-map.generated'
import { municipalDocuments } from '../data/cities'

const [, , LARGURA, ALTURA] = mapViewBox.split(' ').map(Number)
// No leste do Estado, o nome vai à esquerda do marcador para não sair do mapa (como no mapa dos panoramas).
const ROTULO_A_ESQUERDA = 0.62

// Os municípios contemplados vêm dos documentos de compostagem (L12), nunca de uma lista digitada.
const contemplados = new Map(municipalDocuments.filter((doc) => doc.kind === 'compostagem').map((doc) => [doc.slug, doc]))

/**
 * Mapa do Plano de Compostagem: o Estado desenhado com os municípios contemplados em destaque e os demais sem cor,
 * na cor do fundo. Escolher um município destacado mostra o plano dele. Reaproveita o desenho e os estilos do mapa
 * interativo dos panoramas (MunicipalityMap), com um marcador-botão por município contemplado para teclado e leitor de tela.
 */
export function CompostagemMap() {
  const tituloId = useId()
  const [selecionado, setSelecionado] = useState<string | null>(null)
  const marcadores = useRef(new Map<string, HTMLButtonElement>())
  const doc = selecionado ? contemplados.get(selecionado) : undefined
  const escolher = (slug: string) => setSelecionado(slug)
  const fechar = () => {
    const slug = selecionado
    setSelecionado(null)
    if (slug) marcadores.current.get(slug)?.focus()
  }

  return (
    <section className="section container compost-map-section" aria-labelledby={tituloId}>
      <div className="grs-como-usar-cabecalho">
        <Eyebrow>Municípios contemplados</Eyebrow>
        <h2 id={tituloId}>Escolha um município no mapa.</h2>
        <p>{contemplados.size} municípios têm o plano de compostagem publicado. Selecione um deles, em destaque no mapa, para abrir o plano.</p>
      </div>
      <div
        className="municipality-map is-few compost-map"
        onKeyDown={(event) => {
          if (event.key === 'Escape' && selecionado) {
            event.preventDefault()
            fechar()
          }
        }}
      >
        <div className="municipality-map-canvas">
          <svg viewBox={mapViewBox} aria-hidden="true" className="municipality-map-svg">
            {municipalityShapes.map((shape) => {
              const contemplado = contemplados.has(shape.slug)
              return (
                <path
                  key={shape.slug}
                  d={shape.d}
                  className={shape.slug === selecionado ? 'is-selected' : contemplado ? 'is-contemplado' : undefined}
                  onClick={contemplado ? () => escolher(shape.slug) : undefined}
                />
              )
            })}
          </svg>
          <ul className="municipality-map-markers" aria-label="Municípios com plano de compostagem">
            {municipalityShapes.filter((shape) => contemplados.has(shape.slug)).map((shape) => (
              <li key={shape.slug} style={{ left: `${(shape.x / LARGURA) * 100}%`, top: `${(shape.y / ALTURA) * 100}%` }}>
                <button
                  ref={(el) => { if (el) marcadores.current.set(shape.slug, el); else marcadores.current.delete(shape.slug) }}
                  type="button"
                  className={`municipality-map-marker${shape.x > LARGURA * ROTULO_A_ESQUERDA ? ' is-label-left' : ''}`}
                  aria-label={`${shape.name}: ver o plano de compostagem`}
                  aria-pressed={shape.slug === selecionado}
                  onClick={(event) => { event.stopPropagation(); escolher(shape.slug) }}
                >
                  <span className="municipality-map-label" aria-hidden="true">{shape.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="municipality-map-panel" aria-live="polite">
          {doc ? (
            <>
              <Eyebrow>Município</Eyebrow>
              <h3>{doc.name}</h3>
              <p>{doc.title}</p>
              <a className="button button-dark" href={doc.url} target="_blank" rel="noopener">
                Abrir o plano de compostagem <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
              </a>
            </>
          ) : (
            <p>Escolha um município destacado no mapa para abrir o plano de compostagem dele.</p>
          )}
          <p className="compost-map-legenda"><span className="compost-map-amostra" aria-hidden="true" />Município com plano de compostagem publicado. Os demais não têm plano publicado.</p>
        </div>
      </div>
    </section>
  )
}
