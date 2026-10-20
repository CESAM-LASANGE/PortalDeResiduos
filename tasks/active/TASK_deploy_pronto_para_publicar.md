# TASK — Site pronto para publicar

> Pedido do dono do projeto em 2026-10-20: fazer tudo o que falta para publicar e não depende de aprovação. Publicar em si, o domínio e a hospedagem ficam com ele.

## Objetivo

Rotas funcionando em qualquer servidor, buscadores e redes sociais lendo o site, e o guia do que falta.

## Decisões

- Domínio do sitemap e das metatags: `https://portalresiduosms.online`, o do WordPress atual (e do e-mail de contato). É suposição; `SITE_URL` troca no gerador.
- Sitemap só com páginas canônicas: 24 páginas, 79 municípios e 8 notícias (111). Ficam de fora aliases com redirecionamento, rotas legadas, caminhos longos do WordPress que repetem páginas, `/documentos/` (alias de `/publicacoes/`) e `/planos-de-educacao-ambiental/` (repete a do menu). A página de compostagem de municípios contemplados só existe no caminho longo e entra.
- Fallback de rotas para Apache (`.htaccess`, o servidor provável: a conta do WordPress é de hospedagem compartilhada) e para Netlify/Cloudflare Pages (`_redirects`); Nginx documentado.
- `theme-color` igual ao verde-mata do portal (`#1b4b3a`).
- Imagem de compartilhamento (1200×630) com o selo e só texto já público.

## Critérios de aceite

- [x] `sitemap.xml` e `robots.txt` gerados em `sync:data`; contrato contra o mapa de rotas.
- [x] `.htaccess` e `_redirects` em `public/`, copiados para `dist/`.
- [x] Metatags Open Graph e Twitter; `og-image.png`.
- [x] `docs/deploy.md` com o que depende do dono do projeto.
- [x] `check:quality` verde (79 testes).

## Handoff

- Alterações: `scripts/generate-sitemap.mjs`, `public/{sitemap.xml,robots.txt,.htaccess,_redirects,og-image.png}`, metatags e `theme-color` em `index.html`, `docs/deploy.md`, `tests/deploy-contract.test.mjs`; inclui o favicon (mesmo commit da branch `design/favicon`).
- Não verificado: o fallback em Apache real (só confirmei que os arquivos vão para `dist/`); a prévia no WhatsApp; o domínio.
- Para o dono do projeto: hospedagem e domínio, aprovação dos textos novos, publicar. Ver `docs/deploy.md`.
