# TASK — Vídeo tutorial e manual do GRS junto do sistema (Apoio a Decisão)

> Pedido do dono do projeto em 2026-10-25: o manual do usuário e o vídeo tutorial do GRS estão fora da página do sistema; colocá-los junto dele. Respostas dele: vídeo = as 3 partes que já temos no Drive, tocando na página; manual = "acredito que está no banco de dados".

## O que foi feito

- Nova seção **"Como usar o sistema"** em Apoio a Decisão (`/apoio-a-decisao/`), logo depois do painel do sistema: o guia em vídeo, em 3 partes, com seletor de parte.
- O player do Drive **só carrega depois do clique em "Assistir"**: a página abre leve, e a pessoa só se conecta ao Google se quiser o vídeo. Trocar de parte volta ao botão.
- A política de segurança (`vercel.json`) libera `https://drive.google.com` em `frame-src` (além do Power BI).
- O **manual** aparece como cartão ao lado do vídeo **só quando o arquivo estiver no catálogo** (`documents.ts`, título "Guia do usuário do GRS", contexto `/apoio-a-decisao/`). Hoje não está, então a página não mostra botão quebrado.
- A página do guia usa a mesma fonte dos vídeos (`videosDoGuiaFrom`), sem duplicar.

## Onde está o manual (achado)

- **Não está no banco do WordPress.** No site antigo, o botão "Guia do usuário (PDF)" apontava para o Drive `1kDYgs…`, que é o "Estudo Estatístico para Estimação de Resíduos Sólidos — Etapa 2.2", o mesmo arquivo de "Embalagens: Produção a Consumo". Nenhum anexo do banco é o manual.
- **O manual existe:** o ANEXO I desse estudo diz "Guia do Usuário do SAD-GRS — Disponível via link: *Guia do Usuário SAD - GRS.pdf*", com um link do OneDrive (`https://1drv.ms/b/s!AvSh86806cB3hc1BZmubdtNKAhiL0g?e=H3JRSb`). Ele leva a `…/Convênios LASANG-UEMS/1076-2020/Produtos/Etapa 2.2/Guia do Usuário SAD - GRS.pdf`, no OneDrive pessoal de quem produziu o relatório.
- **Esse link não é público:** a API de compartilhamento responde 401 (sem login) e a página não abre fora de uma conta. Não dá para usá-lo no portal nem baixar o arquivo automaticamente.

## Falta (depende de uma pessoa com acesso)

Baixar "Guia do Usuário SAD - GRS.pdf" e entregá-lo. Aí:
1. Copiar para `public/uploads/2026/10/Guia-do-Usuario-SAD-GRS.pdf` e rodar `node scripts/upload-to-supabase.mjs`.
2. Acrescentar a entrada em `src/data/documents.ts` (tipo `Cartilha` ou `Ferramenta`, contexto `/apoio-a-decisao/`, título "Guia do usuário do GRS"); o cartão do manual aparece sozinho e `sync:data` grava o tamanho.
3. Trocar o aviso "Guia em PDF não encontrado" da página do guia pelo documento.
Alternativa: o dono do projeto deixar o arquivo do OneDrive público ("qualquer pessoa com o link") e passar o endereço, mas hospedar uma cópia nossa é mais seguro.

## Critérios de aceite

- [x] Vídeo e sistema juntos em Apoio a Decisão; vídeo só carrega no clique.
- [x] Funciona sob a CSP de produção (simulada): 0 violações; o quadro do Drive carrega.
- [x] Sem manual no catálogo, nenhum botão quebrado.
- [x] `check:quality` e `check:design` verdes (105 testes); sem rolagem horizontal em 390 e 1440 px.
- [ ] Manual no ar (depende do arquivo).

## Handoff

- Alterações: `src/components/GrsComoUsar.tsx` e `src/data/grsVideos.ts` (novos), `ResourcePages.tsx`, `vercel.json`, estilos, testes (`grs-contract.test.mjs`; o de CSP aceita os dois domínios).
- **Textos públicos novos (aprovar):** "Como usar o sistema", "Aprenda a usar o GRS.", "Assista ao guia em vídeo, em 3 partes, antes de abrir o sistema.", "Parte 1/2/3", "Assistir à parte N", "O vídeo é carregado do Google Drive.", "Abrir a parte N no Drive", e, quando houver, "Manual do usuário" / "Abrir o manual".
- Limitações: o player é do Google (`No available adapters` no console vem dele); a pessoa se conecta ao Google ao assistir.
