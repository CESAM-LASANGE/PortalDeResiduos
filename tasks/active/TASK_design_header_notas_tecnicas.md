# TASK — Novo menu: Início, Produções do Convênio, Notas técnicas, Notícias e Contato

> Pedido do dono do projeto em 2026-10-25: o cabeçalho passa a ter Início, Produções do Convênio, Notas técnicas, Notícias e Contato; a aba Documentos sai do menu e ganha um card ao lado de Logística Reversa.

## O que foi feito

- **Menu:** `Início`, `Produções do Convênio`, `Notas técnicas`, `Notícias`, `Contato`. Documentos saiu.
- **Notas técnicas** leva a `/nota-tecnica/` (a mesma URL de sempre). Como o nome ficou no plural e só havia uma nota ali, a página agora se chama **"Notas Técnicas"**: continua com a nota dos catadores em destaque e ganhou a seção "Outras notas técnicas", que lista as demais do catálogo (hoje a proposta de metodologia para a taxa de resíduos). A lista vem de `documents.ts`, então uma nota nova aparece sozinha.
- A rota ganhou um **tipo próprio** (`technical`): só "Notas técnicas" fica destacado nela, e não também "Produções do Convênio".
- **Card Documentos:** a tela inicial já tinha um card "Publicações" (rótulo "Biblioteca pública"), ao lado de Logística Reversa e apontando para a página Documentos. Renomeei para **"Documentos"**, para casar com o título da página, e mantive a posição. A página `/publicacoes/` continua igual e acessível pelo card, pelo rodapé ("Publicações") e pela busca.

## Critérios de aceite

- [x] Menu com os 5 itens; item ativo certo em Notas técnicas, Produções e nas demais.
- [x] Card "Documentos" ao lado de "Logística Reversa", levando a `/publicacoes/`.
- [x] `check:quality` e `check:design` verdes (109 testes); sem rolagem horizontal em 390 e 1440 px; console limpo.

## Handoff

- Alterações: `App.tsx` (menu e rota), `siteMap.ts` (tipo `technical`, título "Notas Técnicas"), `ResourcePages.tsx` (`TechnicalNote`), `HomePage.tsx` (card), `tests/menu-contract.test.mjs` (novo), testes D3.8 e do Panorama geral atualizados de propósito.
- **Textos públicos novos (aprovar):** "Notas técnicas" (menu), "Notas Técnicas" (título da página e da aba), "Outras notas técnicas", e o card "Documentos".
- Observação: o rodapé ainda chama a página de "Publicações". Se quiser, troco para "Documentos".
