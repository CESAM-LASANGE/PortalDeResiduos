# TASK — Bloco B: documentos do acervo do site antigo (L04–L12)

> Specs: `docs/specs/legado/L04` a `L12`. Aprovadas pelo dono do projeto em 2026-10-19, com as recomendações das decisões pendentes. Depende do Bloco A (L00): todas as URLs vêm de `legacy-documents.generated.ts`.

## Objetivo

1. Os 17 planos municipais de educação ambiental (L04) e os 5 documentos municipais de compostagem (L12) aparecem na ficha do município, nas páginas de origem e no índice de municípios, com filtro próprio.
2. Os 19 documentos do Drive e dos links externos do site antigo (L05–L10) entram no catálogo `documents.ts` e voltam às páginas em que eram publicados.
3. Documentos (L11) mostra os 30 itens em 8 grupos, com os títulos originais dos documentos locais.
4. Toda página publicada no WordPress resolve no site novo (4 aliases novos de redirecionamento).

## Decisões aplicadas

- L10: o arquivo `1kDYgs…` publicado como "Guia do usuário (PDF)" é o "Estudo estatístico para estimação de resíduos sólidos" e entra em Apoio a Decisão com esse título. O guia em PDF não está no acervo; a página do guia avisa isso e lista os vídeos.
- L10: o vídeo publicado como "Parte 4" é o arquivo `Parte_3.mp4`; a página mostra Partes 1, 2 e 3.
- L06–L09: links, não incorporações; arquivos do Drive sem tamanho (L00).
- Artigos externos sem descrição: o site antigo só publicava o título, então nenhuma descrição foi inventada.

## Seams de teste

- `municipalDocumentsFrom` (função pura) contra os rótulos publicados.
- Catálogo `documents.ts` contra as tabelas das specs: tipos, origens, títulos originais e URLs presentes no gerado.
- Contratos de ligação: cada página usa `DocumentosDaPagina` com o seu contexto; grupos de Documentos.
- Navegador, em 390 e 1440 px.

## Critérios de aceite

- [x] 17 PMEA e 5 de compostagem por município; filtros no índice; ficha conta os documentos.
- [x] 30 documentos no catálogo, 8 grupos; títulos originais.
- [x] Compostagem 5, Educação Ambiental 2, Usinas 2, Disposição Legal 1, Apoio a Decisão 1, Guia 3 vídeos.
- [x] Saem "Guia em preparação" e "será conectado aos arquivos originais".
- [x] `npm run check:quality` e `npm run check:design` verdes.

## Handoff

- Alterações: `src/data/municipalDocuments.ts` (novo), `municipalDocuments` em `cities.ts`, filtros em `MunicipalityIndex`, ficha e páginas de Produções, 19 documentos e 5 tipos novos em `documents.ts`, `src/components/DocumentosDaPagina.tsx` (novo), 8 grupos em Documentos, vídeos do guia, link do relatório geral no índice de municípios, 4 aliases legados em `siteMap.ts`, `App.tsx` renderiza o destino do redirecionamento.
- Evidências: 59 testes; 79 rotas no `validate-project`; navegador 11 páginas × 2 larguras com as contagens esperadas, sem scroll horizontal, console limpo; grupos 2+8+2+7+5+2+2+2 = 30.
- Textos públicos novos (aprovar): "Guia em PDF não encontrado" / "O arquivo do guia não está no acervo do site antigo. Os vídeos do guia estão logo abaixo."; "Guia em vídeos"; "Guia em vídeo — Parte N"; "Um plano para cada município."; "N planos municipais de educação ambiental"; "N municípios com documentos de compostagem publicados no acervo"; rótulos dos filtros e dos grupos; títulos dos documentos municipais ("Plano Municipal de Educação Ambiental — <Município>", "Gestão dos recursos orgânicos: compostagem — <Município>").
- Limitações/riscos: dependem do Google Drive continuar público; o vídeo "Parte 3" usa o nome do arquivo, não o rótulo do site antigo.
- Próximo passo: Bloco C (L01, mapa).
