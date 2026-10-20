# SPEC N04 — Um diretório de municípios por tipo de documento

> Origem: pedido do dono do projeto em 2026-10-20 ("cada tipo de documento precisa ter a própria lista de municípios, e cada município só abre o documento daquela lista, sem misturar nada"). O esboço abaixo foi apresentado a ele e aprovado ("pode fazer"), incluindo as sugestões que ele não contestou: renomear "Panorama" para "Diagnóstico" e manter Bonito na coleta seletiva, com aviso. Levantamento do código em 2026-10-20, sobre a `main` em `af4023d`.

## Intenção

Hoje a pessoa filtra a lista por "compostagem" ou "educação ambiental", mas cada linha continua oferecendo "Panorama · PDF" e "Plano de coleta seletiva", então o link abre outra coisa. Em Plano de Coleta Seletiva, cada município tem dois links (plano e panorama), o que confunde. Quem procura o plano de coleta seletiva de Bonito, o de educação ambiental ou o de compostagem tem que chegar ao documento certo em um clique, sem decidir entre dois.

## O que existe hoje (evidência)

| Onde | Componente | Problema |
|---|---|---|
| `/cidades/`, `/diretorios/`, `/panoramas-da-gestao-de-residuos/` (+ caminho longo do WordPress) | `MunicipalityIndex` (79 municípios) | Filtros "com plano", "com educação ambiental" e "com compostagem" filtram a lista, mas a linha tem sempre "Panorama · PDF" e "Plano de coleta seletiva" |
| `/municipios-contemplados/` e o caminho longo de coleta | `Municipalities mode="coleta"` → `MunicipalityIndex filtroInicial="com-plano"` | Dois links por linha (plano e panorama), 15 municípios |
| `…/plano-de-compostagem/municipios-contemplados/` | `Municipalities mode="compostagem"` | Lista própria de `DocumentRow` (5), em outro formato |
| `/planos-de-educacao-ambiental/` e `/educacao-ambiental/planos-de-educacao-ambiental/` | `EducationPlans` | Lista própria de `DocumentRow` (17), em outro formato |
| `/cidades/<slug>/` | `CityDetail` | Reúne todos os documentos do município (fica, ver abaixo) |
| Painel do mapa em `/cidades/?visao=mapa` | `MunicipalityMap` | Ações "Ficha", "Panorama · PDF" e "Plano de coleta seletiva" |

Fontes de dados (não mudam): `cityRecords` (79, `panoramas.generated.ts`), `selectiveCollectionPlans` (15, com `primaryDocumentUrl`), `municipalDocuments` (17 de educação ambiental e 5 de compostagem, `municipalDocuments.ts`).

## Escopo

Quatro diretórios, cada um com a **mesma tela** (um único componente configurável) e **uma só ação por linha**:

| Diretório | Onde fica | Municípios | O que abre |
|---|---|---|---|
| Diagnóstico da gestão de resíduos | `/cidades/` (também `/diretorios/` e `/panoramas-da-gestao-de-residuos/`) | 79 | nome → ficha do município; ação "Diagnóstico · PDF" → só o diagnóstico (PDF local) |
| Plano de Coleta Seletiva | `/municipios-contemplados/` e o caminho longo | 15 | a linha → só o plano (`primaryDocumentUrl`) |
| Educação Ambiental | `/planos-de-educacao-ambiental/` e `/educacao-ambiental/planos-de-educacao-ambiental/` | 17 | a linha → só o plano de educação ambiental |
| Compostagem | `…/plano-de-compostagem/municipios-contemplados/` | 5 | a linha → só o documento de compostagem |

- Inclui:
  - Um município que tem os três documentos aparece nos três diretórios, **uma entrada em cada**, cada uma levando só ao seu documento.
  - Tirar os filtros de plano, educação ambiental e compostagem de `/cidades/`. Em seu lugar, uma linha de links para os outros diretórios, com a contagem (por exemplo, "Plano de coleta seletiva · 15").
  - Tirar "Plano de coleta seletiva" do painel do mapa (fica "Ficha" e "Diagnóstico · PDF").
  - Trocar "Panorama" por "Diagnóstico" nos **textos exibidos** (ver restrições).
  - Bonito na lista de coleta seletiva: a linha continua, com aviso (decisão 1 abaixo).
- Não inclui:
  - Mudar a ficha do município (`CityDetail`): continua reunindo todos os documentos, inclusive o cronograma e os mapas da coleta seletiva, que a lista de coleta deixa de mostrar.
  - Remover ou mudar qualquer URL pública, slug ou nome de arquivo.
  - Mudar os dados gerados (`*.generated.ts`) ou o mapa de rotas.
  - Mudar a busca do portal (`search.ts`), exceto o texto "Panorama" dos rótulos.

## Contrato de comportamento

### Dado
Cada um dos quatro diretórios, em 390 e 1440 px.

### Quando
A pessoa abre a lista, busca um município e clica nele.

### Então
- A lista mostra exatamente os municípios que têm aquele documento (79, 15, 17 e 5) e a contagem.
- Cada linha tem **um** link; ele abre **aquele** documento e nenhum outro (nova aba, `rel="noopener"`).
- Em `/cidades/`: o nome abre a ficha, a ação abre o PDF do diagnóstico. Nada de plano ou compostagem nas linhas.
- Bonito aparece nos quatro diretórios (Bonito tem diagnóstico, plano de coleta e compostagem; confira se tem educação ambiental) e nenhuma linha dele mistura documentos.
- A busca por nome e o alfabeto continuam funcionando onde já existem.

## Restrições e invariantes

- **URLs:** nenhuma removida ou alterada (regra do `AGENTS.md`). Os aliases legados e `resolveRoute` ficam como estão.
- **Textos:** trocar só o que o visitante lê. **Não** renomear identificadores, nomes de arquivo, slugs nem rotas (`panoramas.generated.ts`, `/panoramas-da-gestao-de-residuos/`, `Panorama-de-Gestao-de-RS-…pdf`). **Não** renomear "Panorama e Censo dos Catadores", que é outro documento (`/panorama-e-censo-dos-catadores/`, `documents.ts`, `LegacyPages.tsx`, `search.ts`).
- **Conteúdo que não pode ser inventado:** o aviso de Bonito diz só o que está verificado (o arquivo marcado como plano no banco é o "Anexo I – Minuta da Lei de Coleta Seletiva Municipal"; `docs/specs/legado/verificacao-2026-10-19.md`). Não escrever que o plano "não existe" além disso.
- **Dados:** não editar `*.generated.ts`; as contagens vêm dos dados, não de números digitados.
- **Acessibilidade:** a linha tem um link com nome acessível "<Município>: abrir o <documento> (nova aba)"; foco visível; alvo de toque de 44 px no celular; sem rolagem horizontal de 320 a 1440 px.
- **Design:** manter o visual existente (CP-06, tokens, sem sombras nem efeitos novos); `npm run check:design` não pode piorar nenhum teto.
- **Reuso:** os quatro diretórios usam o mesmo componente; as listas próprias de `DocumentRow` de compostagem e educação ambiental saem. A diferença entre eles fica em uma configuração por tipo (município → URL, rótulo da ação, textos), e não em `if`s espalhados.

## Decisões (já tomadas pelo dono do projeto, ao aprovar o esboço)

1. **Bonito na coleta seletiva:** a linha continua, apontando para o arquivo hoje marcado como plano, com um aviso curto de que esse arquivo é a minuta da lei. A troca pelo plano verdadeiro depende da equipe (spec N03).
2. **"Diagnóstico" substitui "Panorama"** nos textos visíveis. O dono do projeto precisa aprovar a lista final dos textos alterados (handoff), como nos blocos anteriores.
3. **A ficha do município fica,** e a lista de municípios do diagnóstico leva a ela.
4. **O mapa fica só no diagnóstico.**

## Pontos que o Orca decide (com a recomendação)

- **Busca e alfabeto nos diretórios pequenos:** com 5 e 15 municípios, o alfabeto é desnecessário. Recomendação: busca em todos, alfabeto só no diagnóstico (79).
- **Linha de outros diretórios em `/cidades/`:** posição e formato. Recomendação: no lugar dos filtros, com `Link` interno e a contagem.
- **Como o aviso de Bonito é exibido** (texto abaixo do nome, ou `Badge`). Recomendação: texto curto sob o nome, no mesmo tom das notas do índice.

## Critérios de aceite

- [ ] Os quatro diretórios usam o mesmo componente, com 79, 15, 17 e 5 municípios, vindos dos dados.
- [ ] Cada linha tem um único link e abre só o documento do diretório (teste com URLs literais, por exemplo Bonito, Corumbá, Naviraí).
- [ ] `/cidades/` sem os filtros de plano, educação ambiental e compostagem; com links para os outros diretórios.
- [ ] Painel do mapa sem a ação de plano de coleta seletiva.
- [ ] "Panorama" → "Diagnóstico" só nos textos visíveis; "Panorama e Censo dos Catadores", URLs, slugs e arquivos intactos (teste por busca no código).
- [ ] Nenhuma URL pública removida; `validate-project` e o teste "toda página publicada no WordPress resolve" continuam passando.
- [ ] `npm run check:quality` e `npm run check:design` verdes; avaliação em 390 e 1440 px e sem rolagem horizontal de 320 a 1440 px.

## Plano de validação

- Testes (Red primeiro): contrato de cada diretório (contagem, link único, URL literal), `/cidades/` sem filtros, painel do mapa, busca textual de "Panorama" restante. Atualizar os testes que dependem do comportamento antigo: `tests/design-contract.test.mjs` (`filtroInicial=` na linha 359 e o D3.1), `tests/legacy-contract.test.mjs` (ligação do índice, filtros e `municipalDocuments`), `tests/map-contract.test.mjs` (três ações do painel).
- Navegador: os quatro diretórios, uma busca, o clique em Bonito (nos quatro), teclado e leitor de tela na linha.
- Gate local: `npm run check:quality` e `npm run check:design`.
