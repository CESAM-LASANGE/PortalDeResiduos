# TASK — Bloco D: dados das 5 fichas do site antigo (L02, L03)

> Specs: `docs/specs/legado/L02-locais-de-entrega-voluntaria.md` e `L03-indicadores-de-coleta-seletiva-2018-2019.md`, aprovadas em 2026-10-19 com as recomendações. Empilhada sobre o Bloco C.

## Objetivo

1. `npm run sync:data` gera `src/data/legacy-city-data.generated.ts` a partir das fichas publicadas de Campo Grande, Corumbá, Dourados, Ponta Porã e Três Lagoas.
2. As 5 fichas mostram "Locais de entrega voluntária" e "Coleta seletiva em 2018 e 2019", com fonte e data; as outras 74 não mudam.

## Decisões aplicadas

- L02: link para o My Maps (b); "Informação publicada em 2021 no portal anterior"; sem as imagens de localização.
- L03: fonte "portal anterior"; título com os anos; vazio vira "—", nunca 0; casas decimais da fonte.

## Seams de teste

- Saída do gerador contra o texto do banco, valor a valor nos casos citados nas specs.
- `formatarIndicador` (função pura).
- Navegador: as 5 fichas e uma sem dado, em 390 e 1440.

## Critérios de aceite

- [x] Dado gerado do banco; 5 municípios, 46 entradas em Dourados, 9 indicadores × 2 anos.
- [x] Bloco só nas 5 fichas; Três Lagoas com "Em migração".
- [x] Data da informação e fonte visíveis; vazio como "—".
- [x] Tabela com `caption` e `th scope`; rola na própria caixa quando não cabe, sem rolagem da página.
- [x] `check:quality` e `check:design` verdes.

## Handoff

- Alterações: `scripts/generate-legacy-city-data.mjs` (em `sync:data`), `src/data/legacy-city-data.generated.ts`, `src/data/indicadores.ts`, `src/components/DadosDoPortalAnterior.tsx`, ficha em `CityPages.tsx`, estilos de tabela (`.data-table`, `.table-scroll`), `tests/city-data-contract.test.mjs`.
- Evidências: 72 testes; gerador determinístico; as duas fontes do banco (`post_content` e `_elementor_data`) têm os mesmos números nas 5 fichas; navegador em 390 e 1440 px: 9 linhas por tabela, 5 "—" em Dourados 2018, 46 itens em Dourados, link do mapa em Campo Grande, "Em migração" em Três Lagoas, nenhum bloco em Bonito, bloco dentro da tela, console limpo.
- Textos públicos novos (aprovar): "Locais de entrega voluntária", "Informação publicada em 2021 no portal anterior", "Ver locais no mapa (Google Maps)", "Cidade não possui locais de entrega voluntária.", "Em migração" / "A lista de locais de entrega voluntária desta cidade estava incompleta no portal anterior.", "Coleta seletiva em 2018 e 2019", "Indicadores de coleta seletiva de <Município>", rótulos das linhas, "Fonte: portal anterior (dados de 2018 e 2019).", "— indica dado não informado na fonte.", "A fonte não informa a unidade da produção diária."
- Limitações/riscos: a fonte primária dos números (SNIS ou levantamento do convênio) segue desconhecida; os pontos de entrega podem não existir mais.
- Próximo passo: revisão dos 4 PRs, em ordem (A → B → C → D).
