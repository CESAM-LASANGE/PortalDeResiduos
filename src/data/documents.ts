// Documentos do acervo que não são de um município (panoramas e planos ficam em
// cities.ts e selective-collection-plans.generated.ts). Fonte única para as
// páginas e para a busca. Títulos e descrições são os já publicados no portal ou, nos
// documentos do site antigo, o nome real do arquivo (docs/specs/legado/verificacao-2026-10-19.md).

export type DocumentType = 'Nota técnica' | 'Artigo' | 'Revista' | 'Monografia' | 'Dissertação' | 'Estudo' | 'Cartilha' | 'Folder' | 'Ferramenta' | 'Projeto arquitetônico' | 'Modelo editável'

export type PortalDocument = {
  title: string
  type: DocumentType
  /** Formato conhecido; vazio em links do Drive e externos, quando não se sabe. */
  format?: 'PDF' | 'DOCX' | 'DOC' | 'XLSM'
  /** Onde o arquivo está: em public/uploads (com tamanho gerado), no Google Drive ou em outro site. */
  origin: 'local' | 'drive' | 'external'
  /** Arquivo local (/uploads/…; tamanho em document-sizes.generated.ts) ou URL do Drive ou externa. */
  href: string
  description: string
  cover?: string
  /** Página do portal que contextualiza o documento, quando existe. */
  context?: string
}

const U = '/uploads/'

export const documents: PortalDocument[] = [
  { title: 'Nota Técnica — Catadores de materiais recicláveis', type: 'Nota técnica', origin: 'local', format: 'PDF', href: `${U}2025/12/NOTA_TECNICA_-_Catadores__revisada.pdf`, cover: `${U}2025/12/NOTA_TECNICA_-_Catadores__revisada-pdf.jpg`, description: 'Referências para reconhecimento, inclusão e fortalecimento da cadeia da reciclagem.', context: '/nota-tecnica/' },
  { title: 'Proposta de metodologia para cobrança da taxa dos serviços públicos de coleta, tratamento e disposição final de resíduos sólidos domiciliares nos municípios sul-mato-grossenses', type: 'Nota técnica', origin: 'local', format: 'PDF', href: `${U}2021/11/Nota-tecnica-Taxa-RSU-FINAL-1.pdf`, cover: `${U}2021/11/Nota-tecnica-Taxa-RSU-FINAL-1-pdf.jpg`, description: 'Referência para discussão de custos e financiamento dos serviços.', context: '/publicacoes/' },
  { title: 'Panorama e Censo dos Catadores', type: 'Estudo', origin: 'local', format: 'PDF', href: `${U}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final.pdf`, cover: `${U}2025/12/Panorama-e-Censo-dos-Catadores-LIVRO-versao-final-pdf.jpg`, description: 'Dados e referências para reconhecer o trabalho dos catadores em Mato Grosso do Sul.', context: '/panorama-e-censo-dos-catadores/' },
  { title: 'Revista IBRAPARC', type: 'Revista', origin: 'local', format: 'PDF', href: `${U}2025/12/Revista-IBRAPARC.pdf`, cover: `${U}2025/12/Revista-IBRAPARC-pdf.jpg`, description: 'A primeira edição da Revista IBRAPARC, "A Auditoria Climática da Reciclagem inclusiva", traz uma análise pioneira do balanço climático dos resíduos no MS, destacando o Reciclarbono e o protagonismo dos catadores.', context: '/publicacoes/' },
  { title: 'Cadeia da Reciclagem e sua Tributação no Estado de Mato Grosso do Sul', type: 'Artigo', origin: 'local', format: 'PDF', href: `${U}2025/12/artigo_Cadeia-de-Reciclagem.pdf`, cover: `${U}2025/12/artigo_Cadeia-de-Reciclagem-pdf.jpg`, description: 'A tributação encarece os recicláveis em MS, prejudicando sua competitividade. Contudo, a logística reversa se mostra economicamente vantajosa, gerando economia para municípios e empregos, sendo a desoneração tributária apontada como solução urgente para consolidar a política ambiental.', context: '/publicacoes/' },
  { title: 'Extinção dos lixões no Mato Grosso do Sul: atuação do ministério público na mitigação das mudanças climáticas – um estudo de caso', type: 'Artigo', origin: 'local', format: 'PDF', href: `${U}2021/11/artigo2-1.pdf`, cover: `${U}2021/11/artigo2-1-pdf.jpg`, description: 'Material técnico produzido no âmbito do projeto.', context: '/publicacoes/' },
  { title: 'Projeto resíduos sólidos: disposição legal – a atuação articulada do ministério público estadual, tribunal de contas e o instituto do meio ambiente na busca pela extinção dos lixões em mato grosso do sul', type: 'Artigo', origin: 'local', format: 'PDF', href: `${U}2021/11/Artigo-RSDL-1.pdf`, cover: `${U}2021/11/Artigo-RSDL-1-pdf.jpg`, description: 'Análise sobre a destinação ambientalmente adequada dos rejeitos.', context: '/publicacoes/' },
  { title: 'Cartilha para cooperativas', type: 'Cartilha', origin: 'local', format: 'PDF', href: `${U}2022/08/cartilha_compressed.pdf`, cover: `${U}2022/08/cartilha_compressed-pdf.jpg`, description: 'Material de apoio para organização e fortalecimento das cooperativas de catadores.', context: '/cooperativas/' },
  { title: 'Cartilha de compostagem acelerada', type: 'Cartilha', origin: 'local', format: 'PDF', href: `${U}2025/03/Cartilha_compostagem_acelerada.pdf`, cover: `${U}2025/03/Cartilha_compostagem_acelerada-pdf.jpg`, description: 'Material introdutório para consulta e compartilhamento.', context: '/plano-de-compostagem/' },
  { title: 'Modelo de Estatuto e Ata', type: 'Modelo editável', origin: 'local', format: 'DOCX', href: `${U}2023/02/Modelo-Estatuto-de-Ata-oficial.docx`, description: 'Documento editável para apoiar a formalização e a organização da cooperativa.', context: '/cooperativas/' },
  { title: 'Estatuto de Cooperativa', type: 'Modelo editável', origin: 'local', format: 'DOC', href: `${U}2023/02/Estatudo-de-Cooperativa-oficial.doc`, description: 'Referência de estatuto para consulta e adaptação conforme a realidade local.', context: '/cooperativas/' },
  // Do site antigo (Bloco B, L05–L11): URLs do banco (ver legacy-documents.generated.ts e o contrato).
  { title: 'Manual da Planilha de Dimensionamento', type: 'Ferramenta', origin: 'drive', href: 'https://drive.google.com/file/d/1jMH8gmUiMow3Hf7rl-3WxCTjuPFkm6ka/view?usp=sharing', description: 'Documento auxiliar ao uso da planilha de dimensionamento de usina de compostagem.', context: '/plano-de-compostagem/' },
  { title: 'Cartilha de compostagem: gestão de resíduos orgânicos', type: 'Cartilha', origin: 'drive', href: 'https://drive.google.com/file/d/1355gzxzSPeuwMm623MKCGvKcle05d0mq/view?usp=drive_link', description: 'Cartilha do plano de compostagem.', context: '/plano-de-compostagem/' },
  { title: 'Compostagem em 4 passos', type: 'Folder', origin: 'drive', href: 'https://drive.google.com/file/d/1ry-7dcyVviDYUYuxErVeFHQXxiytO19s/view?usp=sharing', description: 'Folder do plano de compostagem.', context: '/plano-de-compostagem/' },
  { title: 'Planilha de Dimensionamento de Usina de Compostagem', type: 'Ferramenta', origin: 'drive', href: 'https://drive.google.com/file/d/1X6vLjzmSetjmFBbfKg4ouv-xjcTn9mj1/view?usp=sharing', description: 'Planilha editável (XLSM) para dimensionar uma usina de compostagem.', context: '/plano-de-compostagem/' },
  { title: 'Projeto Arquitetônico para Usina de Triagem de Resíduos de Campo Grande', type: 'Projeto arquitetônico', origin: 'drive', href: 'https://drive.google.com/file/d/1lbZHpsd1i3Y3ck9i8BiJ_hI_dKkKqpxc/view?usp=drive_link', description: 'Apresentação da usina de triagem de resíduos (UTR) de Campo Grande.', context: '/modelo-de-usinas-de-triagem-de-residuos/' },
  { title: 'Projeto Arquitetônico para Usina de Triagem de Resíduos de Corumbá', type: 'Projeto arquitetônico', origin: 'drive', href: 'https://drive.google.com/file/d/1MZPr7Ugv1MDKpwwhaebQ41ETNDL1qYsP/view?usp=drive_link', description: 'Apresentação da usina de triagem de resíduos (UTR) de Corumbá.', context: '/modelo-de-usinas-de-triagem-de-residuos/' },
  { title: 'Cartilha para implantação de taxa municipal de resíduos sólidos urbanos', type: 'Cartilha', origin: 'drive', href: 'https://drive.google.com/file/d/1YU1a6EPE5z8tSnC7Zsrk8pDVM8QcGMVS/view', description: 'Produção do convênio sobre a taxa de resíduos (setembro de 2024).', context: '/producoes-do-convenio/' },
  { title: 'Relatório Anual de Logística Reversa', type: 'Estudo', origin: 'drive', href: 'https://drive.google.com/file/d/1KBPhZHiq80R8NwT0U70EPmAogChRQALZ/view?usp=drive_link', description: 'Levantamento de logística reversa produzido no convênio.', context: '/producoes-do-convenio/' },
  { title: 'Mapeamento dos Agentes da Reciclagem', type: 'Estudo', origin: 'drive', href: 'https://drive.google.com/file/d/1NNqdyAp-vV9trbUkiGfJuPjjj8KtKjkv/view', description: 'Levantamento dos agentes da reciclagem produzido no convênio.', context: '/producoes-do-convenio/' },
  { title: 'Panorama da Educação Ambiental', type: 'Estudo', origin: 'drive', href: 'https://drive.google.com/file/d/15fTjnC-jQaS4rnUjdhcVpbZasI01-oEl/view', description: 'Diagnóstico da educação ambiental em resíduos sólidos no Estado.', context: '/educacao-ambiental/' },
  { title: 'Cadeia da Reciclagem e sua Tributação — material de divulgação', type: 'Estudo', origin: 'drive', href: 'https://drive.google.com/file/d/1mieuKqx8DXIHJKpHyCQyPltMAxYTe7_P/view?usp=drive_link', description: 'Material de divulgação sobre a cadeia da reciclagem e sua tributação em Mato Grosso do Sul.', context: '/educacao-ambiental/' },
  { title: 'Relatório geral dos panoramas', type: 'Estudo', origin: 'drive', href: 'https://drive.google.com/file/d/1Q49QXa3_bDXpr1d--3X486isvoq_Zfps/view?usp=drive_link', description: 'Panorama de gestão de resíduos sólidos no estado.', context: '/disposicao-legal/' },
  { title: 'Estudo estatístico para estimação de resíduos sólidos', type: 'Estudo', origin: 'drive', href: 'https://drive.google.com/file/d/1kDYgsl6WVUqYSDmI2ffLSdkeKpF_Ulje/view', description: 'Estimativa de embalagens produzidas, comercializadas e consumidas no Estado.', context: '/apoio-a-decisao/' },
  { title: 'Análise gravimétrica dos resíduos sólidos urbanos do município de Dourados, MS', type: 'Artigo', origin: 'external', href: 'https://interacoes.ucdb.br/multitemas/article/view/3608/2704', description: '', context: '/publicacoes/' },
  { title: 'Análise das Ações de Educação Ambiental em Resíduos Sólidos no Estado de Mato Grosso do Sul', type: 'Artigo', origin: 'external', href: 'https://periodicos.newsciencepubl.com/ans/article/view/1607', description: '', context: '/publicacoes/' },
  { title: 'Implementação de taxa municipal de resíduos sólidos urbanos', type: 'Artigo', origin: 'external', href: 'https://periodicos.newsciencepubl.com/ans/article/view/1758/2224', description: '', context: '/publicacoes/' },
  { title: 'Panorama da gestão dos resíduos sólidos de Dourados – MS (CONTECC)', type: 'Artigo', origin: 'drive', href: 'https://drive.google.com/file/d/1p_ejNGEZugr105f9k33ZqIg2ugcAzkg2/view', description: '', context: '/publicacoes/' },
  { title: 'Monografia da Claudia Aquino Gasparetto, FAENG/UFMS', type: 'Monografia', origin: 'external', href: 'https://repositorio.ufms.br/bitstream/123456789/4343/1/CLAUDIA_GASPARETTO_MONOGRAFIA_TF.pdf', description: '', context: '/publicacoes/' },
  { title: 'Dissertação de mestrado da Kamila Barbosa Nunes do Programa de Pós-Graduação em Direito da UFMS', type: 'Dissertação', origin: 'external', href: 'https://repositorio.ufms.br/retrieve/a0abe72e-f4a9-43b9-a631-68b8451ea144/VERS%c3%83O%20FINAL%2028062022%20Disserta%c3%a7%c3%a3o%20UFMS%20-%20%20Kamila%20Barbosa%20Nunes.pdf', description: '', context: '/publicacoes/' },
]
