# TASK — Panorama geral e mapa na página de municípios; sem a aba Municípios

> Pedido do dono do projeto em 2026-10-22. Branch `design/panorama-geral-municipios`, a partir da `main`.

## O que foi pedido

1. Onde estava escrito "parecer", escrever "panorama".
2. Tirar a aba "Municípios" do menu superior; os municípios abrem só pelo cartão da tela inicial.
3. Colocar o panorama geral dentro da página de municípios, acima da lista, e ao lado dele o mapa da Figura 3 do relatório, recriado com mais qualidade.

## Decisões e interpretações

- **"Aba" de municípios** = o item do menu. A página `/cidades/` continua existindo, e o cartão da tela inicial passa a levar a ela. `/diretorios/` (que já mostrava a mesma lista com outros textos) virou alias legado e redireciona para `/cidades/`; o link duplicado "Diretórios" saiu do rodapé. Nenhuma URL foi removida.
- **Panorama geral** = o "Relatório geral dos panoramas" (PDF do Drive já listado em `documents.ts`). O texto segue o relatório (p. 24–25), quase literal; o link do relatório mudou do topo da lista para o Panorama geral. Os números (75 e 4 municípios, 95% e 5%) vêm dos dados.
- **Dados do mapa:** a classificação por município **só existe na imagem** da Figura 3 (fonte TCE, 2024); a Tabela 2 do relatório é de uma data anterior e traz mais lixões. `scripts/generate-disposal-map.mjs` lê a imagem original do PDF (`BD/relatorio/`), alinha-a à malha do IBGE e faz cada município "votar" pelas cores dos seus pixels. Se a leitura não fechar com o quadro da figura (79 municípios, 75 adequada, 4 inadequada), o script falha.
- **Conferências feitas:** a leitura dá exatamente 4 lixões (Anaurilândia, Corumbá, Ladário e Ponta Porã), como o quadro da figura; o alinhamento tem razão de aspecto 1,048 contra 1,050 da malha; os aterros da Tabela 2 coincidem em grande parte com os 13 da figura. **Ainda assim é leitura de imagem:** a equipe deve conferir a lista final contra a tabela do TCE (2024).
- **Mapa:** SVG sobre os contornos do IBGE já usados no mapa interativo, sem dependência. O lixão tem hachura (não depende só da cor), e há legenda com contagem e, em "Ver os municípios de cada categoria", a lista em texto de cada categoria. Carrega sob demanda (~12 KB compactados), só em `/cidades/`.
- **N04 (diretórios por tipo de documento):** continua pendente com o Orca. Esta tarefa mexe em arquivos que ela também toca (`CityPages.tsx`, `HomePage.tsx`, `MunicipalityIndex.tsx`); o dono do projeto disse "é panoramas", então o item da N04 que trocava "Panorama" por "Diagnóstico" fica sem efeito.

## Critérios de aceite

- [x] Nenhum "parecer" nos textos visíveis; o cartão da inicial diz "Panoramas".
- [x] Menu sem "Municípios"; o cartão da inicial abre `/cidades/`; `/diretorios/` redireciona.
- [x] Panorama geral acima da lista, com o mapa à direita (1440 px) e abaixo do texto (390 px).
- [x] Mapa com 79 municípios, 4 categorias (8, 5, 62, 4), legenda, fonte e alternativa em texto.
- [x] `check:quality` e `check:design` verdes (99 testes); sem rolagem horizontal; console limpo.

## Handoff

- Alterações: `BD/relatorio/` (figura e fonte), `scripts/generate-disposal-map.mjs` (em `sync:data`), `src/data/municipality-disposal.generated.ts`, `DisposalMap.tsx` e `PanoramaGeral.tsx` (novos), `CityPages.tsx`, `HomePage.tsx`, `App.tsx` (menu e rodapé), `siteMap.ts`, `search.ts`, `MunicipalityIndex.tsx`, token `--disp-privado`, estilos, testes (D2.5, D3.1, D3.3 e D3.8 atualizados de propósito). Também corrige o teste do domínio, que a `main` recebeu com sobra de conflito de merge.
- **Textos públicos novos (aprovar):** "Panorama geral"; "Disposição final dos resíduos em Mato Grosso do Sul."; os dois parágrafos (do relatório); "Disposição final adequada/inadequada em 2024", "75 municípios · 95%", "4 municípios · 5%"; "Relatório geral dos panoramas"; as 4 categorias da legenda; a legenda "Situação dos municípios quanto à disposição final dos resíduos sólidos domiciliares em 2024. Fonte: TCE (2024), Figura 3 do relatório geral."; "Ver os municípios de cada categoria"; o cartão da inicial ("Panoramas", "municípios com panorama publicado.", "Abrir panoramas municipais"); "Panoramas por município".
- Arquivos que ficaram sem uso: o componente `Directories` (removido do código); o menu mantém a rota `directories` só como tipo.
- **Nome da página:** "Cidades" virou "Panoramas" (pedido de 2026-10-22) no título, na trilha de navegação, na aba do navegador, no rodapé, no cartão de Produções do Convênio e nos links "Voltar para panoramas", "Ver panoramas disponíveis" e "Consultar panoramas". A URL `/cidades/` não muda. Frases que falam de uma cidade em si ("Cidade não possui locais…") ficam.
- **Plano de coleta seletiva fora da lista de panoramas** (pedido de 2026-10-22): `MunicipalityIndex` ganhou a opção `planoDeColeta` (padrão `true`); `/cidades/` e Panoramas da Gestão de Resíduos passam `false`, sem o link na linha nem no painel do mapa. Plano de Coleta Seletiva e Materiais Compilados mantêm o link. Os filtros da lista (inclusive "Com plano de coleta seletiva") continuam; a N04 trata deles.
- Limitações: dados lidos de imagem (conferir com o TCE); `Cidades` continua no rodapé; sem a aba no menu, quem chega por link direto não vê "Municípios" destacado.
