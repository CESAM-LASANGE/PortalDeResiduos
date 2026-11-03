# TASK — Cada filtro de Panoramas abre o documento do próprio filtro

> Bug apontado pelo dono do projeto em 2026-11-03: na lista de municípios (`/cidades/`), com o filtro "Com documento de compostagem" (5 municípios), o link da linha levava ao panorama, e não à compostagem; todos os filtros levavam sempre ao panorama.

## Causa
`MunicipalityIndex` montava a linha com o panorama fixo (`/uploads/2025/03/<arquivo>`) e o plano de coleta seletiva, sem olhar o filtro. O painel do mapa (`MunicipalityMap`) tinha o mesmo defeito.

## Correção
- `src/data/municipalActions.ts`: `acoesDoMunicipio(filtro, cidade, dados, incluirPlano)` decide o documento por filtro. Todos: panorama (e, só onde a página pede, o plano de coleta); Com plano de coleta seletiva: o plano; Com plano de educação ambiental: o PMEA do município; Com documento de compostagem: o documento de compostagem. **Um link por linha**, sem panorama fora de "Todos".
- A lista e o painel do mapa usam a mesma função, então não divergem.
- Rótulos novos: "Plano de educação ambiental", "Documento de compostagem" (o de coleta e o de panorama já existiam).

## Evidências
- Testes com URLs literais (Bonito nos 4 filtros, Corumbá, Naviraí) e varredura: nenhum município fora de "Todos" abre o panorama.
- Navegador, 390 e 1440 px: Todos 79, coleta 15, educação ambiental 17, compostagem 5, um link por linha com o rótulo e o destino certos; painel do mapa (Naviraí, compostagem): "Ficha" e "Documento de compostagem".
- `check:quality` e `check:design` verdes.

## Observação
Em "Todos" nas páginas Materiais Compilados, o plano de coleta continua ao lado do panorama, como antes.
