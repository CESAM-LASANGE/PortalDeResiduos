# TASK — Vercel + Supabase (planos gratuitos)

> Pedido do dono do projeto em 2026-10-20: manter o padrão dos sites do CESAM e colocar tudo no Supabase com a Vercel, nos planos gratuitos. Empilhada sobre `deploy/pronto-para-publicar`.

## Objetivo

Deixar o repositório pronto para publicar na Vercel com os arquivos no Supabase Storage. Criar as contas e publicar ficam com o dono do projeto.

## Decisões

- Padrão do `fundacaoSite`: estático na Vercel, `vercel.json` com `trailingSlash`, cabeçalhos de segurança e CSP, domínio provisório `*.vercel.app` via variável de ambiente.
- O Supabase guarda só os arquivos (405 MB, 1.397 arquivos, bucket público `uploads`). O catálogo continua gerado do dump e embutido no build; não há banco nem API (ADR em `docs/data-synchronization.md` fica para quando houver conexão com o WordPress).
- `/uploads/*` é um rewrite da Vercel para o Storage: as URLs públicas, o código e as chaves de `document-sizes.generated.ts` não mudam.
- O build apaga `dist/uploads`, porque a Vercel serve antes o que está no deploy (409 MB → 640 KB).
- Os 5 arquivos com acento no nome (banner `JOB-090…` e miniaturas) não sobem; o código não os usa.
- `geolocation` fica bloqueada na Permissions-Policy, como no `fundacaoSite`; a N01 a libera se for implementada.
- O domínio vem de `VITE_SITE_URL`, com o padrão em `site.json`; um plugin do Vite troca `%VITE_SITE_URL%` em `index.html`. Sem `@types/node`, que não foi instalado.

## Critérios de aceite

- [x] `vercel.json` com rewrites, cabeçalhos, CSP e cache; contrato em `tests/vercel-contract.test.mjs`.
- [x] Script de envio com `--dry-run` (1.397 arquivos, 405 MB de 1.024 MB) e sem chave no código.
- [x] Build como o da Vercel: `dist/` com 640 KB e metatags com o domínio de `VITE_SITE_URL`.
- [x] Navegação com a CSP: 12 rotas × 390 e 1440 px, recarga de rota profunda e PDF por `/uploads/`, sem violação, erro de console nem requisição com falha.
- [x] `check:quality` verde (87 testes).

## Handoff

- Alterações: `vercel.json`, `site.json`, `.env.example`, `vite.config.ts`, `scripts/upload-to-supabase.mjs`, `scripts/check-vercel-config.mjs` (`npm run check:vercel`, fora do gate), `scripts/generate-sitemap.mjs`, `docs/deploy.md`, testes.
- Não verificado: o rewrite para o Supabase de verdade (o simulador serviu os arquivos locais no lugar do bucket); o upload real; os limites atuais dos planos gratuitos.
- Para o dono do projeto: criar o projeto Supabase e a conta na Vercel; rodar o envio com a chave; trocar `SEU-PROJETO` em `vercel.json`; definir `VITE_SITE_URL`. Passo a passo em `docs/deploy.md`.
- Riscos: Supabase gratuito pausa o projeto sem atividade (os PDFs saem do ar) e limita a saída de dados do Storage; ver `docs/deploy.md`.
