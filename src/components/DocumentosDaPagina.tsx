import { useId } from 'react'
import { DocumentRow } from './DocumentRow'
import { documents } from '../data/documents'
import { documentSizes } from '../data/document-sizes.generated'

/** Os documentos do catálogo que o site antigo publicava nesta página (L05–L10). Sem documentos, não renderiza nada. */
export function DocumentosDaPagina({ contexto }: { contexto: string }) {
  const tituloId = useId()
  const lista = documents.filter((doc) => doc.context === contexto)
  if (lista.length === 0) return null
  return (
    <section className="section container document-library" aria-labelledby={tituloId}>
      <h2 id={tituloId} className="resource-list-title">Materiais disponíveis</h2>
      <div className="document-list">
        {lista.map((doc) => <DocumentRow key={doc.href} title={doc.title} type={doc.type} description={doc.description} href={doc.href} format={doc.format} sizeBytes={documentSizes[doc.href]} origin={doc.origin} cover={doc.cover} />)}
      </div>
    </section>
  )
}
