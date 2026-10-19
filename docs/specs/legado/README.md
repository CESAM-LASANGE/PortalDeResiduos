# Funcionalidades do site antigo que faltam no site novo

Levantamento de 2026-10-19 a partir de `BD/u195698278_HZYqx.sql` (WordPress: 48 páginas, 10 posts, 2 menus, 14 modelos do Elementor, 4 formulários). Cada spec segue `docs/development/spec-template.md` e tem a evidência no banco, o escopo, as decisões pendentes e os critérios de aceite. **Nada aqui foi implementado.** Depois do review, cada spec aprovada vira uma tarefa em `tasks/active/`.

## Specs

| Spec | O que traz de volta | Itens | Depende de | Prioridade sugerida |
|---|---|---|---|---|
| [L00](L00-base-documentos-do-legado.md) | Base: documentos do Drive e links externos gerados do banco | — | — | pré-requisito |
| [L01](L01-mapa-interativo-municipios.md) | Mapa interativo dos municípios (a "função de GPS") | 79 marcadores | — | alta |
| [L13](L13-urls-antigas-dos-planos-por-municipio.md) | URLs antigas dos planos por município (hoje dão erro) | 15 URLs | — | alta (regra do `AGENTS.md`) |
| [L04](L04-planos-de-educacao-ambiental.md) | Planos de Educação Ambiental | 17 | L00 | alta |
| [L10](L10-guia-do-usuario-do-grs.md) | Guia do usuário do GRS (PDF e vídeos) | 1 + 3 | L00 | alta |
| [L11](L11-artigos-e-titulos-das-publicacoes.md) | Artigos externos e títulos originais das publicações | 6 + 5 títulos | L00 | média |
| [L05](L05-kit-de-compostagem.md) | Kit de compostagem | 4 | L00 | média |
| [L12](L12-planos-de-compostagem-municipais.md) | Municípios contemplados da compostagem | 5 | L00, L05 | média (bloqueada pela confirmação) |
| [L06](L06-projetos-de-usinas-de-triagem.md) | Projetos arquitetônicos das usinas de triagem | 2 | L00 | média |
| [L07](L07-estudos-do-convenio.md) | Estudos: Taxa de Resíduos, Logística Reversa, Agentes da Reciclagem | 3 | L00 | média |
| [L08](L08-documentos-de-educacao-ambiental.md) | Panorama da Educação Ambiental; Cadeia da Reciclagem | 2 | L00 | média |
| [L09](L09-relatorio-geral-dos-panoramas.md) | Relatório geral dos panoramas | 1 | L00 | média |
| [L02](L02-locais-de-entrega-voluntaria.md) | Locais de entrega voluntária (5 fichas) | 5 municípios | — | baixa (dados de 2018–2021) |
| [L03](L03-indicadores-de-coleta-seletiva.md) | Indicadores de coleta seletiva de 2018 e 2019 (5 fichas) | 5 × 2 anos | L02 (gerador) | baixa (fonte primária desconhecida) |

## Decisões que precisam do dono do projeto antes de implementar

- **L00:** verificar se os ~45 links do Drive ainda são públicos.
- **L01:** como desenhar o mapa (Leaflet por npm, Leaflet por CDN ou SVG próprio) e se ele entra na inicial.
- **L02 e L03:** confirmar se os dados de 2018–2021 ainda valem e qual é a fonte primária dos números.
- **L04:** manter ou trocar o passo a passo genérico da página de planos.
- **L05, L07, L08:** possíveis duplicatas de documentos que já estão no site (cartilha, taxa de RSU, cadeia da reciclagem). Abrir os arquivos antes.
- **L10:** o arquivo `1kDYgs…` aparece como "Guia do usuário" e como "Embalagens: Produção a Consumo"; a Parte 3 dos vídeos não existe na fonte.
- **L11:** aceitar os títulos originais dos 5 documentos atuais.
- **L12:** confirmar o que são os 5 documentos (bloqueante).
- **L13:** mostrar a ficha nas URLs antigas ou redirecionar.

## O que não precisa voltar

- **Formulários do tema** ("aux-cleaning-book-form", "aux-cleaning-contact-form") e **newsletter do Mailchimp:** restos do modelo "cleaning service" do tema Phlox. O contato real já está no site novo (D3.7).
- **Curtidas (WP ULike) e comentários:** só 1 comentário no banco; não há uso real.
- **Rascunhos:** "Teste de notícia" (2), "Produtos" (vazio) e a política de privacidade padrão do WordPress, nunca publicada.
- **Modelos do Elementor "testimonial" e "booking":** conteúdo de demonstração do tema.
- **Modo escuro e visualizador de PDF em janela modal do mapa antigo:** o portal não tem tema escuro, e o PDF abre em nova aba em todo o site (CP-07).
