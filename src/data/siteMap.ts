export type RouteKind =
  | 'home'
  | 'projects'
  | 'news'
  | 'contact'
  | 'cities'
  | 'publications'
  | 'valoriza'
  | 'directories'
  | 'article'
  | 'not-found'

export type SiteRoute = {
  path: string
  title: string
  kind: Exclude<RouteKind, 'not-found'>
  parent?: string
  status: 'foundation' | 'pending-content' | 'legacy'
  notes?: string
  /** Alias legado: a URL antiga troca para esta, sem recarregar (history.replaceState). */
  redirectTo?: string
}

const page = (path: string, title: string, kind: SiteRoute['kind'], options: Partial<Omit<SiteRoute, 'path' | 'title' | 'kind'>> = {}): SiteRoute => ({
  path,
  title,
  kind,
  ...options,
  status: options.status ?? 'pending-content',
})

export const siteRoutes: SiteRoute[] = [
  page('/', 'Home', 'home', { status: 'foundation' }),
  page('/home/', 'Home', 'home', { status: 'legacy', notes: 'Página inicial original do WordPress.' }),
  page("/sobre/", "Home", "home", { status: "legacy", notes: "URL legada redirecionada para a apresentação institucional da Home." }),
  page('/noticias/', 'Notícias', 'news', { status: 'foundation' }),
  page('/contact/', 'Contato', 'contact', { status: 'foundation' }),
  page('/cidades/', 'Panoramas', 'cities', { status: 'foundation' }),
  page('/publicacoes/', 'Documentos', 'publications', { status: 'foundation' }),
  page('/projeto-valoriza/', 'Projeto Valoriza', 'valoriza', { status: 'foundation' }),
  page('/diretorios/', 'Diretórios', 'directories', { status: 'legacy', redirectTo: '/cidades/', notes: 'Mesma lista dos 79 municípios de /cidades/ (ADR-001); a URL antiga leva para lá.' }),
  page('/producoes-do-convenio/', 'Produções do Convênio', 'projects', { status: 'foundation' }),
  page('/disposicao-legal/', 'Disposição Legal', 'projects'),
  page('/modelo-de-usinas-de-triagem-de-residuos/', 'Modelo de Usinas de Triagem de Resíduos', 'projects'),
  page('/cooperativas/', 'Cooperativas', 'projects'),
  page('/apoio-a-decisao/', 'Apoio a Decisão', 'projects'),
  page('/apoio-a-decisao/guia-do-usuario-do-grs/', 'Guia do usuário do GRS', 'projects', { parent: '/apoio-a-decisao/' }),
  page('/materiais-compilados/', 'Materiais Compilados', 'projects', { parent: '/producoes-do-convenio/' }),
  page('/panoramas-da-gestao-de-residuos/', 'Panoramas da Gestão de Resíduos', 'projects', { parent: '/materiais-compilados/' }),
  page('/plano-de-coleta-seletiva/', 'Plano de Coleta Seletiva', 'projects', { parent: '/materiais-compilados/' }),
  page('/plano-de-compostagem/', 'Plano de Compostagem', 'projects', { parent: '/materiais-compilados/' }),
  page('/municipios-contemplados/', 'Municípios Contemplados', 'projects', { parent: '/materiais-compilados/' }),
  page('/educacao-ambiental/', 'Educação Ambiental', 'projects', { parent: '/producoes-do-convenio/' }),
  page('/planos-de-educacao-ambiental/', 'Planos de Educação Ambiental', 'projects', { parent: '/educacao-ambiental/' }),
  page('/educacao-ambiental/planos-de-educacao-ambiental/', 'Planos de Educação Ambiental', 'projects', { parent: '/educacao-ambiental/' }),
  page('/panorama-e-censo-dos-catadores/', 'Panorama e Censo dos Catadores', 'projects', { parent: '/producoes-do-convenio/' }),
  page('/nota-tecnica/', 'Nota Técnica', 'projects'),
  page('/como-separar-corretamente-seu-lixo/', 'Como Separar Corretamente Seu Lixo', 'projects'),
  page('/diferenca-de-lixao-e-aterro-sanitario/', 'Diferença de Lixão e Aterro Sanitário', 'projects'),
  page('/producoes-do-convenio/materiais-compilados/panoramas-da-gestao-de-residuos/', 'Panoramas da Gestão de Resíduos', 'projects', { parent: '/producoes-do-convenio/materiais-compilados/' }),
  page('/producoes-do-convenio/materiais-compilados/educacao-ambiental/', 'Educação Ambiental', 'projects', { parent: '/producoes-do-convenio/materiais-compilados/' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/', 'Plano de Coleta Seletiva', 'projects', { parent: '/producoes-do-convenio/materiais-compilados/' }),
  page('/producoes-do-convenio/panorama-e-censo-dos-catadores/', 'Panorama e Censo dos Catadores', 'projects', { parent: '/producoes-do-convenio/' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-compostagem/', 'Plano de Compostagem', 'projects', { parent: '/producoes-do-convenio/materiais-compilados/' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/municipios-contemplados/', 'Municípios Contemplados', 'projects', { parent: '/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/', 'Municípios Contemplados', 'projects', { parent: '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/' }),
  // Caminhos aninhados do WordPress que não tinham rota (achado do Bloco B): levam à página equivalente.
  page('/producoes-do-convenio/materiais-compilados/', 'Materiais Compilados', 'projects', { status: 'legacy', redirectTo: '/materiais-compilados/' }),
  page('/producoes-do-convenio/materiais-compilados/municipios-contemplados/', 'Municípios Contemplados', 'projects', { status: 'legacy', redirectTo: '/producoes-do-convenio/materiais-compilados/plano-de-compostagem/municipios-contemplados/', notes: 'No WordPress, a página tinha os documentos municipais de compostagem (L12).' }),
  page('/producoes-do-convenio/educacao-ambiental/', 'Educação Ambiental', 'projects', { status: 'legacy', redirectTo: '/educacao-ambiental/' }),
  page('/producoes-do-convenio/educacao-ambiental/planos-de-educacao-ambiental/', 'Planos de Educação Ambiental', 'projects', { status: 'legacy', redirectTo: '/planos-de-educacao-ambiental/' }),
  // Planos de coleta seletiva por município no site antigo (L13): levam à ficha, que lista o plano.
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/alcinopolis/', 'Alcinópolis', 'cities', { status: 'legacy', redirectTo: '/cidades/alcinopolis/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/amambai/', 'Amambai', 'cities', { status: 'legacy', redirectTo: '/cidades/amambai/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/bataguassu/', 'Bataguassu', 'cities', { status: 'legacy', redirectTo: '/cidades/bataguassu/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/bonito/', 'Bonito', 'cities', { status: 'legacy', redirectTo: '/cidades/bonito/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/chapadao-do-sul/', 'Chapadão do Sul', 'cities', { status: 'legacy', redirectTo: '/cidades/chapadao-do-sul/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/costa-rica/', 'Costa Rica', 'cities', { status: 'legacy', redirectTo: '/cidades/costa-rica/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/coxim/', 'Coxim', 'cities', { status: 'legacy', redirectTo: '/cidades/coxim/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/gloria-de-dourados/', 'Glória de Dourados', 'cities', { status: 'legacy', redirectTo: '/cidades/gloria-de-dourados/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/japora/', 'Japorã', 'cities', { status: 'legacy', redirectTo: '/cidades/japora/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/miranda/', 'Miranda', 'cities', { status: 'legacy', redirectTo: '/cidades/miranda/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/mundo-novo/', 'Mundo Novo', 'cities', { status: 'legacy', redirectTo: '/cidades/mundo-novo/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/nova-alvorada-do-sul/', 'Nova Alvorada do Sul', 'cities', { status: 'legacy', redirectTo: '/cidades/nova-alvorada-do-sul/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/porto-murtinho/', 'Porto Murtinho', 'cities', { status: 'legacy', redirectTo: '/cidades/porto-murtinho/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/rio-brilhante/', 'Rio Brilhante', 'cities', { status: 'legacy', redirectTo: '/cidades/rio-brilhante/', notes: 'Página do plano no WordPress.' }),
  page('/producoes-do-convenio/materiais-compilados/plano-de-coleta-seletiva/sidrolandia/', 'Sidrolândia', 'cities', { status: 'legacy', redirectTo: '/cidades/sidrolandia/', notes: 'Página do plano no WordPress.' }),
  page('/documentos/', 'Documentos', 'publications', { status: 'legacy' }),
  page('/recicla-match/', 'Recicla Match', 'projects', { status: 'legacy', notes: 'Link encontrado no conteúdo, sem página publicada correspondente.' }),
  page('/logistica-reversa/', 'Logística Reversa', 'projects', { status: 'legacy', notes: 'Link encontrado no conteúdo, sem página publicada correspondente.' }),
  page('/booking/', 'Booking', 'projects', { status: 'legacy', notes: 'Página de demonstração/legado do WordPress.' }),
  page('/pagina-exemplo/', 'Página de exemplo', 'projects', { status: 'legacy', notes: 'Página padrão criada pelo WordPress.' }),
  page('/cidades/campo-grande/', 'Campo Grande', 'cities', { parent: '/cidades/' }),
  page('/cidades/dourados/', 'Dourados', 'cities', { parent: '/cidades/' }),
  page('/cidades/corumba/', 'Corumbá', 'cities', { parent: '/cidades/' }),
  page('/cidades/tres-lagoas/', 'Três Lagoas', 'cities', { parent: '/cidades/' }),
  page('/cidades/ponta-pora/', 'Ponta Porã', 'cities', { parent: '/cidades/' }),
  page('/corumba/', 'Corumbá', 'cities', { parent: '/cidades/', notes: 'URL legada usada por link interno antigo.' }),
  page('/cidades/bonito/', 'Bonito', 'cities', { parent: '/cidades/' }),
  page('/cidades/costa-rica/', 'Costa Rica', 'cities', { parent: '/cidades/' }),
  page('/cidades/miranda/', 'Miranda', 'cities', { parent: '/cidades/' }),
  page('/cidades/rio-brilhante/', 'Rio Brilhante', 'cities', { parent: '/cidades/' }),
  page('/cidades/bataguassu/', 'Bataguassu', 'cities', { parent: '/cidades/' }),
  page('/cidades/nova-alvorada-do-sul/', 'Nova Alvorada do Sul', 'cities', { parent: '/cidades/' }),
  page('/cidades/amambai/', 'Amambai', 'cities', { parent: '/cidades/' }),
  page('/cidades/mundo-novo/', 'Mundo Novo', 'cities', { parent: '/cidades/' }),
  page('/cidades/coxim/', 'Coxim', 'cities', { parent: '/cidades/' }),
  page('/cidades/porto-murtinho/', 'Porto Murtinho', 'cities', { parent: '/cidades/' }),
  page('/cidades/japora/', 'Japorã', 'cities', { parent: '/cidades/' }),
  page('/cidades/chapadao-do-sul/', 'Chapadão do Sul', 'cities', { parent: '/cidades/' }),
  page('/cidades/alcinopolis/', 'Alcinópolis', 'cities', { parent: '/cidades/' }),
  page('/cidades/gloria-de-dourados/', 'Glória de Dourados', 'cities', { parent: '/cidades/' }),
  page('/cidades/sidrolandia/', 'Sidrolândia', 'cities', { parent: '/cidades/' }),
]

export const newsSlugs = [
  'sistema-estadual-de-logistica-reversa-de-embalagens-em-ms-tem-2-956-empresas-regulares',
  'uems-publica-edital-para-elaboracao-de-planos-de-coleta-seletiva-e-educacao-ambiental',
  'promotor-de-justica-do-nucleo-ambiental-do-mpms-participa-do-lancamento-da-publicacao-da-obra-diretrizes-para-valoracao-de-danos-ambientais-no-cnmp',
  'em-5-anos-destinacao-adequada-de-residuos-solidos-aumentou-400-no-estado',
  'estado-de-ms-e-referencia-nacional-na-implantacao-de-logistica-reversa-de-embalagens-em-geral',
  'porque-devemos-separar-e-descartar-corretamente-nossos-residuos',
  'ms-tem-76-municipios-que-fazem-a-destinacao-adequada-de-residuos-solidos-urbanos-aponta-estudo-da-uniao',
  'ms-lidera-inovacao-regulatoria-em-residuos-solidos-com-o-primeiro-selo-de-sustentabilidade-do-brasil',
]

const normalizePath = (path: string) => {
  const cleanPath = path.split('?')[0].split('#')[0]
  if (cleanPath === '/') return '/'
  return `/${cleanPath.replace(/^\/+|\/+$/g, '')}/`
}

export const resolveRoute = (path: string): SiteRoute | null => {
  const normalized = normalizePath(path)
  const exact = siteRoutes.find((route) => normalizePath(route.path) === normalized)
  if (exact) return exact

  if (normalized.startsWith('/noticias/')) {
    const slug = normalized.split('/')[2]
    if (newsSlugs.includes(slug)) {
      return page(normalized, 'Notícia', 'article', { status: 'pending-content', parent: '/noticias/' })
    }
    return null
  }

  if (normalized.startsWith('/2025/') || normalized.startsWith('/2021/')) {
    return page(normalized, 'Notícia', 'article', { status: 'legacy', parent: '/noticias/' })
  }

  if (normalized.startsWith('/cidades/')) {
    return page(normalized, 'Município', 'cities', { status: 'pending-content', parent: '/cidades/' })
  }

  return null
}

export const routeLabel = (path: string) => resolveRoute(path)?.title ?? 'Página não encontrada'
