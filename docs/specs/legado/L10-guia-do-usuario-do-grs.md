# SPEC L10 — Guia do usuário do GRS (PDF e vídeos)

> Origem no legado: `/apoio-a-decisao/guia-do-usuario-do-grs/` e `/apoio-a-decisao/`. Depende da L00. Levantamento em 2026-10-19.

## Intenção

Quem abre o Sistema de Apoio à Decisão (GRS) precisa do guia. A página nova diz "Guia em preparação" e que a rota "está pronta para receber o arquivo", mas o guia e três vídeos já existiam no site antigo.

## O que existia (evidência)

- Página "Guia do usuário do Sistema de Apoio à Decisão para Gerenciamento de Resíduos Sólidos (GRS)":
  - "Guia do usuário (PDF)" → Drive `1kDYgsl6WVUqYSDmI2ffLSdkeKpF_Ulje`;
  - "Guia em Vídeos", três vídeos incorporados do Drive: Parte 1 `1hI44A4QRaJEqHI_YH6XzQVB1BnU_F6T-`, Parte 2 `1yxW_8TKnAdviydhHauPpnHFOckaHDFIQ`, Parte 4 `1H_swkYCo0WZSdU0ovMCC3c--ERkrN-E8`. **Não há Parte 3** na fonte.
- Página "Apoio a Decisão": "Estimativa de Embalagens Produzidas, Comercializadas e Consumidas no Estado", com o link "Embalagens: Produção a Consumo" → **o mesmo arquivo** `1kDYgsl6WVUqYSDmI2ffLSdkeKpF_Ulje`.

## Escopo

- Inclui:
  - Guia em PDF (`DocumentRow`, Drive) e os três vídeos na página do guia; sai o aviso "Guia em preparação".
  - Vídeos como links "Assistir no Drive", ou incorporados (decisão 2).
  - Guia em Documentos e na busca; ação direta na seção Apoio a decisão de Produções.
- Não inclui: produzir a Parte 3.

## Contrato de comportamento

### Dado
`/apoio-a-decisao/guia-do-usuario-do-grs/`.

### Quando
A página carrega.

### Então
Oferece o guia em PDF e as Partes 1, 2 e 4 dos vídeos, com aviso de que a Parte 3 não foi encontrada no acervo.

## Restrições e invariantes

- Acessibilidade: vídeo incorporado com `title`; link alternativo sempre visível.
- Texto alterado: saem "Guia em preparação" e a frase sobre a rota "pronta para receber o arquivo" (aprovar).

## Decisões pendentes

1. **Qual é o arquivo `1kDYgs…`?** O site antigo o chama de "Guia do usuário (PDF)" numa página e de "Embalagens: Produção a Consumo" na outra. Abrir o arquivo; o rótulo errado não entra, e a "Estimativa de Embalagens" pode ser um arquivo perdido.
2. **Vídeos:** incorporar o Drive (pesado, cookies de terceiros) ou só links? Recomendação: links.
3. **Parte 3:** a equipe tem o arquivo?

## Critérios de aceite

- [ ] Guia e vídeos pela L00; página, Produções, Documentos e busca na mesma fonte.
- [ ] Aviso da Parte 3 ausente (RC-6), sem inventar.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato.
- Avaliação manual: página do guia em 390 e 1440, teclado nos vídeos.
- Gate local: `npm run check:quality`.
