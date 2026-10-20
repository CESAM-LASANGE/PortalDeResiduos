# Novas funcionalidades e pendências (depois da migração do site antigo)

Levantamento de 2026-10-19, depois dos blocos A a D da migração (specs `docs/specs/legado/`, L00–L13, já implementadas). Cada spec segue `docs/development/spec-template.md`. **Nada aqui foi implementado.**

| Spec | O que traz | Depende de | Prioridade sugerida |
|---|---|---|---|
| [N01](N01-municipios-perto-de-voce.md) | Município perto de você, por localização opcional | L01 (mapa) | média |
| [N02](N02-mapa-na-pagina-inicial.md) | Entrada para o mapa na página inicial, dentro da meta de altura | L01 | média |
| [N03](N03-conteudos-que-dependem-da-equipe.md) | O que a equipe precisa entregar (plano de Bonito, guia em PDF, fontes, pontos de entrega) | — | alta, bloqueia dados corretos |

## Decisões que precisam do dono do projeto

- **N01:** como achar o município (ponto no contorno, recomendado, ou marcador mais próximo) e onde fica o botão.
- **N02:** forma da entrada (miniatura, botão ou só no desktop) e o que sai da inicial.
- **N03:** quem responde cada item da equipe e se os links antigos quebrados ganham equivalentes.
