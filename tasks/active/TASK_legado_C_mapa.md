# TASK — Bloco C: mapa dos municípios (L01)

> Spec: `docs/specs/legado/L01-mapa-interativo-dos-municipios.md`, aprovada em 2026-10-19 com a recomendação (c): mapa SVG próprio, sem dependência. Empilhada sobre o Bloco B.

## Objetivo

1. `npm run sync:data` gera `src/data/municipality-map.generated.ts`: contorno de cada município (IBGE) e posição do marcador (mapa do site antigo).
2. O índice de municípios (`/cidades/`, `/diretorios/`, `/panoramas-da-gestao-de-residuos/`) alterna "Lista" e "Mapa" sobre a mesma busca e filtro; `?visao=mapa` abre no mapa.
3. Marcador → painel com "Ficha", "Panorama · PDF" e, nos 15, "Plano de coleta seletiva". Esc fecha e devolve o foco.

## Decisões aplicadas

- Decisão 1 (c): SVG com a malha do IBGE em `BD/ibge/`, sem tiles; `scripts/fetch-ibge-malha.mjs` usa rede e fica fora do gate.
- Decisão 2: só no índice de municípios.
- Coordenada do banco fora do próprio município vai para o centro do contorno oficial (2 casos, em `verificacao-2026-10-19.md`).

## Seams de teste

- Saída do gerador contra valores literais (79 slugs do catálogo, coordenadas de Maracaju e Antônio João, os 2 corrigidos).
- Contrato de ligação do índice e do mapa.
- Navegador: comportamento do contrato da spec em 390 e 1440, toque em cada um dos 79 marcadores, larguras 320–1440.

## Critérios de aceite

- [x] Coordenadas geradas do banco; contrato compara 79 slugs com o catálogo.
- [x] Seletor Lista/Mapa nas três rotas do índice; busca e filtro compartilhados.
- [x] Marcadores operáveis por teclado; painel com Esc; foco devolvido.
- [x] PDFs e planos abrem em nova aba (HTTP 200 nos 79 PDFs).
- [x] Sem rolagem horizontal em 320–1440; `check:quality` e `check:design` verdes.

## Handoff

- Alterações: `scripts/fetch-ibge-malha.mjs`, `BD/ibge/` (malha e nomes do IBGE), `scripts/generate-municipality-map.mjs` (em `sync:data`), `src/data/municipality-map.generated.ts`, `src/components/MunicipalityMap.tsx` (carregado sob demanda), seletor Lista/Mapa em `MunicipalityIndex`, token `--mata-claro`, estilos do mapa, `tests/map-contract.test.mjs`.
- Evidências: 65 testes; gerador determinístico (mesmo md5 em duas execuções); navegador em 390 e 1440 px: 79 marcadores, 15 com o filtro, busca "bo" → Aparecida do Taboado, Bodoquena e Bonito, Enter/Esc com foco, toque no centro de cada um dos 79 marcadores abre o próprio município, Lista mantém a busca, `?visao=mapa` nas três rotas, console limpo; 0 px de rolagem horizontal em 320, 390, 768, 1024 e 1440; 79/79 PDFs com HTTP 200. O mapa é um chunk de 12,2 kB gzip, baixado só ao escolher "Mapa".
- Textos públicos novos (aprovar): "Visualização", "Lista", "Mapa", "Carregando mapa…", "Municípios no mapa", "Município", "Ficha", "Fechar", "Escolha um município no mapa para ver a ficha, o panorama e o plano.", "<Município>: abrir opções".
- Limitações/riscos: sem zoom; no celular, municípios muito pequenos e vizinhos próximos (Japorã e Mundo Novo, Corumbá e Ladário) ficam mais fáceis de achar pela lista ou pela busca; malha mínima do IBGE simplifica as divisas.
- Próximo passo: Bloco D (L02, L03).
