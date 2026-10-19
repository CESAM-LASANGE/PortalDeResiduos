# TASK — Favicon do portal

> Pedido do dono do projeto em 2026-10-19: favicon a partir da logo original, numa versão mais minimalista. O portal não tinha favicon.

## Objetivo

Ícone do portal na aba do navegador, nos favoritos e na tela inicial do celular.

## Decisões

- Base: o selo "Projeto Resíduos Sólidos — Disposição Legal" (`public/uploads/2021/07/logo_nobg-copy.png`). O minimalista fica com o essencial do selo: disco claro, globo e setas de reciclagem; saem o texto em arco, os prédios e a faixa, que não se leem abaixo de 48 px.
- Cores tiradas do selo (`#d2e28b` disco, `#a9cf46` setas, `#d0e1e3` globo); o miolo é o verde-mata do portal (`#1b4b3a`), para contraste em abas claras e escuras.
- Formatos: `favicon.svg` (navegadores atuais), `favicon.ico` 16/32/48 (reserva) e `apple-touch-icon.png` 180 px sobre o papel do portal (o iOS pinta transparência de preto).
- Os PNG e o ICO foram renderizados do próprio SVG (Chromium + Pillow, fora do projeto, sem dependência nova). Se o SVG mudar, renderizar de novo.

## Critérios de aceite

- [x] `index.html` liga os três ícones; arquivos em `public/` e no `dist/`.
- [x] Legível a 16 px em aba clara e escura.
- [x] `npm run check:quality` verde.

## Handoff

- Alterações: `public/favicon.svg`, `public/favicon.ico`, `public/apple-touch-icon.png`, 3 `<link>` em `index.html`, `tests/favicon-contract.test.mjs`.
- Evidências: 5 testes; build copia os 3 arquivos; servidor entrega HTTP 200 com `image/svg+xml`, `image/x-icon` e `image/png`; prévia a 16, 32, 48, 96 e 180 px em fundo claro e escuro, com outras duas variantes descartadas.
- Limitações: `theme-color` continua `#064e3b`, fora do escopo.
