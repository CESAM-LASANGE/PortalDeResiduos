# SPEC N01 — Município perto de você (localização opcional)

> Origem: ideia deixada em aberto pela L01. O site antigo **não** usava a localização de quem acessava (`navigator.geolocation` não aparece no widget do mapa), então isto é função nova, não migração. Levantamento em 2026-10-19.

## Intenção

Quem abre o portal pelo celular, em campo, quer o panorama do município onde está sem digitar o nome. Hoje precisa achar na lista de 79 ou no mapa.

## O que já existe (evidência)

- 79 posições de município em `municipality-map.generated.ts` (`lat`, `lng`; 77 do banco do site antigo e 2 no centro do contorno do IBGE).
- Contornos em SVG já projetados, no mesmo arquivo; a projeção usa só a longitude e a latitude mínimas e máximas da malha, então é reproduzível.
- Mapa e lista compartilham busca e filtro no `MunicipalityIndex`.

## Escopo

- Inclui:
  - Botão "Usar minha localização" no índice de municípios (lista e mapa).
  - Ao permitir: mensagem "Você está em <Município>" com "Ficha" e "Panorama · PDF", e, no mapa, o município marcado e o painel aberto.
  - Se a pessoa estiver fora de MS: "Sua localização está fora de Mato Grosso do Sul", sem escolher um município.
  - Se negar ou falhar: mensagem simples e a lista continua como está.
- Não inclui:
  - Guardar, enviar ou registrar a localização. Tudo roda no navegador.
  - Busca por endereço ou CEP.
  - "Pontos de entrega perto de mim" (os dados não têm endereço; ver L02).

## Contrato de comportamento

### Dado
`/cidades/` em qualquer largura, em conexão segura.

### Quando
A pessoa aciona "Usar minha localização" e permite o acesso.

### Então
- O município que contém o ponto é identificado; a mensagem tem o nome e as ações da linha do índice.
- Com o mapa aberto, o painel do município abre e o foco vai para o título do painel.
- Nada é gravado: nem na URL, nem em `localStorage`, nem em requisição.

## Restrições e invariantes

- Privacidade: a localização não sai do navegador; o texto do botão diz isso.
- Acessibilidade: botão nativo; resultado em região `aria-live="polite"`; erro com texto, sem depender de cor.
- Conteúdo que não pode ser inventado: nenhum município é "o mais próximo" se o ponto cair fora de MS.
- Dependências: nenhuma; só `navigator.geolocation`.

## Decisões pendentes

1. **Como achar o município:** (a) distância até o marcador mais próximo, simples, mas erra perto de divisas, porque marcador não é o centro do município; (b) ponto dentro do contorno, correto, mas pede os contornos em latitude e longitude no dado gerado (hoje só em caminho SVG projetado). Recomendação: (b), reutilizando a projeção do gerador do mapa, e não (a).
2. **Onde fica o botão:** só no índice de municípios, ou também na página inicial (ver N02).
3. **Acurácia:** aceitar a posição aproximada (Wi-Fi) ou exigir GPS? Recomendação: aproximada, porque o município é uma área grande.

## Critérios de aceite

- [ ] Contrato da função pura "ponto → município" com pontos literais: dentro de Bonito, dentro de Campo Grande, em Rochedo (centro do IBGE) e fora de MS (por exemplo, São Paulo).
- [ ] Permitir, negar e falhar têm mensagem própria; a lista continua usável nos três.
- [ ] Nenhuma gravação nem requisição com a posição.
- [ ] `check:quality` e `check:design` verdes; E7/E8 em 390 e 1440.

## Plano de validação

- Teste automatizado: função pura de ponto no polígono contra pontos literais.
- Avaliação manual: Playwright com `geolocation` e permissões simuladas (permitida, negada, fora de MS); teclado e leitor de tela na mensagem.
- Gate local: `npm run check:quality`.
