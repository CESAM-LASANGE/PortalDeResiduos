import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'

const ler = (p) => fs.readFileSync(new URL(`../${p}`, import.meta.url), 'utf8')
const home = ler('src/components/HomePage.tsx')
const bloco = home.match(/const institutionalSlides: InstitutionalSlide\[\] = \[([\s\S]*?)\n\]/)[1]
const partes = [...bloco.matchAll(/text: "([^"]+)"/g)].map((m) => m[1])

test('inicial: o texto do programa em 5 partes, literal, na ordem do original', () => {
  assert.equal(partes.length, 5)
  const junto = partes.join(' ')
  const original = 'O Programa Resíduos Sólidos – Disposição Legal idealizado pelo Centro de Apoio Operacional das Promotorias de Justiça do Meio Ambiente, da Habitação e Urbanismo e do Patrimônio Histórico e Cultural (CAOMA) do Ministério Público de Mato Grosso do Sul (MPMS) teve início em 2015 com o diagnóstico dos principais aspectos relacionados à gestão e gerenciamento dos resíduos sólidos dos 79 municípios de Mato Grosso do Sul. Em 2015 e 2016, o Ministério Público de Mato Grosso do Sul (MPMS), Tribunal de Contas de Mato Grosso do Sul (TCE-MS), Secretaria de Estado de Meio Ambiente, Desenvolvimento, Ciência, Tecnologia e Inovação (SEMADESC-MS) e o Instituto de Meio Ambiente de Mato Grosso do Sul (IMASUL) iniciaram uma força-tarefa visando realizar inspeções, levantamentos e publicações sobre a destinação dos resíduos sólidos nos municípios do estado, com vistas à extinção dos lixões e a implementação da Lei nº 12.305/2010 que instituiu a Política Nacional de Resíduos Sólidos em MS. Esta força-tarefa gerou significativos frutos, com a redução em 8 anos, de 80% para 5% de municípios com disposição final inadequada, gerando fechamento de 75 lixões.'
  assert.equal(junto, original)
})

test('inicial: abertura centralizada, sem o título antigo à vista (o h1 fica só para leitores de tela)', () => {
  assert.match(home, /<h1 id="home-hero-title" className="sr-only">Informação para dar o destino certo\.<\/h1>/)
  assert.doesNotMatch(home, /home-hero-lead/)
  assert.doesNotMatch(home, /introSlide/)
  assert.match(home, /8000\)/, 'continua trocando sozinho, com pausa')
})

test('inicial: a barra de pesquisa fica centralizada, metade no verde e metade no bege', () => {
  assert.match(home, /<div className="home-hero-search-anchor">\s*<HomeHeroSearch/)
  const css = ler('src/styles/pages.css')
  assert.match(css, /\.home-hero-search-anchor \{[^}]*position: absolute[^}]*bottom: 0[^}]*translateY\(50%\)/)
  assert.doesNotMatch(css.match(/\.home-institutional-hero \{[^}]*\}/)[0], /overflow: hidden/, 'overflow cortaria a barra')
})
