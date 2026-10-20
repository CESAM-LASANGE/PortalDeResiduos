# SPEC L08 — Panorama da Educação Ambiental e Cadeia da Reciclagem

> Origem no legado: `/producoes-do-convenio/educacao-ambiental/`. Depende da L00. Levantamento em 2026-10-19.

## Intenção

A página Educação Ambiental do site antigo era um índice com dois documentos, mais o link para os planos (L04). O site novo tem texto e pontos genéricos, mas não os documentos.

## O que existia (evidência)

| Rótulo publicado | ID no Drive |
|---|---|
| Panorama da Educação Ambiental | 15fTjnC-jQaS4rnUjdhcVpbZasI01-oEl |
| Cadeia da Reciclagem e sua Tributação | 1mieuKqx8DXIHJKpHyCQyPltMAxYTe7_P |

A página antiga de Produções descreve o primeiro como "o diagnóstico da educação ambiental em resíduos sólidos no Estado".

## Escopo

- Inclui:
  - "Panorama da Educação Ambiental" em Educação Ambiental (ação principal da seção em Produções, NAV-3), em Documentos (tipo "Estudo") e na busca.
  - "Cadeia da Reciclagem e sua Tributação": ver decisão 1.
- Não inclui: os planos (L04).

## Contrato de comportamento

### Dado
`/educacao-ambiental/`.

### Quando
A página carrega.

### Então
Oferece o Panorama da Educação Ambiental e o caminho para os 17 planos.

## Restrições e invariantes

- Títulos: os rótulos publicados.

## Decisões pendentes

1. **"Cadeia da Reciclagem e sua Tributação" já está no site novo** como "Cadeia de Reciclagem" (`/uploads/2025/12/artigo_Cadeia-de-Reciclagem.pdf`): na página antiga de Publicações, o link com esse título aponta para o PDF local. O link do Drive provavelmente é o mesmo artigo. Abrir antes; se for, não duplicar e corrigir o título local (ver L11).
2. O texto e os três pontos genéricos atuais da página Educação Ambiental não existem no site antigo. Manter?

## Critérios de aceite

- [ ] Documento(s) pela L00; página, Produções, Documentos e busca na mesma fonte.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato.
- Avaliação manual: página e seção em Produções.
- Gate local: `npm run check:quality`.
