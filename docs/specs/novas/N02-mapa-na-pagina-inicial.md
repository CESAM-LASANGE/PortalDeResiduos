# SPEC N02 — Entrada para o mapa na página inicial

> Origem: decisão 2 da L01 ("onde fica o mapa"), deixada em aberto e implementada só no índice de municípios. Medições de 2026-10-19 (branch com os blocos A a D).

## Intenção

Quem chega pela inicial e procura "o meu município" reconhece o Estado desenhado mais rápido que uma lista. O site antigo tinha o mapa como uma das portas principais.

## O que já existe (evidência)

- Altura da página inicial: **4.773 px em 390 px** de largura, para uma meta de **≤ 4.800 px** (D3.3). Sobram 27 px.
- O mapa ocupa **356 px em 390** e 717 px em 1440, sem contar títulos e o painel.
- O mapa é um chunk de 12 kB, baixado só quando se escolhe "Mapa".
- Rota existente: `/cidades/?visao=mapa`.

## Escopo

- Inclui: uma entrada para o mapa na inicial, dentro do orçamento de altura.
- Não inclui: o mapa interativo completo na inicial; nova rota; mudar o índice de municípios.

## Contrato de comportamento

### Dado
`/` em 390 e 1440 px.

### Quando
A página carrega.

### Então
- Existe um bloco "Encontre o seu município" com o contorno do Estado e o botão "Abrir o mapa", que leva a `/cidades/?visao=mapa`.
- A altura da página em 390 px continua ≤ 4.800 px.
- O mapa interativo (chunk) não é baixado na inicial.

## Restrições e invariantes

- Altura: não cabem 356 px extras. Ou o bloco substitui outro (por exemplo, o atalho atual para municípios) ou usa uma miniatura de ≤ 27 px de acréscimo líquido.
- Acessibilidade: imagem decorativa com `aria-hidden`; o botão tem nome próprio.
- URLs: nenhuma nova.
- Conteúdo que não pode ser inventado: nenhum número de municípios além dos 79 do catálogo.

## Decisões pendentes

1. **Forma da entrada:** (a) miniatura estática do contorno (um `<path>` do mesmo dado gerado, sem marcadores) com botão; (b) só um botão no bloco de municípios existente; (c) mapa interativo só no desktop. Recomendação: (a), trocando o bloco atual de municípios, para não passar da meta.
2. **O que sai** se for preciso espaço: decisão do dono do projeto, porque muda o texto público da inicial.

## Critérios de aceite

- [ ] Altura da inicial em 390 ≤ 4.800 px e sem rolagem horizontal em 320–1440.
- [ ] O botão leva ao mapa; o chunk do mapa não é carregado na inicial.
- [ ] `check:quality` e `check:design` verdes; E7/E8 em 390 e 1440.

## Plano de validação

- Teste automatizado: contrato do link para `/cidades/?visao=mapa`.
- Avaliação manual: medir a altura da inicial e a lista de requisições (nenhum `MunicipalityMap-*.js`).
- Gate local: `npm run check:quality`.
