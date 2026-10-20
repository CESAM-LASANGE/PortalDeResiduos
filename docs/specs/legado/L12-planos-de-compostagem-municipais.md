# SPEC L12 — Municípios contemplados pelo plano de compostagem (5 documentos)

> Origem no legado: `/producoes-do-convenio/materiais-compilados/municipios-contemplados/`, aberta pelo botão "Municípios Contemplados" da página Plano de Compostagem. Depende da L00 e da L05. Levantamento em 2026-10-19.

## Intenção

No site antigo, "Municípios Contemplados" da compostagem levava a cinco documentos municipais. No site novo, a rota equivalente (`…/plano-de-compostagem/municipios-contemplados/`) mostra o índice com os 79 panoramas (comportamento herdado, registrado na D1.10), ou seja, não mostra o que a página promete.

## O que existia (evidência)

| Rótulo publicado | ID no Drive |
|---|---|
| Naviraí | 100yRThASV5psm9pVBQW3YAfZNBQP1Nux |
| São Gabriel do Oeste | 1wQvPY93iS4lS5s30YwpLilZ-JqYM4l8p |
| Bataguassu | 1OVBdLjENjv85unFXaFSagO3PrOIO2cc4 |
| Chapadão do Sul | 1pkROwSkQb9KXe6PomiVy2hcBzO414ZtX |
| Bonito | 1tZhydlhvw29lEOrzgHAvsGmJLEQEV8Te |

A página só tem os nomes. É **provável, mas não confirmado**, que sejam planos de compostagem municipais: a página é aberta a partir de Plano de Compostagem, e os IDs não coincidem com nenhum documento dos planos de coleta seletiva.

## Escopo

- Inclui (depois da decisão 1):
  - `…/plano-de-compostagem/municipios-contemplados/`: lista dos 5 municípios com o documento (`DocumentRow`, Drive), e não o índice dos 79.
  - Fichas dos 5 municípios: linha do documento; filtro "Com plano de compostagem (5)" no índice, se a decisão 1 confirmar.
  - Busca global.
- Não inclui: mudar a rota de Municípios Contemplados da coleta seletiva.

## Contrato de comportamento

### Dado
`/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/`.

### Quando
A página carrega.

### Então
Lista os 5 municípios e seus documentos. A ficha de São Gabriel do Oeste mostra o documento.

## Restrições e invariantes

- Conteúdo que não pode ser inventado: o tipo do documento. Até a confirmação, "Documento do plano de compostagem".
- URLs: as rotas existentes continuam.

## Decisões pendentes

1. **Bloqueante:** abrir os 5 arquivos e confirmar o que são (plano municipal de compostagem? diagnóstico?).
2. A rota `/municipios-contemplados/` (curta, hoje da coleta seletiva) continua da coleta?

## Critérios de aceite

- [ ] Tipo confirmado e registrado em `09-decisoes.md`.
- [ ] Rota de compostagem com os 5; fichas e busca na mesma fonte.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato da rota e das fichas.
- Avaliação manual: rota em 390 e 1440.
- Gate local: `npm run check:quality`.
