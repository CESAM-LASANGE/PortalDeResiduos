# TASK — Mapa no Plano de Compostagem no lugar do botão de municípios

> Pedido do dono do projeto em 2026-10-25: no Plano de Compostagem, em vez do botão que leva aos municípios contemplados (mais um clique), um mapa do Estado, parecido com o dos panoramas, com os municípios contemplados em destaque, numa cor da paleta atual, e os demais sem cor (transparentes, na cor do fundo). Escolher um município destacado abre o plano de compostagem dele.

## Ponto de retorno (feito antes de qualquer alteração)

Tag **`rollback/antes-do-mapa-compostagem`** no GitHub, na `main` de então (`36450de`, já com o menu novo). Para voltar:
- **Antes de mergear:** basta não mergear este PR.
- **Depois de mergear:** `git revert -m 1 <commit do merge>` num PR novo (desfaz só esta mudança, mantém o resto), ou, para ver o site como estava, abrir a tag (`git switch --detach rollback/antes-do-mapa-compostagem`). Na Vercel, também dá para promover o deploy anterior (Deployments, menu `⋯`, "Promote to Production").

## O que foi feito

- **Plano de Compostagem** (`/plano-de-compostagem/` e o caminho longo do WordPress): saiu o botão "Ver municípios contemplados"; entrou a seção "Municípios contemplados" com o mapa (`CompostagemMap.tsx`), depois do texto e antes dos documentos.
- **Mapa:** o desenho do Estado já usado nos panoramas (contornos do IBGE). Os 5 municípios com plano (Bataguassu, Bonito, Chapadão do Sul, Naviraí e São Gabriel do Oeste, vindos dos dados) em `--mata`; o escolhido em `--cerrado`; os demais com `fill: none` (só o contorno fino), então aparece a cor do fundo. Clicar no município, ou usar o botão-marcador (teclado e leitor de tela), mostra o nome, o título do documento e o botão "Abrir o plano de compostagem" (Drive, nova aba). Esc fecha e devolve o foco. Clicar num município sem plano não faz nada.
- **Página antiga dos municípios da compostagem** (`…/plano-de-compostagem/municipios-contemplados/`) e o alias `…/materiais-compilados/municipios-contemplados/` agora **redirecionam** para `/plano-de-compostagem/`; nenhuma URL foi removida. O modo `compostagem` do componente `Municipalities` foi apagado (código morto); a página da coleta seletiva não mudou.
- O link da coleta seletiva em `SelectiveCollection` passou a ser texto fixo (mesmo destino), porque o teste de navegação só reconhece links assim.
- Sitemap regerado (108 páginas).

## Critérios de aceite

- [x] Botão removido; mapa com 5 municípios em destaque e 74 sem cor; ordem: texto, mapa, documentos.
- [x] Mouse, teclado e Esc funcionam; município sem plano não abre nada.
- [x] URLs antigas redirecionam; `check:quality` e `check:design` verdes (114 testes); sem rolagem horizontal em 390 e 1440 px; console limpo.

## Handoff

- Alterações: `CompostagemMap.tsx` (novo), `ProductionPages.tsx`, `App.tsx`, `siteMap.ts`, `scripts/generate-sitemap.mjs`, `public/sitemap.xml`, estilos, `tests/mapa-compostagem-contract.test.mjs` (novo), testes de navegação, sitemap e L12 atualizados de propósito.
- **Textos públicos novos (aprovar):** "Municípios contemplados" (rótulo), "Escolha um município no mapa.", "5 municípios têm o plano de compostagem publicado. Selecione um deles, em destaque no mapa, para abrir o plano.", "Escolha um município destacado no mapa para abrir o plano de compostagem dele.", "Abrir o plano de compostagem", "Município com plano de compostagem publicado. Os demais não têm plano publicado."
- Os filtros "Com documento de compostagem" em `/cidades/` continuam.
