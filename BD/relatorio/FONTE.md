# Figura 3 do Relatório Técnico de Conclusão — Etapa 1.1

"Figura 3: Situação dos municípios quanto à disposição final dos RSD em 2024." Fonte citada na figura: TCE (2024). Está na página 26 do "Relatório geral dos panoramas" (Convênio MPMS | UEMS, TC n. 1076/2020), o mesmo PDF do Drive `1Q49QXa3_bDXpr1d--3X486isvoq_Zfps` listado em `documents.ts`.

- `figura-3-situacao-2024.png`: imagem original embutida no PDF (1301 × 918), extraída com `pdfimages -png -f 26 -l 26 relatorio.pdf`. Não editar.
- Quadro da figura: 75 municípios (95%) com disposição final adequada e 4 (5%) inadequada. Legenda: Aterro Sanitário Público, Aterro Sanitário Privado, Transbordo e Transporte dos RSD para Aterro Sanitário em outro Município, Lixão.
- A classificação por município **só existe na imagem**: `scripts/generate-disposal-map.mjs` a lê alinhando a imagem à malha do IBGE (`BD/ibge/`) e conferindo os totais do quadro. A Tabela 2 do mesmo relatório é de uma data anterior (traz mais lixões) e não serve de fonte para 2024.
