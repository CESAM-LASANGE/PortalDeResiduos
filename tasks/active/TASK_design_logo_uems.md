# TASK — Logo da UEMS no cabeçalho

> Pedido do dono do projeto em 2026-10-20: no cabeçalho, entre as logos do portal e do CESAM, colocar a logo da UEMS. Empilhada sobre `deploy/vercel-supabase`.

## Decisões

- A logo do cabeçalho era uma imagem única (`uploads/2020/03/logo.png`, 853 × 85) com portal, CESAM e MPMS. Foi cortada em duas (`public/brand/portal.png` e `cesam-mpms.png`, sem perda), e a UEMS (`uploads/2021/07/uems-removebg-preview.png`, sem as margens vazias) entra no meio: `public/brand/uems.png`. A pasta `public/brand/` é servida pela Vercel e não depende do Supabase.
- Abaixo de 1280 px o cabeçalho continua só com a marca do portal, como já era (D3.8); o celular não muda.
- Com a UEMS, a marca passou de 441 para ~630 px e o menu com a busca não cabia nos 1200 px do cabeçalho. A altura das imagens acompanha o espaço livre (31 px em 1280, até 44 px em telas largas) e o cabeçalho passa a ter até 1320 px, mais largo que o conteúdo (1200 px): em telas acima de 1360 px a marca fica ~60 px à esquerda da coluna de conteúdo.
- A UEMS é desenhada a 77% da altura das outras, para pesar o mesmo.
- Textos alternativos novos: "UEMS — Universidade Estadual de Mato Grosso do Sul" e "CESAM e Ministério Público de Mato Grosso do Sul".

## Critérios de aceite

- [x] UEMS entre o portal e o CESAM, de 1280 a 1920 px; o "Buscar" termina na borda do cabeçalho em todas as larguras testadas.
- [x] Menos de 1280 px e no celular: só a marca do portal, como antes.
- [x] `check:quality` e `check:design` verdes (89 testes).

## Handoff

- Alterações: `src/App.tsx`, `src/styles/components.css`, `src/styles/pages.css`, `public/brand/*.png`, `tests/header-logos-contract.test.mjs`; os testes D1.1 e de navegação foram atualizados (o recorte do logo não existe mais; `/brand/` não é rota).
- Limitações: em 1280 px as logos ficam pequenas (31 px; o texto do CESAM mal se lê). Se for importante, o ajuste é mover o menu para a segunda linha ou tirar o MPMS do cabeçalho; é decisão de design do dono do projeto.
