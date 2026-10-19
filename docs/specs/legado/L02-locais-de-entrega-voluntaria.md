# SPEC L02 — Locais de entrega voluntária nas fichas de município

> Origem no legado: fichas `/cidades/campo-grande/`, `/cidades/dourados/`, `/cidades/corumba/`, `/cidades/ponta-pora/` e `/cidades/tres-lagoas/` (template `cidades.php`), bloco "Locais de entrega voluntária:". Levantamento em 2026-10-19.

## Intenção

Morador e gestor querem saber onde entregar recicláveis, pilhas, pneus, galhos e entulho. O site antigo tinha essa informação em cinco fichas; o site novo não tem.

## O que existia (evidência)

| Município | Conteúdo no banco |
|---|---|
| Campo Grande | mapa do Google My Maps incorporado: `https://www.google.com/maps/d/embed?mid=10d04hhnk92iLxujjfK0q2_IxMpRh70o&ehbc=2E312F` |
| Dourados | lista sem endereço nem coordenada: "PEV'S" — Ecoponto de galhos 1, 2 e 3; Ecoponto de Resíduos Recicláveis; Ecoponto de Pneus; PEV Resíduos de Construção Civil. "Projeto PapaPilha" — PAP001 a PAP040 (só os códigos) |
| Corumbá, Ponta Porã | "Cidade não possui locais de entrega voluntária" |
| Três Lagoas | a palavra "Locais", sem lista (conteúdo incompleto na origem) |

Cada uma das cinco fichas abria com uma imagem de localização do município no estado (`/uploads/2021/11/<cidade>.png`, também em `-300x300`).

## Escopo

- Inclui:
  - Dado gerado do banco (`scripts/generate-legacy-city-data.mjs` → `src/data/legacy-city-data.generated.ts`), compartilhado com a L03.
  - Bloco "Locais de entrega voluntária" na ficha dos 5 municípios, com o que a fonte tem:
    - Campo Grande: link "Ver locais no mapa" para o My Maps (ver decisão 1);
    - Dourados: as duas listas, como texto;
    - Corumbá e Ponta Porã: "Cidade não possui locais de entrega voluntária", com a data da informação;
    - Três Lagoas: `Alert` "Em migração" (RC-6), sem preencher a lacuna.
- Não inclui:
  - Endereço ou coordenada dos pontos de Dourados (não existem na fonte).
  - Pontos dos outros 74 municípios.

## Contrato de comportamento

### Dado
A ficha de um dos 5 municípios.

### Quando
A página carrega.

### Então
O bloco mostra o que a fonte tem e de quando é a informação. As outras 74 fichas não mostram o bloco.

## Restrições e invariantes

- Conteúdo que não pode ser inventado: endereços, horários e coordenadas. Os dados são de 2018–2019, então a ficha deve dizer de quando são, para ninguém ir a um ecoponto que não existe mais.
- Acessibilidade: mapa incorporado sempre com alternativa em link; `iframe` com `title`.
- URLs: nenhuma nova.

## Decisões pendentes

1. **Campo Grande:** (a) incorporar o My Maps (carrega Google e cookies de terceiros e pesa na página); (b) só um link "Ver locais no mapa (Google Maps)". Recomendação: (b).
2. **Atualidade:** a equipe confirma se os pontos ainda existem? Se não confirmar, o bloco leva "Informação publicada em 2021 no portal anterior".
3. **Imagens de localização:** usar como figura da ficha (é o assunto da página, RC-4) nos 5 municípios? Os outros 74 ficariam sem figura, criando duas aparências de ficha.

## Critérios de aceite

- [ ] Dado gerado do banco; contrato confere os 5 municípios e as 46 entradas de Dourados.
- [ ] Bloco só nas 5 fichas; Três Lagoas com "Em migração".
- [ ] Data da informação visível.
- [ ] `check:quality` verde; E7/E8 em 390 e 1440.

## Plano de validação

- Teste automatizado: contrato do gerador e da presença do bloco.
- Avaliação manual: as 5 fichas e uma ficha sem dado.
- Gate local: `npm run check:quality`.
