# SPEC L04 — Os 17 Planos de Educação Ambiental

> Origem no legado: `/producoes-do-convenio/educacao-ambiental/planos-de-educacao-ambiental/`, um link do Google Drive por município. Depende da L00. Levantamento em 2026-10-19.

## Intenção

O convênio produziu um Plano de Educação Ambiental para cada um de 17 municípios. Hoje a página "Planos de Educação Ambiental" do site novo mostra um passo a passo genérico ("Conhecer, Priorizar, Mobilizar, Acompanhar") e nenhum plano, então o produto do convênio está inacessível.

## O que existia (evidência)

17 links, com o nome do município como rótulo (ID do arquivo no Drive):

| Município | ID | Município | ID |
|---|---|---|---|
| Alcinópolis | 1gikQE8-2rbytBgV8lrXLb36f9-IKgasW | Japorã | 1jWHEUiejvJ9tan4AOkdSX9i24Gdkcd6K |
| Amambai | 1zRHlLh_7E-uVlDGvOiwOR-ecx7D9k6qx | Miranda | 1IpIU_jjWj0OZh_x4Y8OWs2QOUm1qLVxS |
| Bataguassu | 1DTDoUon5AteZM8FhBTWxjlKXo6hTKuZJ | Mundo Novo | 1JXcYsJQRCp4a68gNsGtacUQheYie-JHM |
| Bonito | 1I1E_X5piwXUwD9r-4J6X-3sFFH-5v5fZ | Naviraí | 1prXXx5JO4J73-KrbvcigjFX1Octbrm4i |
| Chapadão do Sul | 1mND-k18Y-vmf8qot8w4qRYiPBRkKZjIf | Nova Alvorada do Sul | 15zhRst6mw2u-8_p4iY1zsgLEBXWiK15E |
| Corumbá | 1Ex5UCUfVrQXO9M7UXTt-_MQW8L3TOzIv | Porto Murtinho | 1drWHNtNnsmH1RMMNCIJ6y7Ebk4m_OUti |
| Costa Rica | 1B91En5g_y9kLNUfRA1Va3BQGM9ZxcxeU | Rio Brilhante | 1-1k_sdbDaNo4w3hLOCgTclCez-WvWJO3 |
| Coxim | 1MwVYEXTDKEQ_XGMzeeFYqqwrInLo4Jeb | Sidrolândia | 1CP1wWO1iW_qkd8j2tZP0Cg_dQweZ1kmt |
| Glória de Dourados | 1cEj8j-DEy2f0Ye0Gn3z2COL93cmc308g | | |

São os 15 municípios com plano de coleta seletiva, mais Corumbá e Naviraí.

## Escopo

- Inclui:
  - Dados pela L00, com município (slug do catálogo) e URL.
  - Página "Planos de Educação Ambiental": lista dos 17 com `DocumentRow` ("Plano de educação ambiental", "Google Drive", "Abrir no Drive").
  - Ficha de cada um dos 17 municípios: linha "Plano de Educação Ambiental" na lista de documentos (D3.2).
  - Índice de municípios: o selo/ação no padrão da D3.10 e um filtro "Com plano de educação ambiental (17)".
  - Busca global: os 17 planos como "Documento" (NAV-6).
- Não inclui: conteúdo dos planos (fica no Drive).

## Contrato de comportamento

### Dado
`/planos-de-educacao-ambiental/` ou `/educacao-ambiental/planos-de-educacao-ambiental/`.

### Quando
A página carrega.

### Então
Lista os 17 planos em ordem alfabética, e cada um abre o Drive em nova aba. A ficha de Corumbá mostra o plano de educação ambiental; a de Água Clara, não.

## Restrições e invariantes

- URLs: as duas rotas existentes continuam; nenhuma nova.
- Conteúdo que não pode ser inventado: título "Plano de Educação Ambiental — <Município>" (é o nome da página antiga mais o rótulo do link); nada de data ou autoria.
- NAV-1: plano a ≤ 2 cliques (Municípios › linha, ou Produções › Educação ambiental › …; medir no E10).

## Decisões pendentes

1. **O passo a passo genérico** ("Conhecer, Priorizar, Mobilizar, Acompanhar") da página nova não existe no site antigo; parece texto criado na migração. Manter, ou trocar pela lista dos planos?
2. **Altura do índice no celular:** uma ação a mais por linha agrava a ADR-007. Proposta: a ação fica só na ficha e no filtro, não na linha.

## Critérios de aceite

- [ ] 17 planos gerados do banco; contrato confere municípios e URLs.
- [ ] Página, fichas e busca usam a mesma fonte.
- [ ] Filtro com contagem calculada.
- [ ] E10: profundidade dos 17 planos registrada.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato dos 17.
- Avaliação manual: página, ficha de Corumbá e de Água Clara, busca "educação ambiental bonito".
- Gate local: `npm run check:quality`.
