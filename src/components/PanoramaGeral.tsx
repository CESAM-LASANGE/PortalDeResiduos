import { lazy, Suspense, useId } from 'react'
import { ExternalLink } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
// Os contornos dos 79 municípios só são baixados em /cidades/, onde o mapa aparece.
const DisposalMap = lazy(() => import('./DisposalMap').then((modulo) => ({ default: modulo.DisposalMap })))
import { documents } from '../data/documents'
import { disposalSummary } from '../data/municipality-disposal.generated'

const relatorio = documents.find((doc) => doc.title === 'Relatório geral dos panoramas')
const percentual = (n: number) => Math.round((n / disposalSummary.total) * 100)

/**
 * Panorama geral do Estado, acima da lista de municípios: o resumo do relatório geral, o link para ele e o mapa
 * da situação da disposição final. O texto segue o Relatório Técnico de Conclusão — Etapa 1.1 (Convênio MPMS | UEMS).
 */
export function PanoramaGeral() {
  const tituloId = useId()
  const { adequada, inadequada, ano } = disposalSummary
  return (
    <section className="section container panorama-geral" aria-labelledby={tituloId}>
      <div className="panorama-geral-layout">
        <div className="panorama-geral-texto">
          <Eyebrow>Panorama geral</Eyebrow>
          <h2 id={tituloId}>Disposição final dos resíduos em Mato Grosso do Sul.</h2>
          <p>Entre 2016 e a finalização das visitas técnicas aos municípios, Mato Grosso do Sul apresentou uma evolução significativa no gerenciamento e destinação final dos resíduos sólidos domiciliares, revertendo um cenário amplamente irregular. Em 2016, aproximadamente 80% dos municípios do estado realizavam a disposição final inadequada dos resíduos, em lixões a céu aberto.</p>
          <p>Esse panorama mudou expressivamente, com {percentual(adequada)}% dos municípios destinando seus resíduos para aterros sanitários. Uma das principais estratégias foi a substituição de lixões pelo uso de estações de transbordo em municípios que não possuem aterros sanitários próprios: os resíduos coletados são transferidos para aterros licenciados em outros municípios.</p>
          <dl className="panorama-geral-numeros">
            <div><dt>Disposição final adequada em {ano}</dt><dd><strong>{adequada}</strong> municípios · {percentual(adequada)}%</dd></div>
            <div><dt>Disposição final inadequada em {ano}</dt><dd><strong>{inadequada}</strong> municípios · {percentual(inadequada)}%</dd></div>
          </dl>
          {relatorio && (
            <a className="button button-dark" href={relatorio.href} target="_blank" rel="noopener">
              Relatório geral dos panoramas <ExternalLink size={15} aria-hidden="true" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          )}
        </div>
        <Suspense fallback={<div className="disposal-map-reserva" aria-hidden="true" />}>
          <DisposalMap />
        </Suspense>
      </div>
    </section>
  )
}
