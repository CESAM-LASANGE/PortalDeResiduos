# SPEC L07 — Estudos do convênio: Taxa de Resíduos, Logística Reversa e Agentes da Reciclagem

> Origem no legado: `/producoes-do-convenio/`. Depende da L00. Levantamento em 2026-10-19.

## Intenção

Três estudos do convênio estavam na página de Produções do site antigo e não aparecem em lugar nenhum do site novo.

## O que existia (evidência)

| Rótulo publicado | ID no Drive |
|---|---|
| Taxa de Resíduos | 1YU1a6EPE5z8tSnC7Zsrk8pDVM8QcGMVS |
| Levantamento Logística Reversa | 1KBPhZHiq80R8NwT0U70EPmAogChRQALZ |
| Mapeamento dos Agentes da Reciclagem | 1NNqdyAp-vV9trbUkiGfJuPjjj8KtKjkv |

O texto de abertura da página antiga, que o site novo não reproduz, dizia: "Neste ambiente você encontra todos os produtos desenvolvidos no convênio celebrado entre o Ministério Público de Mato Grosso do Sul, a Universidade Estadual de Mato Grosso do Sul (UEMS), executado pelo CESAM, com apoio do IMASUL e do Tribunal de Contas do Estado. Estão disponíveis os panoramas da gestão dos resíduos sólidos urbanos nos 79 municípios de Mato Grosso do Sul, visitados entre 2020 e 2022. […]"

## Escopo

- Inclui:
  - Os três em Documentos (tipo "Estudo") e na busca.
  - Em Produções: "Levantamento Logística Reversa" na seção relacionada, e os outros dois numa seção "Estudos" ou na seção mais próxima (ver decisão 2).
- Não inclui: reescrever a página de Produções.

## Contrato de comportamento

### Dado
Documentos, filtro "Estudos".

### Quando
A pessoa filtra.

### Então
Aparecem os três estudos novos, mais o Panorama e Censo dos Catadores, todos abrindo o arquivo.

## Restrições e invariantes

- Títulos: os rótulos publicados.

## Decisões pendentes

1. **"Taxa de Resíduos" é a mesma "Nota técnica sobre taxa de RSU" local** (`Nota-tecnica-Taxa-RSU-FINAL-1.pdf`)? Abrir os dois antes; se for, não duplicar.
2. **Onde ficam em Produções:** seção nova "Estudos" ou dentro das seções existentes?
3. **Texto de abertura antigo:** é institucional e tem dado (79 municípios visitados entre 2020 e 2022). Voltar com ele no herói de Produções?

## Critérios de aceite

- [ ] Estudos pela L00; Documentos e busca na mesma fonte; filtro "Estudos" com contagem nova.
- [ ] E10: os três a ≤ 2 cliques (Documentos › linha).
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato.
- Avaliação manual: Documentos e Produções.
- Gate local: `npm run check:quality`.
