# TASK — Panoramas (diagnósticos) como produção própria em Produções do Convênio

> Pedido do dono do projeto em 2026-10-25: "coloque os diagnósticos em produção de convênio, crie lá um card para os diagnósticos".

## O que foi feito

- Nova seção/card **"Panoramas da Gestão de Resíduos"** em Produções do Convênio (`/producoes-do-convenio/`), logo depois de Apoio a decisão, com o atalho no topo da página. Ações: "Ver os panoramas" (abre `/cidades/`, a lista dos 79 com o Panorama geral e o mapa) e "Relatório geral dos panoramas" (PDF do Drive).
- Os links "Ver municípios" e "Panoramas da gestão de resíduos" saíram de **Materiais compilados**, onde ficariam repetidos; ali ficam "Plano de coleta seletiva" e "Acessar produção".
- `/panoramas-da-gestao-de-residuos/` e o caminho longo do WordPress `/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/` viraram **aliases legados** que redirecionam para `/cidades/` (era outra página com a mesma lista dos 79). Nenhuma URL foi removida; o componente `Panoramas` foi apagado do código e o sitemap foi regerado (109 páginas).

## Decisão de nome

O dono do projeto disse "diagnósticos" neste pedido e "panoramas" no anterior ("é panoramas"). O título do card é **"Panoramas da Gestão de Resíduos"**, o nome que o site já usava, e o texto traz a palavra: "Diagnósticos de cada município de Mato Grosso do Sul para compreender serviços, infraestrutura, destinação e prioridades." Trocar por "Diagnósticos" é mudar o `title` em `PRODUCOES` e os testes.

## Critérios de aceite

- [x] Seção própria, com atalho, em Produções do Convênio; o botão abre `/cidades/`.
- [x] Sem links repetidos em Materiais compilados; as duas URLs antigas redirecionam.
- [x] `check:quality` e `check:design` verdes (106 testes); sem rolagem horizontal em 390 e 1440 px; console limpo.

## Handoff

- Alterações: `ProductionPages.tsx`, `App.tsx`, `siteMap.ts`, `public/sitemap.xml`, testes (D3.1, D3.11 e os do Panorama geral atualizados de propósito).
- **Textos públicos novos (aprovar):** "Diagnóstico territorial" (rótulo), "Panoramas da Gestão de Resíduos", o texto da seção, "Ver os panoramas", "Relatório geral dos panoramas".
- Arquivos sem uso: o componente `Panoramas` (removido).
- Relação com a N04 (Orca): a página `/panoramas-da-gestao-de-residuos/` não existe mais como lista própria; a N04 não deve recriá-la.
