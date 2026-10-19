# SPEC L06 — Projetos arquitetônicos das usinas de triagem

> Origem no legado: `/modelo-de-usinas-de-triagem-de-residuos/`. Depende da L00. Levantamento em 2026-10-19.

## Intenção

A página Modelo de Usinas de Triagem promete "uma referência arquitetônica" e diz que "o projeto detalhado será conectado aos arquivos originais na etapa de documentos". Os arquivos existem no banco antigo.

## O que existia (evidência)

| Rótulo publicado | ID no Drive |
|---|---|
| Projeto Arquitetônico para Usina de Triagem de Resíduos de Campo Grande | 1lbZHpsd1i3Y3ck9i8BiJ_hI_dKkKqpxc |
| Projeto Arquitetônico para Usina de Triagem de Resíduos de Corumbá | 1MZPr7Ugv1MDKpwwhaebQ41ETNDL1qYsP |

## Escopo

- Inclui:
  - Os dois na página Modelo de Usinas de Triagem, como `DocumentRow` (Google Drive), substituindo o aviso "será conectado aos arquivos originais".
  - Documentos (tipo "Projeto arquitetônico" ou "Estudo"; ver decisão), busca global e fichas de Campo Grande e Corumbá.
  - Seção "Usinas de triagem" em Produções: a ação principal passa a abrir os projetos (NAV-3).
- Não inclui: visualização das plantas no site.

## Contrato de comportamento

### Dado
`/modelo-de-usinas-de-triagem-de-residuos/`.

### Quando
A página carrega.

### Então
Lista os dois projetos e o aviso "será conectado" não aparece mais. A ficha de Corumbá mostra o projeto da usina.

## Restrições e invariantes

- Títulos: os rótulos publicados.
- Texto alterado: sai a frase "O projeto detalhado será conectado aos arquivos originais na etapa de documentos." (texto público; aprovar).

## Decisões pendentes

1. Tipo em Documentos: "Projeto arquitetônico" (novo) ou "Estudo"?

## Critérios de aceite

- [ ] Dois documentos pela L00; página, Documentos, fichas e busca na mesma fonte.
- [ ] E10: os dois projetos a ≤ 2 cliques.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato.
- Avaliação manual: página, fichas de Campo Grande e Corumbá.
- Gate local: `npm run check:quality`.
