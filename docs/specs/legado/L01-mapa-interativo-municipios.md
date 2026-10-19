# SPEC L01 — Mapa interativo dos 79 municípios

> Origem no legado: página "Panoramas da Gestão de Resíduos" (`/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/`), widget HTML do Elementor com Leaflet 1.9.4 + OpenStreetMap. É a "função de GPS" lembrada pelo dono do projeto. Levantamento em 2026-10-19.

## Intenção

Quem procura o panorama do seu município reconhece a cidade no mapa mais rápido do que numa lista de 79 nomes, principalmente em regiões que conhece mas cujo nome não lembra. O site antigo tinha esse mapa; o novo só tem a lista (`MunicipalityIndex`).

## O que existia (evidência)

- Mapa centrado em Mato Grosso do Sul (`setView([-20.44, -54.59], 7)`), com zoom por rolagem e toque desligados.
- 79 marcadores verdes com latitude e longitude fixas, um por município, e o nome sempre visível ao lado.
- Clique no marcador: balão com o nome, "Relatório de Gestão de Resíduos Sólidos" e "Abrir PDF", que abria o panorama numa janela modal (iframe) com "Visualizar" e "Fechar".
- Campo "Pesquisar cidade…" que centralizava no município; botão de modo escuro.
- Não usava a localização de quem acessa (não havia `navigator.geolocation`).
- Verificado: os 79 nomes casam com `panoramas.generated.ts`; as 79 coordenadas caem dentro de MS; só o PDF de Dourados difere do catálogo, que escolhe o arquivo mais recente.

## Escopo

- Inclui:
  - `scripts/generate-municipality-coordinates.mjs`: extrai as 79 coordenadas do widget no banco e grava `src/data/municipality-coordinates.generated.ts` (`slug → [lat, lng]`). Nada digitado à mão.
  - Componente `MunicipalityMap`, com visão de mapa no índice de municípios (`/cidades/`, `/diretorios/`, `/panoramas-da-gestao-de-residuos/`) por um seletor "Lista | Mapa". A lista continua como padrão e como alternativa acessível.
  - Marcador → painel com o nome e as mesmas ações da linha do índice: "Ficha", "Panorama · PDF" e, nos 15, "Plano de coleta seletiva".
  - A busca e o filtro "Com plano de coleta seletiva" do índice valem também para o mapa.
- Não inclui:
  - Modo escuro (o portal não tem tema escuro).
  - Visualizador de PDF em janela modal: o PDF abre em nova aba, como no resto do portal (CP-07).
  - Localização do usuário (GPS). Pode virar spec própria se o dono do projeto quiser "municípios perto de mim", o que exige pedir permissão de localização.

## Contrato de comportamento

### Dado
`/cidades/` em qualquer largura.

### Quando
A pessoa escolhe "Mapa" no seletor.

### Então
- O mapa mostra os 79 marcadores (ou só os 15, com o filtro ativo); a busca "bo" destaca Aparecida do Taboado, Bodoquena e Bonito.
- Clicar ou dar Enter num marcador abre o painel com o nome e as ações; Esc fecha e devolve o foco ao marcador.
- "Lista" volta ao índice atual, sem perder busca e filtro.

## Restrições e invariantes

- URLs e dados: nenhuma URL nova obrigatória; a escolha "Mapa" pode ir num parâmetro (`?visao=mapa`) sem mudar as rotas.
- Acessibilidade: marcadores alcançáveis por teclado, com nome acessível "<Município>: abrir opções"; o mapa não pode ser a única forma de chegar a um documento (a lista continua); zoom por rolagem desligado, como no antigo, para não prender a rolagem da página.
- Conteúdo que não pode ser inventado: coordenadas só do banco.
- Dependências: ver decisão 1.

## Decisões pendentes

1. **Como desenhar o mapa** (nível 4 do `AGENTS.md` se for dependência):
   - (a) Leaflet como dependência npm + tiles do OpenStreetMap. É o mesmo do site antigo, o mais rápido de fazer e tem zoom e arrasto. Exige autorizar a dependência e aceitar um serviço externo de tiles (política de uso do OSM; o IP de quem acessa vai para o servidor de tiles).
   - (b) Leaflet carregado de CDN, sem mudar o `package.json`. Mesmo resultado, mas o script vem de fora do bundle.
   - (c) Mapa SVG próprio de MS, sem tiles nem dependência. Exige uma fonte oficial de limites municipais (IBGE) e um gerador para converter em SVG. Fica 100% local e no estilo do portal, mas sem zoom de rua.
   - Recomendação: (c) se o objetivo é achar o município; (a) se o objetivo é ver a rua (útil só com pontos de entrega, ver L02).
2. **Onde fica o mapa:** só no índice de municípios, ou também na página inicial (pesa na altura da inicial, meta ≤ 4.800 px no celular).

## Critérios de aceite

- [ ] Coordenadas geradas do banco; contrato compara 79 slugs com o catálogo.
- [ ] Seletor Lista/Mapa nas três rotas do índice; busca e filtro compartilhados.
- [ ] Marcadores operáveis por teclado; painel com Esc; foco devolvido.
- [ ] PDFs e planos abrem em nova aba (HTTP 200 nos 79 PDFs).
- [ ] Sem rolagem horizontal em 320–1440; `check:quality` e `check:design` verdes.

## Plano de validação

- Teste automatizado: contrato das coordenadas (79, dentro de MS) e das ações do painel.
- Avaliação manual: E7/E8 em 390 e 1440 — teclado, leitor de tela (nomes dos marcadores), movimento reduzido.
- Gate local: `npm run check:quality`.
