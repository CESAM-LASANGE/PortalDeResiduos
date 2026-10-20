# TASK — Um diretório de municípios por tipo de documento (N04)

> Para: Orca (quem for implementar). Spec: `docs/specs/novas/N04-diretorios-por-tipo-de-documento.md`, aprovada pelo dono do projeto em 2026-10-20. Leia `AGENTS.md` e a spec inteira antes de começar. **Uma tarefa, uma branch, um PR** (`design/diretorios-por-documento`, a partir da `main`).

## Objetivo

Quatro diretórios de municípios (diagnóstico 79, coleta seletiva 15, educação ambiental 17, compostagem 5), com a mesma tela e **um só link por linha**, que abre apenas o documento daquele diretório. A spec tem a tabela completa, as restrições e os critérios.

## Ordem sugerida (TDD: Red → Green → Refactor → Eval → Review)

1. **Seams de teste** (confirmar com o dono do projeto se mudar): (a) configuração de cada diretório como função pura (município → URL e rótulo), com URLs literais; (b) contratos de ligação das páginas; (c) navegador em 390 e 1440 px.
2. **Red:** testes dos quatro diretórios, de `/cidades/` sem filtros, do painel do mapa e da busca textual de "Panorama".
3. **Green, em fatias:**
   - configuração por tipo de documento no `MunicipalityIndex`, sem os filtros, com a linha de links para os outros diretórios;
   - coleta seletiva, educação ambiental e compostagem passam a usar esse componente (saem as listas próprias de `DocumentRow`);
   - painel do mapa só com "Ficha" e "Diagnóstico · PDF";
   - "Panorama" → "Diagnóstico" nos textos visíveis.
4. **Eval e gates:** `npm run check:quality` e `npm run check:design`; navegador em 390 e 1440 px, sem rolagem horizontal de 320 a 1440.

## Cuidados (erros que já aconteceram neste projeto)

- **"Panorama e Censo dos Catadores" não é para renomear.** É outro documento. Nomes de arquivo, slugs, rotas e identificadores também ficam como estão.
- **Não esconda a saída do `git add`/`commit`** (`2>/dev/null`): num PR anterior (#7) o `add` falhou em silêncio e foi para a `main` um commit incompleto. Confira `git status` e `git show --stat HEAD` antes do push.
- **Não edite `*.generated.ts` nem remova URLs.** Os aliases legados e `resolveRoute` ficam.
- **Bonito:** o "plano" no banco é a minuta da lei. O aviso só diz isso, sem afirmar mais.
- O `gh` não está logado nesta máquina: o PR é aberto pelo link `compare` do GitHub, com o corpo no modelo da skill `mattpocock-skills:pr` (Summary, Evidence, Merge Danger).

## Pare e pergunte antes de

Instalar dependência; mudar texto público fora da lista da spec; apagar arquivo; remover ou mudar URL; uma métrica não melhorar depois de duas tentativas.

## Handoff (a preencher ao terminar)

- Alterações:
- Evidências (testes, medidas em 390 e 1440 px, contagens dos quatro diretórios):
- **Lista dos textos públicos alterados** (para o dono do projeto aprovar):
- Arquivos que ficaram sem uso:
- Limitações e riscos:
