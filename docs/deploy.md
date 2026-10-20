# Publicação do portal

O portal é um site estático (SPA): `npm run build` gera `dist/`, e basta servir esse diretório. **Publicar exige autorização do dono do projeto** (`AGENTS.md`, nível 4).

## Antes de publicar

1. `npm run sync:data` (se o dump de `BD/` mudou) e `npm run check:quality` verdes.
2. `node scripts/check-external-links.mjs` perto da data: o Drive pode mudar permissões.
3. Se o domínio final não for `https://portalresiduosms.online`, rodar com `SITE_URL=https://dominio npm run sync:data` e trocar as 3 URLs `og:` em `index.html`.
4. Textos públicos novos aprovados (handoff de cada `tasks/active/TASK_legado_*.md`).

## Servidor

Qualquer rota sem arquivo precisa devolver `index.html` (as URLs como `/cidades/bonito/` e os links antigos do WordPress dependem disso). O build já leva as regras prontas:

- **Apache / hospedagem compartilhada:** `dist/.htaccess` (exige `mod_rewrite`).
- **Netlify e Cloudflare Pages:** `dist/_redirects`.
- **Nginx:** acrescentar ao `server`:

```nginx
root /caminho/para/dist;
location / { try_files $uri $uri/ /index.html; }
location ~* \.(pdf|png|jpe?g|svg|webp|docx?|xlsx?)$ { expires 30d; add_header Cache-Control "public"; }
```

## Peso

`dist/` tem ~409 MB (PDFs e imagens do WordPress). Confirmar o limite da hospedagem e servir os PDFs com cache.

## Depois de publicar

- Abrir 3 rotas direto na barra de endereço (`/cidades/bonito/`, `/noticias/`, uma URL antiga de plano) e recarregar: nenhuma deve dar 404.
- Enviar o link no WhatsApp e conferir a prévia (título, descrição e `og-image.png`).
- Enviar `https://<domínio>/sitemap.xml` ao Google Search Console.
