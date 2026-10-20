# Publicação do portal (Vercel + Supabase, planos gratuitos)

Mesmo padrão dos outros sites do CESAM: site estático na **Vercel**, com `vercel.json` (cabeçalhos de segurança, CSP, URLs com barra final) e domínio provisório `*.vercel.app`. Os 405 MB de PDFs e imagens do WordPress ficam no **Supabase Storage**, e a Vercel encaminha `/uploads/*` para lá; as URLs do site não mudam. **Publicar e criar contas exige autorização do dono do projeto** (`AGENTS.md`, nível 4).

```text
navegador → Vercel (app, ~0,6 MB)
              /uploads/*  ──rewrite──►  Supabase Storage, bucket público "uploads" (1.397 arquivos)
              /(.*)       ──rewrite──►  /index.html   (rotas da SPA)
```

## Passo a passo

1. **Supabase:** criar um projeto (plano gratuito). Anotar a URL (`https://<projeto>.supabase.co`) e a chave de serviço (Project Settings > API).
2. **Enviar os arquivos**, do seu terminal (a chave nunca vai para o repositório nem para a Vercel):
   ```sh
   node scripts/upload-to-supabase.mjs --dry-run     # confere: 1.397 arquivos, 405 MB
   SUPABASE_URL=https://<projeto>.supabase.co SUPABASE_SERVICE_ROLE_KEY=<chave> node scripts/upload-to-supabase.mjs
   ```
   O script cria o bucket público `uploads`, reenvia sem duplicar e pula 5 arquivos com acento no nome (um banner e as miniaturas), que o Storage não aceita e o código não usa.
3. **`vercel.json`:** trocar `SEU-PROJETO` pela referência do projeto Supabase na regra de `/uploads/:path*` (`npm run check:vercel` avisa se esquecer).
4. **Vercel:** importar o repositório (framework Vite; o `buildCommand` já está no `vercel.json`). Em Settings > Environment Variables, definir `VITE_SITE_URL` com o endereço final (por exemplo `https://<projeto>.vercel.app`).
5. **Sitemap:** com o domínio definido, rodar `VITE_SITE_URL=<endereço> npm run sync:data` e commitar `public/sitemap.xml` e `public/robots.txt`.
6. **Conferir:** abrir direto `/cidades/bonito/`, uma URL antiga de plano e um PDF (`/uploads/2025/03/Cartilha_compostagem_acelerada.pdf`); recarregar; mandar o link no WhatsApp e ver a prévia.

## Limites dos planos gratuitos (confirmar nos planos atuais)

- **Supabase pausa o projeto gratuito depois de cerca de uma semana sem atividade**, e os PDFs saem do ar até alguém reativá-lo. Precisa de uma verificação periódica (um monitor de disponibilidade apontado para um PDF, por exemplo).
- **Saída de dados do Storage: cerca de 5 GB por mês.** Um PDF de 10 MB baixado 500 vezes já passa de 5 GB; com cache de 30 dias na Vercel o consumo cai, mas vale acompanhar.
- **Armazenamento: 1 GB, e 50 MB por arquivo.** O portal usa 405 MB, e o maior arquivo tem 19 MB.
- **A Vercel no plano gratuito (Hobby)** tem limites de banda e de uso comercial; o `fundacaoSite` já a usa nesse plano.

## O que o `vercel.json` faz

- Cabeçalhos: `nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, `Permissions-Policy` sem câmera, microfone, localização nem pagamento.
- CSP: scripts só do próprio site; fora dele, só as fontes do Google e o painel do Power BI (`app.powerbi.com`). Qualquer recurso novo de fora precisa entrar na CSP.
- Cache: `/assets/*` por 1 ano (arquivos com hash) e `/uploads/*` por 30 dias.
- O build apaga `dist/uploads`, porque a Vercel serve primeiro os arquivos do próprio deploy e ignoraria a regra para o Supabase.

## Alternativas fora deste plano

`public/.htaccess` (Apache) e `public/_redirects` (Netlify, Cloudflare Pages) continuam no repositório e são inofensivos na Vercel. Nginx: `location / { try_files $uri $uri/ /index.html; }`.

## Antes de cada publicação

- `npm run sync:data` (se `BD/` mudou) e `npm run check:quality` verdes.
- `node scripts/check-external-links.mjs`: o Drive pode mudar permissões.
- Textos públicos novos aprovados (handoff de cada `tasks/active/TASK_legado_*.md`).
