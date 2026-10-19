# SPEC L13 — URLs antigas dos planos de coleta seletiva por município

> Origem no legado: 15 páginas publicadas em `/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/<município>/`. Levantamento em 2026-10-19.

## Intenção

O `AGENTS.md` manda preservar URLs, com aliases legados explícitos. Estas 15 URLs eram públicas no site antigo e podem estar em ofícios, e-mails e buscadores; no site novo, elas abrem "Esta página ainda não está disponível".

## O que existia (evidência)

15 páginas filhas de "Plano de Coleta Seletiva", uma por município, cada uma com os links do plano no Drive. Esses links são os mesmos já extraídos para `selective-collection-plans.generated.ts` (o site novo já tem o conteúdo, só não tem as URLs):

alcinopolis, amambai, bataguassu, bonito, chapadao-do-sul, costa-rica, coxim, gloria-de-dourados, japora, miranda, mundo-novo, nova-alvorada-do-sul, porto-murtinho, rio-brilhante, sidrolandia.

Inconsistência na fonte: a página de slug `rio-brilhante` tem o título "Bataguassu".

## Escopo

- Inclui:
  - As 15 URLs no `siteMap` como aliases legados explícitos (`status: 'legacy'`), cada uma abrindo a ficha do município `/cidades/<slug>/`, que lista o plano (D3.2). Ver decisão 1.
  - Contrato: as 15 URLs resolvem para um município do catálogo de coleta seletiva.
  - `validate-project` passa a contar 75 rotas (60 + 15).
- Não inclui: novas páginas de conteúdo.

## Contrato de comportamento

### Dado
`/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/bonito/`.

### Quando
Alguém abre a URL antiga.

### Então
Vê a ficha de Bonito com o plano de coleta seletiva (e não a página de erro); o título da aba é "Bonito · Portal Resíduos MS".

## Restrições e invariantes

- URLs: nenhuma URL atual muda.
- `rio-brilhante` abre Rio Brilhante (o slug é a fonte de verdade, não o título errado da página antiga).
- Busca: aliases fora do índice de busca (como os outros legados).

## Decisões pendentes

1. **Mostrar a ficha nessa URL, ou redirecionar** (`history.replaceState` para `/cidades/<slug>/`, como já é feito com `/sobre/`)? Recomendação: redirecionar, para ter uma URL canônica por município.

## Critérios de aceite

- [ ] 15 aliases explícitos no `siteMap`; `tests/navigation-contract.test.mjs` continua verde.
- [ ] Contrato das 15 URLs; `validate-project` com 75 rotas.
- [ ] E10: nenhuma página de erro.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato das 15 rotas.
- Avaliação manual: as 15 URLs no navegador (título da aba, ficha certa, Rio Brilhante).
- Gate local: `npm run check:quality`.
