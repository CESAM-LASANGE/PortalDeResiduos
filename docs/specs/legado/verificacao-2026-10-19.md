# Verificação dos links do legado (2026-10-19)

Saída de `node scripts/check-external-links.mjs` (Bloco A, L00) e comparação de uma cartilha. Usada para fechar as decisões pendentes das specs L04 a L12. Rodar de novo antes de publicar: links externos mudam.

## Resultado

124 links (os do WordPress e os 74 distintos dos planos de coleta seletiva): **120 respondem**, **2 quebrados**, **2 não verificados** (sem resposta da rede neste ambiente).

| Situação | Link | Onde no site antigo |
|---|---|---|
| Quebrado (404) | conquistesuavida.com.br/noticia/dia-do-planeta… | Como Separar (link no texto) |
| Quebrado (domínio inexistente) | www2.mma.gov.br/port/conama/legiabre.cfm?codlegi=636 | Lixão e Aterro (Resolução Conama) |
| Não verificado | repositorio.ufms.br/…CLAUDIA_GASPARETTO_MONOGRAFIA_TF.pdf | Publicações |
| Não verificado | repositorio.ufms.br/…Kamila Barbosa Nunes.pdf | Publicações |

O Sistema GRS (`sadgrs.streamlit.app`) responde 303 (redireciona para a autenticação do Streamlit), o que é o comportamento esperado.

## Nome real dos arquivos do Drive que mudam as specs

| Spec | Rótulo no site antigo | Nome real do arquivo | Consequência |
|---|---|---|---|
| L08 | Cadeia da Reciclagem e sua Tributação | Divulgação das ações de Educação Ambiental.pdf | **O rótulo estava certo; o nome do arquivo engana.** A primeira página é "Cadeia da Reciclagem e sua Tributação no Estado de Mato Grosso do Sul". É um material de divulgação (2.253 palavras, 7,9 MB), diferente do artigo local de 5 páginas com o mesmo tema. Entram os dois |
| L08 | Panorama da Educação Ambiental | DIAGNÓSTICO PROGRAMAS DE EDUCACAO AMBIENTAL.pdf | diagnóstico de 210 páginas do convênio |
| L10 | Guia do usuário (PDF) | Estudo estatístico para estimação de resíduos sólidos.pdf | **Rótulo errado.** O PDF do guia não está no acervo; o arquivo é o estudo de Apoio a Decisão |
| L10 | Parte 1 / Parte 2 / Parte 4 | Parte_1.mp4 / Parte_2.mp4 / **Parte_3.mp4** | o terceiro vídeo é a Parte 3; não falta vídeo |
| L05 | Cartilha | Cartilha_compostagem_final.pdf | **Outro documento:** 11 páginas, "Compostagem: gestão de resíduos orgânicos"; a cartilha local (10 páginas) é a do método Takakura. Entram as duas |
| L05 | Planilha de Dimensionamento de Usina de Compostagem | …xlsm | formato XLSM |
| L06 | Projeto Arquitetônico para Usina de Triagem de Resíduos de Campo Grande / Corumbá | Apresentação UTR de Campo Grande / Apresentação da UTR de Corumba | confere (apresentações dos projetos) |
| L07 | Taxa de Resíduos | Cartilha para implantação de taxa municipal de resíduos sólidos urbanos.pdf | cartilha de 44 páginas (setembro de 2024), diferente da nota técnica local sobre taxa de RSU |
| L07 | Levantamento Logística Reversa | Relatório Anual de Logística Reversa | relatório de 30 páginas (folhas de processo) |
| L07 | Mapeamento dos Agentes da Reciclagem | LEVANTAMENTO DOS AGENTES RECICLAGEM.pdf | relatório de 51 páginas do convênio |
| L09 | Relatório geral dos panoramas | Panorama de Gestão de Resíduos Sólidos no estado | confere |
| L12 | Naviraí, São Gabriel do Oeste, Bataguassu, Chapadão do Sul, Bonito | "<Município>_Gestão dos recursos orgânicos - Compostagem(_Usina).pdf" | **confirmado:** documentos municipais de compostagem |
| L04 | os 17 municípios | "PMEA <MUNICÍPIO>.pdf" | confirmado: Planos Municipais de Educação Ambiental |

## Achado nos planos de coleta seletiva (catálogo atual)

Em **Bonito**, o documento "Plano Municipal de Coleta Seletiva" (`primaryDocumentUrl`) é o arquivo **"Anexo I - Minuta da Lei de Coleta Seletiva Municipal.pdf"**. Nos outros 14 municípios, o plano é um arquivo "PCS_<município>_final…". O plano de Bonito não está no banco: o link "plano" de Bonito no site leva à minuta. Corrigir na fonte (WordPress ou equipe) e regenerar; não editar `selective-collection-plans.generated.ts`.
