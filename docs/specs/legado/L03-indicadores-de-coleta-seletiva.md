# SPEC L03 — Indicadores de coleta seletiva de 2018 e 2019 nas fichas

> Origem no legado: mesmas 5 fichas da L02, bloco "Informações sobre coleta seletiva" e "Produção de Lixo Diária". Levantamento em 2026-10-19.

## Intenção

Gestores e o MPMS comparam o desempenho da coleta seletiva entre municípios. O site antigo mostrava números de 2018 e 2019 em cinco fichas; o site novo não mostra nenhum.

## O que existia (evidência)

Para cada ano, 2018 e 2019:
- quantidade recolhida (t);
- população com coleta seletiva porta a porta;
- materiais recuperados (t): total, papelão, plásticos, metais, vidros, outros;
- produção de lixo diária (t).

Exemplo, Campo Grande 2019: 7.119,5 t recolhidas; 491.528 pessoas atendidas; 1.492,4 t recuperadas; produção diária de 1.279,74 t.

Lacunas e inconsistências na origem:
- Dourados 2018 tem total recuperado (420 t), mas papelão, plásticos, metais, vidros e outros estão em branco.
- Ponta Porã não tem unidade "(T)" na produção diária.
- Corumbá aparece com o título "Cidade" no lugar do nome.

## Escopo

- Inclui:
  - Dado gerado do banco (o mesmo gerador da L02), com campos numéricos tipados; célula vazia na origem fica vazia (`null`), nunca 0.
  - Bloco "Coleta seletiva" na ficha dos 5 municípios: tabela com 2018 e 2019 nas colunas e os indicadores nas linhas; números em mono tabular (DS-05); fonte e ano visíveis.
- Não inclui:
  - Dados de outros anos ou municípios.
  - Gráficos (podem vir depois, com a skill de visualização).
  - Rankings ou comparações entre municípios (só 5 têm dado).

## Contrato de comportamento

### Dado
A ficha de Campo Grande.

### Quando
A página carrega.

### Então
A tabela mostra os 9 indicadores × 2 anos com os valores do banco e a linha "Fonte: portal anterior (dados de 2018 e 2019)". Em Dourados 2018, os materiais em branco aparecem como "—", com nota de dado não informado.

## Restrições e invariantes

- Conteúdo que não pode ser inventado: nenhum número, total ou percentual calculado que a fonte não tenha (RC-3).
- Acessibilidade: `<table>` com `<caption>`, `<th scope>` e unidades no cabeçalho; no celular, a tabela rola dentro do próprio contêiner, sem rolagem da página.

## Decisões pendentes

1. **Fonte primária:** os números vieram de onde? (SNIS? levantamento do convênio?) Sem isso, a fonte citada é "portal anterior", o que é fraco pela RC-3. Pedir à equipe.
2. **Publicar dado de 2018–2019 em 2026?** Pode induzir a erro se houver dado mais recente. Opção: publicar como série histórica, com o título "Coleta seletiva em 2018 e 2019".

## Critérios de aceite

- [ ] Gerador com 5 municípios × 2 anos; contrato confere todos os valores contra o texto do banco.
- [ ] Vazio na origem vira "—", não 0.
- [ ] Tabela acessível; sem rolagem da página em 390.
- [ ] `check:quality` verde.

## Plano de validação

- Teste automatizado: contrato valor a valor.
- Avaliação manual: as 5 fichas, em 390 e 1440, com leitor de tela na tabela.
- Gate local: `npm run check:quality`.
