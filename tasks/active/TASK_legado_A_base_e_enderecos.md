# TASK — Bloco A: base dos documentos do legado (L00) e URLs antigas dos planos (L13)

> Specs: `docs/specs/legado/L00-base-documentos-do-legado.md` e `L13-urls-antigas-dos-planos-por-municipio.md`. Aprovadas pelo dono do projeto em 2026-10-19 ("dei uma lida por cima e está bom"), incluindo as recomendações das decisões pendentes.

## Objetivo

1. `npm run sync:data` gera `src/data/legacy-documents.generated.ts` a partir de `BD/`, com cada link de documento das páginas publicadas do WordPress (rótulo, texto anterior, URL, origem).
2. `PortalDocument` e `DocumentRow` aceitam as origens `local`, `drive` e `external`.
3. As 15 URLs `/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/<município>/` são aliases legados explícitos que redirecionam para `/cidades/<município>/`.
4. `scripts/check-external-links.mjs` (fora do `check:quality`, porque depende de rede) lista os links do legado que não respondem e o nome real dos arquivos do Drive.

## Decisões aplicadas

- L00, decisão 2: arquivos do Drive sem tamanho.
- L13, decisão 1: redirecionar (`history.replaceState`), como `/sobre/`.

## Seams de teste

- Saída do gerador (`legacy-documents.generated.ts`) contra valores literais das tabelas das specs.
- `resolveRoute` (`siteMap.ts`) para as 15 URLs.
- Navegador: 15 URLs, `DocumentRow` nas três origens.

## Critérios de aceite

- [x] Gerador determinístico em `sync:data`; contrato contra as specs.
- [x] `DocumentRow` com três origens; contrato atualizado.
- [x] 15 aliases; `validate-project` com 75 rotas; E10 sem página de erro.
- [x] `npm run check:quality` verde.

## Handoff

- Alterações: `scripts/lib/wordpress-dump.mjs` e `scripts/generate-legacy-documents.mjs` (novos, em `sync:data`), `src/data/legacy-documents.generated.ts` (135 links em 32 páginas), origens `local`/`drive`/`external` em `documents.ts` e `DocumentRow`, 15 aliases com `redirectTo` no `siteMap` e redirecionamento em `App.tsx`, `scripts/check-external-links.mjs`, `tests/legacy-contract.test.mjs`.
- Evidências: 8 contratos novos contra as tabelas das specs; `check:quality` verde (49 testes, 75 rotas); navegador: 15/15 URLs antigas abrem a ficha certa com os 5 documentos do plano, título da aba correto, console limpo; gerador determinístico (mesmo md5 em duas execuções); verificação de links em `docs/specs/legado/verificacao-2026-10-19.md` (120 de 124 respondem).
- Limitações/riscos: o verificador depende de rede e fica fora do gate; o plano de Bonito no catálogo atual é a minuta da lei (achado da verificação; corrigir na fonte).
- Próximo passo: Bloco B (L04–L12).
