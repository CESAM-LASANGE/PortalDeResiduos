# SPEC L00 — Base: documentos do Google Drive e links externos vindos do WordPress

> Pré-requisito das specs L04 a L12. Origem: `BD/u195698278_HZYqx.sql` (`wp_posts`). Levantamento em 2026-10-19.

## Intenção

O site antigo publicava ~45 documentos que o site novo não tem: a maioria são links do Google Drive, e alguns são artigos em revistas e repositórios. Hoje o `src/data/documents.ts` só aceita arquivos locais em `public/uploads`. Antes de trazer cada grupo de documentos, a fonte de dados precisa aceitar a origem "Google Drive" e "link externo", e esses documentos precisam vir do banco por um gerador, não digitados à mão (regra do `AGENTS.md`: dados derivados vêm de `scripts/`).

## Escopo

- Inclui:
  - `scripts/generate-legacy-documents.mjs`: lê `wp_posts` (páginas publicadas) e extrai cada link de documento, com página de origem, texto do link (rótulo publicado) e URL.
  - `src/data/legacy-documents.generated.ts`: saída do gerador, com `{ slugDaPagina, rotulo, url, origem: 'drive' | 'externo' }`.
  - `PortalDocument` (`documents.ts`) passa a aceitar `origin: 'local' | 'drive' | 'external'`; `DocumentRow` mostra "Google Drive" ou "Link externo" e a ação "Abrir no Drive" ou "Abrir link".
  - Gerador incluído em `npm run sync:data`; contrato que compara a saída com o banco.
- Não inclui: decidir onde cada documento aparece (isso é de cada spec L04–L12).

## Contrato de comportamento

### Dado
O dump do WordPress em `BD/`.

### Quando
`npm run sync:data` roda.

### Então
`legacy-documents.generated.ts` lista os links de documento de cada página publicada, com o rótulo exato do site antigo. Rodar duas vezes gera o mesmo arquivo.

## Restrições e invariantes

- URLs e dados que precisam ser preservados: a URL exata de cada documento, como está no banco.
- Acessibilidade: ação externa com "(abre em nova aba)" para leitor de tela, como no `DocumentRow` atual.
- Conteúdo que não pode ser inventado: título, tipo e descrição. Quando o rótulo antigo for genérico ("Baixe o artigo", "Cartilha"), a spec de cada grupo define o título a partir de texto já publicado, ou marca para aprovação.
- Arquivos que não devem ser alterados à mão: `*.generated.ts`.

## Decisões pendentes

1. **Links do Drive ainda abrem?** O banco é de 2025 e não verifiquei se os arquivos continuam públicos. Proposta: um script de verificação (`scripts/check-external-links.mjs`, fora do `check:quality` por depender de rede) que lista links com resposta diferente de 200.
2. **Tamanho e formato de arquivos do Drive** não são conhecidos sem baixar o arquivo. Proposta: não mostrar tamanho para Drive, como já acontece com os planos de coleta seletiva.

## Critérios de aceite

- [ ] Gerador determinístico, em `sync:data`, sem dependência nova.
- [ ] Contrato: o número de links por página na saída bate com o banco.
- [ ] `DocumentRow` mostra as três origens; contrato do componente atualizado.
- [ ] `npm run check:quality` verde.

## Plano de validação

- Teste automatizado: contrato do gerador e do `DocumentRow`.
- Avaliação manual: uma linha de cada origem em 390 e 1440.
- Gate local: `npm run check:quality`.
