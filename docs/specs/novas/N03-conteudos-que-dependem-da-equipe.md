# SPEC N03 — Conteúdos que dependem da equipe do projeto

> Origem: achados dos blocos A a D, em `docs/specs/legado/verificacao-2026-10-19.md`. Não é implementação de código: lista o que a equipe precisa entregar e o que muda no site quando entregar. Levantamento em 2026-10-19.

## Intenção

Cinco lacunas de conteúdo foram encontradas na fonte e deixadas visíveis em vez de preenchidas. Cada uma precisa de uma resposta ou de um arquivo da equipe, e o site já está pronto para recebê-los sem mudar código.

## O que existe (evidência)

| # | Lacuna | Evidência | Como aparece hoje |
|---|---|---|---|
| 1 | **Plano de Bonito** | No banco, "BONITO - MS" e "ANEXO I - MINUTA DE LEI DA COLETA SELETIVA MUNICIPAL" apontam para o mesmo arquivo do Drive (`1b8YjtO…`), que é a minuta; nos outros 14 municípios o plano é "PCS_<município>_final" | A ficha de Bonito tem "Plano Municipal de Coleta Seletiva" levando à minuta |
| 2 | **Guia do GRS em PDF** | O arquivo publicado como "Guia do usuário (PDF)" é o "Estudo estatístico para estimação de resíduos sólidos" | Alert "Guia em PDF não encontrado"; os 3 vídeos estão na página |
| 3 | **Fonte dos números de 2018 e 2019** | O banco traz os valores sem fonte (SNIS? levantamento do convênio?) | "Fonte: portal anterior" |
| 4 | **Atualidade dos pontos de entrega** | Dados de 2021; Dourados sem endereço; Três Lagoas sem lista | "Informação publicada em 2021 no portal anterior"; "Em migração" |
| 5 | **Coordenada de Novo Horizonte do Sul** | No site antigo cai dentro de Nova Andradina | O mapa usa o centro do contorno do IBGE |

Também registrado, sem ação no site novo: 2 links quebrados em textos de artigos do site antigo (`conquistesuavida.com.br`, 404; `www2.mma.gov.br`, domínio inexistente), que as páginas novas não repetem; 2 links dos repositórios da UFMS não puderam ser verificados pela rede.

## Escopo

- Inclui: o pedido objetivo à equipe para cada lacuna e o efeito no site quando chegar.
- Não inclui: preencher qualquer lacuna com suposição; editar `*.generated.ts` à mão.

## O que a equipe entrega e o que muda

1. **Bonito:** o PDF do plano (ou confirmar que não existe) e a correção no WordPress. Depois de `npm run sync:data`, a ficha mostra o plano; o teste de Bonito passa a conferir um arquivo diferente da minuta.
2. **Guia do GRS:** o PDF do guia. Entra como `DocumentRow` em Apoio a Decisão e no guia, e o Alert sai.
3. **Fonte dos números:** o nome da fonte e do período. Troca "portal anterior" na tabela das 5 fichas por "Fonte: <nome>" (texto público: aprovar).
4. **Pontos de entrega:** confirmar quais existem hoje e, se houver, endereços. Sem confirmação, o aviso de 2021 permanece; com endereços, vira spec própria (lista e mapa de pontos).
5. **Coordenada de Novo Horizonte do Sul:** a coordenada correta, para corrigir no WordPress; o gerador a usa sozinho.

## Contrato de comportamento

### Dado
Uma entrega da equipe (arquivo ou resposta), registrada em `docs/development/decision-log.md`.

### Quando
`npm run sync:data` roda, ou o texto público é aprovado e trocado.

### Então
A lacuna correspondente some da tabela acima e o teste que a documenta passa a conferir o dado novo.

## Restrições e invariantes

- Conteúdo que não pode ser inventado: nada é preenchido sem a entrega da equipe.
- Dados gerados: corrigir na origem e regenerar.
- URLs: nenhuma removida.

## Decisões pendentes

1. **Quem na equipe responde** a cada item e em qual prazo.
2. **Links quebrados antigos:** adicionar referências equivalentes às páginas "Como separar" e "Diferença de lixão e aterro" (conteúdo novo, a aprovar) ou manter como estão. Recomendação: manter.

## Critérios de aceite

- [ ] Cada item tem responsável e resposta registrada no `decision-log`.
- [ ] Cada entrega vira uma tarefa pequena com teste literal do dado novo.
- [ ] `check:quality` verde em cada tarefa.

## Plano de validação

- Teste automatizado: contrato do dado entregue em cada tarefa.
- Avaliação manual: a página afetada em 390 e 1440 px.
- Gate local: `npm run check:quality`.
