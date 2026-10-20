# SPEC L09 — Relatório geral dos panoramas

> Origem no legado: página "Sobre" (`/sobre/`, conteúdo do slug `disposicao-legal` no banco). Depende da L00. Levantamento em 2026-10-19.

## Intenção

Os 79 panoramas são municipais; o relatório geral consolida o estado. É o documento natural para quem quer o quadro de Mato Grosso do Sul, e o site novo não o tem.

## O que existia (evidência)

- Link "Relatório geral dos panoramas" → Drive `1Q49QXa3_bDXpr1d--3X486isvoq_Zfps`, na página institucional (texto que começa por "O Projeto Resíduos Sólidos – Disposição Legal do Centro de Apoio Operacional… (CAOMA)…").

## Escopo

- Inclui:
  - Documentos (tipo "Estudo"), busca e Disposição Legal.
  - Índice de municípios, nas três rotas: link "Relatório geral dos panoramas" perto do cabeçalho, porque é o resumo dos 79.
- Não inclui: resumo ou números do relatório no site.

## Contrato de comportamento

### Dado
`/panoramas-da-gestao-de-residuos/`.

### Quando
A página carrega.

### Então
Há um link para o relatório geral (Google Drive, nova aba) antes da lista dos municípios.

## Restrições e invariantes

- Título: o rótulo publicado.

## Decisões pendentes

1. Também na página inicial? Pesa na altura da inicial (folga de 27 px no celular).

## Critérios de aceite

- [ ] Documento pela L00, numa só fonte para todas as páginas.
- [ ] E10: relatório a ≤ 2 cliques.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato.
- Avaliação manual: índice e Disposição Legal.
- Gate local: `npm run check:quality`.
