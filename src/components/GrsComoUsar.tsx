import { useId, useState } from 'react'
import { BookOpen, ExternalLink, PlayCircle } from 'lucide-react'
import { Eyebrow } from './Eyebrow'
import { videosDoGuiaFrom } from '../data/grsVideos'
import { legacyDocuments } from '../data/legacy-documents.generated'
import { documents } from '../data/documents'

export const videosDoGuia = videosDoGuiaFrom(legacyDocuments)
// O manual só aparece quando o arquivo está no catálogo: nada de botão que leva a lugar nenhum.
const manual = documents.find((doc) => doc.title === 'Guia do usuário do GRS' && doc.context === '/apoio-a-decisao/')

/**
 * "Como usar o sistema" (Apoio a Decisão): o guia em vídeo e o manual do usuário junto do GRS. O player do Drive só
 * carrega depois do clique em "Assistir": a página abre leve e a pessoa só se conecta ao Google se quiser o vídeo.
 */
export function GrsComoUsar() {
  const tituloId = useId()
  const [parte, setParte] = useState(1)
  const [carregado, setCarregado] = useState(false)
  const video = videosDoGuia.find((item) => item.parte === parte) ?? videosDoGuia[0]
  if (!video) return null
  const escolher = (nova: number) => { setParte(nova); setCarregado(false) }
  return (
    <section className="section container grs-como-usar" aria-labelledby={tituloId}>
      <div className="grs-como-usar-cabecalho">
        <Eyebrow>Como usar o sistema</Eyebrow>
        <h2 id={tituloId}>Aprenda a usar o GRS.</h2>
        <p>Assista ao guia em vídeo, em {videosDoGuia.length} partes, antes de abrir o sistema.</p>
      </div>
      <div className="grs-como-usar-layout">
        <div className="grs-video">
          <div className="segmented" role="group" aria-label="Partes do guia em vídeo">
            {videosDoGuia.map((item) => (
              <button key={item.parte} type="button" aria-pressed={item.parte === parte} onClick={() => escolher(item.parte)}>Parte {item.parte}</button>
            ))}
          </div>
          <div className="grs-video-quadro">
            {carregado ? (
              <iframe src={video.embed} title={`Guia do usuário do GRS em vídeo, parte ${video.parte}`} loading="lazy" allow="fullscreen" />
            ) : (
              <button type="button" className="grs-video-assistir" onClick={() => setCarregado(true)}>
                <PlayCircle size={40} aria-hidden="true" />
                <span>Assistir à parte {video.parte}</span>
                <small>O vídeo é carregado do Google Drive.</small>
              </button>
            )}
          </div>
          <a className="text-link" href={`https://drive.google.com/file/d/${video.driveId}/view`} target="_blank" rel="noopener">
            Abrir a parte {video.parte} no Drive <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
        {manual && (
          <aside className="grs-manual">
            <BookOpen size={22} aria-hidden="true" />
            <h3>Manual do usuário</h3>
            <p>{manual.description}</p>
            <a className="button button-dark" href={manual.href} target="_blank" rel="noopener">
              Abrir o manual <ExternalLink size={15} aria-hidden="true" /><span className="sr-only"> (abre em nova aba)</span>
            </a>
          </aside>
        )}
      </div>
    </section>
  )
}
