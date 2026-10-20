# SPEC L05 — Kit de compostagem (manual, cartilha, folder e planilha de dimensionamento)

> Origem no legado: `/producoes-do-convenio/materiais-compilados/plano-de-compostagem/`. Depende da L00. Ver também a L12 (municípios contemplados). Levantamento em 2026-10-19.

## Intenção

O município que quer implantar a compostagem precisa da planilha de dimensionamento e do manual dela, não só da cartilha. Hoje o site novo oferece apenas a cartilha local.

## O que existia (evidência)

Página com quatro links do Drive, nesta ordem, depois do botão "Municípios Contemplados":

| Rótulo publicado | ID no Drive |
|---|---|
| Manual da Planilha | 1jMH8gmUiMow3Hf7rl-3WxCTjuPFkm6ka |
| Cartilha | 1355gzxzSPeuwMm623MKCGvKcle05d0mq |
| Folder Compostagem | 1ry-7dcyVviDYUYuxErVeFHQXxiytO19s |
| Planilha de Dimensionamento de Usina de Compostagem | 1X6vLjzmSetjmFBbfKg4ouv-xjcTn9mj1 |

## Escopo

- Inclui:
  - Os quatro na página Plano de Compostagem como `DocumentRow` (Google Drive) e em Documentos, no filtro "Cartilhas" ou num tipo novo, "Ferramenta" (ver decisão 2).
  - Busca global com os quatro.
- Não inclui: refazer a planilha como calculadora no site (pode virar spec própria).

## Contrato de comportamento

### Dado
`/plano-de-compostagem/`.

### Quando
A página carrega.

### Então
Mostra a cartilha local e os quatro arquivos do Drive, cada um com tipo e "Abrir no Drive". A busca "planilha compostagem" traz a planilha e o manual.

## Restrições e invariantes

- Títulos: usar os rótulos publicados; "Cartilha" sozinho vira "Cartilha de compostagem (Drive)" só se a decisão 1 indicar que é outro arquivo.
- Conteúdo que não pode ser inventado: formato da planilha (XLSX, Google Sheets?) só depois de abrir o arquivo.

## Decisões pendentes

1. **"Cartilha" do Drive é a mesma "Cartilha de compostagem acelerada" local?** Se for, não duplicar; manter a local.
2. **Tipo da planilha e do manual em Documentos:** criar "Ferramenta" ou "Modelo editável"? Recomendação: "Ferramenta".

## Critérios de aceite

- [ ] Quatro documentos (ou três, se a cartilha repetir) gerados pela L00.
- [ ] Página, Documentos e busca na mesma fonte; contagens dos filtros recalculadas.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato dos documentos da página.
- Avaliação manual: página e Documentos em 390 e 1440.
- Gate local: `npm run check:quality`.
