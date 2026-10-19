import { useId } from 'react'
import { ExternalLink } from 'lucide-react'
import { Alert } from './Alert'
import { legacyCityData, type ColetaDoAno } from '../data/legacy-city-data.generated'
import { formatarIndicador } from '../data/indicadores'

type Linha = { campo: keyof Omit<ColetaDoAno, 'ano'>; rotulo: string; parte?: boolean }

const LINHAS: Linha[] = [
  { campo: 'recolhida', rotulo: 'Quantidade recolhida (t)' },
  { campo: 'populacao', rotulo: 'População com coleta seletiva porta a porta' },
  { campo: 'recuperadoTotal', rotulo: 'Materiais recuperados (t)' },
  { campo: 'papelao', rotulo: 'Papelão', parte: true },
  { campo: 'plasticos', rotulo: 'Plásticos', parte: true },
  { campo: 'metais', rotulo: 'Metais', parte: true },
  { campo: 'vidros', rotulo: 'Vidros', parte: true },
  { campo: 'outros', rotulo: 'Outros', parte: true },
  { campo: 'producaoDiaria', rotulo: 'Produção de lixo diária' },
]

/**
 * Locais de entrega voluntária (L02) e indicadores de coleta seletiva (L03) que o site antigo
 * publicava em 5 fichas. Mostra só o que a fonte tem e de quando é; nas outras fichas, nada.
 */
export function DadosDoPortalAnterior({ slug, nome }: { slug: string; nome: string }) {
  const tabelaId = useId()
  const dados = legacyCityData.find((item) => item.slug === slug)
  if (!dados) return null
  const { entrega, coleta } = dados
  const anoPublicado = dados.publicadoEm.slice(0, 4)
  const temVazio = coleta.some((ano) => LINHAS.some(({ campo }) => ano[campo] === null))
  return (
    <div className="legacy-city">
      <section aria-labelledby={`${tabelaId}-entrega`}>
        <h2 id={`${tabelaId}-entrega`} className="city-documents-title">Locais de entrega voluntária</h2>
        <p className="city-documents-count">Informação publicada em {anoPublicado} no portal anterior</p>
        {entrega.tipo === 'mapa' && (
          <a className="button button-ghost" href={entrega.url} target="_blank" rel="noopener">
            Ver locais no mapa (Google Maps) <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
          </a>
        )}
        {entrega.tipo === 'listas' && entrega.grupos.map((grupo) => (
          <div key={grupo.titulo} className="legacy-city-group">
            <h3>{grupo.titulo}</h3>
            <ul>{grupo.itens.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
        {entrega.tipo === 'nao-possui' && <p className="legacy-city-text">Cidade não possui locais de entrega voluntária.</p>}
        {entrega.tipo === 'incompleto' && (
          <Alert tone="warning" title="Em migração">A lista de locais de entrega voluntária desta cidade estava incompleta no portal anterior.</Alert>
        )}
      </section>

      <section aria-labelledby={`${tabelaId}-coleta`}>
        <h2 id={`${tabelaId}-coleta`} className="city-documents-title">Coleta seletiva em 2018 e 2019</h2>
        <div className="table-scroll" role="region" aria-labelledby={`${tabelaId}-coleta`} tabIndex={0}>
          <table className="data-table">
            <caption>Indicadores de coleta seletiva de {nome}</caption>
            <thead>
              <tr><th scope="col">Indicador</th>{coleta.map(({ ano }) => <th key={ano} scope="col">{ano}</th>)}</tr>
            </thead>
            <tbody>
              {LINHAS.map(({ campo, rotulo, parte }) => (
                <tr key={campo} className={parte ? 'is-part' : undefined}>
                  <th scope="row">{campo === 'producaoDiaria' && dados.producaoDiariaComUnidade ? `${rotulo} (t)` : rotulo}</th>
                  {coleta.map((ano) => <td key={ano.ano}>{formatarIndicador(ano[campo])}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="legacy-city-source">
          Fonte: portal anterior (dados de 2018 e 2019).
          {temVazio && ' — indica dado não informado na fonte.'}
          {!dados.producaoDiariaComUnidade && ' A fonte não informa a unidade da produção diária.'}
        </p>
      </section>
    </div>
  )
}
