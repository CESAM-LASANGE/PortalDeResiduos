# TASK — Prévia de compartilhamento com a logo original

> Pedido do dono do projeto em 2026-10-20: o card do WhatsApp mostra a logo simplificada do favicon; deve mostrar a logo original.

## Decisões

- A imagem de compartilhamento (1200 × 630) usa o selo original "Projeto Resíduos Sólidos — Disposição Legal", recortado de `public/uploads/2021/10/logo-completo.jpeg` (376 × 380 px, o arquivo de maior resolução do selo; o `logo_nobg-copy.png` tem 150 px). O fundo branco do JPEG é fundido com o papel do portal (`mix-blend-mode: multiply`). Texto: o nome e a descrição que já são públicos.
- O favicon continua sendo o selo simplificado (pedido original).
- O arquivo mudou de `og-image.png` para `og-logo.png`: o WhatsApp guarda a prévia pela URL da imagem, e o nome antigo manteria a imagem velha nos links já compartilhados.

## Critérios de aceite

- [x] `og:image` aponta para `og-logo.png`, 1200 × 630, com o selo original.
- [x] O nome antigo não existe mais.
- [x] `check:quality` verde (91 testes).

## Handoff

- Alterações: `public/og-logo.png` (novo; sai `og-image.png`), `index.html`, testes.
- Limitações: o JPEG de origem tem 376 px de largura e o selo aparece a 430 px, então fica levemente suave; só um arquivo maior da logo melhora isso.
- O WhatsApp, o Facebook e outros guardam a prévia por conta própria: links já enviados podem demorar a atualizar. O depurador de links do Facebook (developers.facebook.com/tools/debug) força a nova leitura.
