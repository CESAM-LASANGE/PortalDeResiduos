# SPEC L11 — Artigos externos e títulos originais das publicações

> Origem no legado: `/publicacoes/` ("Conteúdo Técnico e Científico — Artigos, estudos e monografias sobre gestão de resíduos sólidos em Mato Grosso do Sul"). Depende da L00. Levantamento em 2026-10-19.

## Intenção

A página antiga de Publicações tinha 10 itens com títulos completos. O site novo tem 5 deles, com títulos genéricos, e não tem os outros 6, que são artigos em revistas, monografia e dissertação. Pesquisadores e estudantes (público do portal) procuram pelo título do trabalho.

## O que existia (evidência)

**6 itens que faltam** (todos com o rótulo "Baixe o artigo"):

| Título publicado | Destino |
|---|---|
| Análise gravimétrica dos resíduos sólidos urbanos do município de Dourados, MS | interacoes.ucdb.br/multitemas/article/view/3608/2704 |
| Análise das Ações de Educação Ambiental em Resíduos Sólidos no Estado de Mato Grosso do Sul | periodicos.newsciencepubl.com/ans/article/view/1607 |
| Implementação de taxa municipal de resíduos sólidos urbanos | periodicos.newsciencepubl.com/ans/article/view/1758/2224 |
| Panorama da gestão dos resíduos sólidos de Dourados – MS CONTECC | Drive `1p_ejNGEZugr105f9k33ZqIg2ugcAzkg2` |
| Monografia da Claudia Aquino Gasparetto, FAENG/UFMS | repositorio.ufms.br/…/CLAUDIA_GASPARETTO_MONOGRAFIA_TF.pdf |
| Dissertação de mestrado da Kamila Barbosa Nunes do Programa de Pós-Graduação em Direito da UFMS | repositorio.ufms.br/…/VERSÃO FINAL 28062022 Dissertação UFMS - Kamila Barbosa Nunes.pdf |

**5 itens que já estão no site novo, com título trocado na migração:**

| Arquivo | Título no site novo | Título no site antigo |
|---|---|---|
| Revista-IBRAPARC.pdf | Revista IBRAPARC | Revista IBRAPARC — "A Auditoria Climática da Reciclagem inclusiva" (na descrição) |
| artigo_Cadeia-de-Reciclagem.pdf | Cadeia de Reciclagem | Cadeia da Reciclagem e sua Tributação no Estado de Mato Grosso do Sul |
| artigo2-1.pdf | Artigo sobre resíduos sólidos | Extinção dos lixões no Mato Grosso do Sul: atuação do ministério público na mitigação das mudanças climáticas – um estudo de caso |
| Nota-tecnica-Taxa-RSU-FINAL-1.pdf | Nota técnica sobre taxa de RSU | Proposta de metodologia para cobrança da taxa dos serviços públicos de coleta, tratamento e disposição final de resíduos sólidos domiciliares nos municípios sul-mato-grossenses |
| Artigo-RSDL-1.pdf | Resíduos sólidos e destinação legal | Projeto resíduos sólidos: disposição legal – a atuação articulada do ministério público estadual, tribunal de contas e o instituto do meio ambiente na busca pela extinção dos lixões em mato grosso do sul |

O site antigo também tinha descrições longas para a Revista IBRAPARC e para o artigo da Cadeia da Reciclagem.

## Escopo

- Inclui:
  - Os 6 em Documentos (tipos "Artigo", "Monografia", "Dissertação" ou "Estudo"; ver decisão 2), com origem "Link externo" ou "Google Drive", e na busca.
  - Os 5 títulos e as 2 descrições originais em `documents.ts`.
- Não inclui: autores, ano e periódico de cada artigo além do que está no título publicado.

## Contrato de comportamento

### Dado
Documentos, filtro "Artigos e revista".

### Quando
A pessoa busca "gravimétrica".

### Então
Aparece "Análise gravimétrica dos resíduos sólidos urbanos do município de Dourados, MS", e "Abrir link" abre a revista em nova aba.

## Restrições e invariantes

- Conteúdo que não pode ser inventado: autoria e ano. Só o título como foi publicado.
- Texto alterado: os 5 títulos (aprovar). Títulos longos precisam caber na linha do documento no celular.

## Decisões pendentes

1. **Títulos originais ou atuais?** Recomendação: originais, porque são os títulos reais dos trabalhos e melhoram a busca.
2. **Tipos novos** "Monografia" e "Dissertação", ou tudo como "Artigo"?
3. **Links externos** sujeitos a sair do ar; entram no script de verificação da L00.

## Critérios de aceite

- [ ] 6 itens pela L00; 5 títulos corrigidos em `documents.ts`.
- [ ] Documentos (contagens), busca e página na mesma fonte.
- [ ] Linha com título longo sem rolagem horizontal em 320.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato dos 11 títulos.
- Avaliação manual: Documentos em 320, 390 e 1440; busca por termos dos títulos.
- Gate local: `npm run check:quality`.
