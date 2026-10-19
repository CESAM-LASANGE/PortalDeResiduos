// Este arquivo é gerado por scripts/generate-municipality-map.mjs (L01).
// Fonte: BD/ibge/ (malha municipal do IBGE) + mapa do site antigo em BD/u195698278_HZYqx.sql. Não editar à mão.

export type MunicipalityShape = {
  slug: string
  name: string
  lat: number
  lng: number
  /** "banco": coordenada do mapa do site antigo; "ibge": centro do contorno, porque a do banco cai fora do município. */
  posicao: 'banco' | 'ibge'
  /** Posição do marcador no viewBox. */
  x: number
  y: number
  /** Contorno do município em caminho SVG. */
  d: string
}

export const mapViewBox = '0 0 1000 1018'

export const municipalityShapes: MunicipalityShape[] = [
  {
    "slug": "agua-clara",
    "name": "Água Clara",
    "lat": -20.4458,
    "lng": -52.8789,
    "posicao": "banco",
    "x": 724.6,
    "y": 483.5,
    "d": "M651 388l5 6l3 8l5 1l9 16l11 9l4 11l6 5l2 5l-1 5l4 9l13 9l10 11l4 2l4 9l3 3l8 5l3 6l6 4l3 4l7 5l12 13l6 4l16 9l1 -12l-7 -10l-7 -18l-4 -4l-2 -5l-3 -2l-5 -9l-7 -6l-1 -3l-7 -6l-7 -11l-1 -5l4 -8l-3 -6l0 -8l4 -3l-3 -8l-1 -16l-2 -4l-5 -2l9 -9l9 -1l4 -2l3 -6l1 -8l5 -8l10 -4l-5 -8l-2 -10l-5 -5l-2 -5l-6 1l-4 10l-8 9l-7 -4l-13 2l-6 -6l-11 -5l-4 -5l-11 -1l1 6l-7 -1l-25 6l-2 -7l-6 9l-3 1l-10 10l1 5l-2 9l3 2l1 4l5 8z"
  },
  {
    "slug": "alcinopolis",
    "name": "Alcinópolis",
    "lat": -18.3258,
    "lng": -53.7047,
    "posicao": "banco",
    "x": 613.3,
    "y": 178.2,
    "d": "M654 130l-4 -1l-5 7l-16 -3l-4 -5l-5 0l-5 4l-6 -1l-5 0l-11 -10l-6 -3l-7 1l-11 6l-2 3l-4 13l-4 5l-13 -2l4 3l4 7l1 14l1 4l-1 7l6 4l0 8l2 5l0 10l5 -2l8 6l7 -3l12 -10l8 4l3 -4l7 -1l9 1l8 -3l11 -5l5 0l4 -3l-2 -4l2 -4l-4 -7l3 -3l7 -2l5 2l3 -2l-6 -5l2 -2l6 2l13 -11l-3 -11l0 -7l-7 -1l-12 2l-3 -3z"
  },
  {
    "slug": "amambai",
    "name": "Amambai",
    "lat": -23.1058,
    "lng": -55.2253,
    "posicao": "banco",
    "x": 408.4,
    "y": 866.5,
    "d": "M380 864l10 19l3 6l12 6l11 8l2 3l1 4l8 9l9 4l7 6l6 4l8 -3l7 0l-5 -11l-4 -4l5 -7l0 -5l4 -8l5 -2l9 0l5 3l4 -5l-3 -9l4 -7l6 -1l9 -6l7 -10l-7 -7l-1 -4l-7 0l-6 -7l-5 -1l-3 -4l-7 0l-4 0l-6 -2l-5 2l-8 1l-2 4l-7 3l-3 -5l-5 2l-5 -1l-11 4l-17 2l-2 4l-6 1l-5 4l-6 3l-2 7z"
  },
  {
    "slug": "anastacio",
    "name": "Anastácio",
    "lat": -20.4833,
    "lng": -55.8,
    "posicao": "banco",
    "x": 330.9,
    "y": 488.9,
    "d": "M292 530l7 0l4 5l9 3l7 -2l6 -8l0 -3l14 4l3 5l-1 4l5 9l0 4l7 5l7 7l9 -1l4 5l9 4l8 -3l7 1l-5 -7l-6 -14l-4 -8l-4 -2l-2 -6l-8 -6l0 -5l-4 -3l-4 -11l1 -13l-1 -1l-2 1l-6 -5l-15 1l-6 -1l-5 -3l-36 -6l-10 1l4 3l2 7l-1 7l2 8l-3 2l0 8l3 7l5 7z"
  },
  {
    "slug": "anaurilandia",
    "name": "Anaurilândia",
    "lat": -22.1858,
    "lng": -52.7169,
    "posicao": "banco",
    "x": 746.4,
    "y": 734,
    "d": "M688 704l5 5l1 9l0 10l4 10l4 8l1 5l3 5l4 12l5 7l13 -4l7 -9l14 -9l6 -2l9 -7l13 -5l5 -5l6 -6l2 -4l3 -7l-1 -5l-10 0l-6 -4l-15 -13l-3 -12l-32 7l-12 -3l-10 0l-5 -3l-11 20z"
  },
  {
    "slug": "angelica",
    "name": "Angélica",
    "lat": -22.1528,
    "lng": -53.7708,
    "posicao": "banco",
    "x": 604.4,
    "y": 729.3,
    "d": "M574 730l2 -1l7 2l4 5l9 1l7 4l13 0l10 -6l3 0l-1 -6l-9 -6l-3 -10l-9 -8l-6 -9l-14 -6l-2 3l-8 1l-7 -2l-10 3l-3 4l4 6l1 14l12 6l0 5z"
  },
  {
    "slug": "antonio-joao",
    "name": "Antônio João",
    "lat": -22.1928,
    "lng": -55.9517,
    "posicao": "banco",
    "x": 310.5,
    "y": 735.1,
    "d": "M257 733l4 5l9 4l5 5l11 1l9 -1l8 3l10 -2l12 1l5 12l5 2l3 -6l-2 -3l2 -6l5 -5l0 -3l3 -7l5 -7l-5 0l-3 -2l-7 1l-5 4l-5 -1l-5 1l-9 -8l-4 0l-6 -5l-5 8l-6 1l-14 -2l0 9l-13 -1l-1 3l-6 -1z"
  },
  {
    "slug": "aparecida-do-taboado",
    "name": "Aparecida do Taboado",
    "lat": -20.0872,
    "lng": -51.0939,
    "posicao": "banco",
    "x": 965.2,
    "y": 431.9,
    "d": "M973 389l-4 3l-8 1l-5 7l-5 -2l-5 2l-5 -3l-7 1l-8 4l-6 7l-6 4l-11 1l-11 3l-5 4l-2 5l8 8l9 13l8 7l7 3l5 4l7 4l3 6l6 -4l18 -4l7 -3l5 -5l7 -17l3 -5l0 -1l-3 -6l2 -7l-2 -6l3 -7l-3 -5l0 -10l-2 -2z"
  },
  {
    "slug": "aquidauana",
    "name": "Aquidauana",
    "lat": -20.4708,
    "lng": -55.7869,
    "posicao": "banco",
    "x": 332.7,
    "y": 487.1,
    "d": "M290 480l36 6l5 3l6 1l15 -1l6 5l2 -1l4 -1l7 -7l2 1l5 -2l1 -8l-2 -9l1 -3l-9 -4l-1 -6l5 -13l9 -1l3 5l7 -3l14 10l7 -8l7 -4l7 2l3 -7l-4 -9l-1 -4l-5 -5l-8 1l-3 -2l-7 3l-7 -3l2 -4l-3 -4l-1 -6l-5 -4l-2 -7l6 -6l3 -10l3 -3l2 -9l3 -3l3 -10l2 -3l3 -12l6 -2l7 -4l1 -5l-5 1l-4 -3l-5 -6l-6 -4l-7 0l-2 -2l-14 3l-6 -6l3 -32l6 -60l-17 52l-19 17l-5 5l-5 10l-3 4l-4 9l-4 5l0 6l-2 3l-7 6l-8 10l-3 0l0 -27l-82 0l-5 34l-32 14l-2 2l-7 -1l-10 1l0 6l5 4l8 -1l3 5l2 0l5 8l5 3l4 -2l5 0l3 -2l6 3l3 6l7 -2l12 0l5 5l6 3l8 8l3 0l5 7l4 2l1 7l0 9l5 10l-3 4l2 7l-1 6l5 5l4 1l8 7l0 6z"
  },
  {
    "slug": "aral-moreira",
    "name": "Aral Moreira",
    "lat": -22.9386,
    "lng": -55.6336,
    "posicao": "banco",
    "x": 353.3,
    "y": 842.4,
    "d": "M356 807l-1 9l-4 5l-2 9l2 5l2 15l0 5l3 3l2 10l8 6l2 6l-2 6l3 0l3 -6l0 -5l2 -5l6 -6l2 -7l6 -3l5 -4l6 -1l2 -4l17 -2l11 -4l-5 -3l-3 4l-4 -5l-10 -6l-10 -15l-6 -5l-14 -1l-7 4l-2 5l-4 -2l-8 -8z"
  },
  {
    "slug": "bandeirantes",
    "name": "Bandeirantes",
    "lat": -19.9167,
    "lng": -54.3667,
    "posicao": "banco",
    "x": 524.1,
    "y": 407.3,
    "d": "M475 387l11 0l2 15l7 -2l12 0l5 3l0 8l1 5l7 3l-2 5l6 -1l10 0l5 3l4 0l6 3l0 2l9 3l2 2l6 -7l10 -3l4 -7l7 -2l-3 -10l-6 -8l-3 -20l-1 -5l-3 -7l-6 0l-5 4l-4 -1l-6 -4l-5 -2l-10 1l-10 -3l-5 -1l-5 -6l-5 -2l-11 -1l-5 5l-5 -1l-7 5l-6 0l-4 6l4 11l-1 9z"
  },
  {
    "slug": "bataguassu",
    "name": "Bataguassu",
    "lat": -21.7158,
    "lng": -52.4228,
    "posicao": "banco",
    "x": 786.1,
    "y": 666.4,
    "d": "M699 684l5 3l10 0l12 3l32 -7l3 12l15 13l6 4l10 0l1 5l-3 7l7 -10l3 -11l6 -8l4 -2l8 -8l3 -11l-2 -10l-3 -4l-8 -6l-4 2l-3 -2l-11 6l-13 3l-8 3l-11 -1l-8 5l-6 -2l-11 -8l-9 -2l-7 1l-8 -5l-4 -2l-2 2l0 8l-6 17l2 5z"
  },
  {
    "slug": "bataypora",
    "name": "Batayporã",
    "lat": -22.295,
    "lng": -53.2708,
    "posicao": "banco",
    "x": 671.8,
    "y": 749.8,
    "d": "M660 755l3 4l0 14l3 6l1 6l3 5l1 16l-2 6l-6 1l1 4l12 -4l7 -2l8 -10l3 -4l0 -4l4 -7l8 -4l2 -4l7 -3l-5 -7l-4 -12l-3 -5l-1 -5l-4 -8l-4 -10l0 -10l-1 -9l-5 -5l-28 51z"
  },
  {
    "slug": "bela-vista",
    "name": "Bela Vista",
    "lat": -22.1089,
    "lng": -56.5219,
    "posicao": "banco",
    "x": 233.6,
    "y": 723,
    "d": "M292 692l-3 -3l-5 -1l-1 -8l-7 -4l-6 0l-4 -14l-11 -9l-10 2l-8 -1l-4 -3l-2 -12l-12 5l-4 4l-6 -6l-8 1l-6 2l1 2l1 11l5 3l-6 14l2 5l-6 8l-4 8l-1 10l2 6l-9 3l-2 2l-12 4l2 6l-4 2l0 7l-2 5l8 -2l1 3l5 2l8 -1l1 4l5 4l6 -3l8 -6l3 2l5 -5l4 5l13 -9l4 -6l1 -6l6 -4l11 0l3 9l3 5l6 1l1 -3l13 1l0 -9l14 2l6 -1l5 -8l-4 -3l2 -7l-2 -3l-6 -11z"
  },
  {
    "slug": "bodoquena",
    "name": "Bodoquena",
    "lat": -20.5389,
    "lng": -56.7169,
    "posicao": "banco",
    "x": 207.3,
    "y": 496.9,
    "d": "M251 489l-1 -6l-1 -8l2 -7l-9 -4l-2 3l-10 4l-3 0l-15 0l-3 7l-6 -1l-4 2l-7 -8l1 -13l-7 -2l-10 -10l-7 1l5 4l-1 8l3 4l0 4l-8 1l3 11l6 0l3 7l-1 4l3 6l4 7l1 8l-3 7l2 6l1 5l3 4l-4 10l2 4l22 0l2 -6l10 -7l-1 -5l5 -4l0 -3l6 -6l5 -2l-1 -5l10 -3l3 -6l2 -11z"
  },
  {
    "slug": "bonito",
    "name": "Bonito",
    "lat": -21.1261,
    "lng": -56.4836,
    "posicao": "banco",
    "x": 238.8,
    "y": 581.5,
    "d": "M277 604l-1 -6l-3 -3l5 -3l-3 -3l-2 -10l2 -4l5 -1l-5 -11l8 -7l-4 -7l7 -6l3 -6l-3 -4l6 -3l-5 -7l-3 -7l0 -8l-9 4l-2 2l-7 -3l0 -3l-10 -11l-5 -8l-2 11l-3 6l-10 3l1 5l-5 2l-6 6l0 3l-5 4l1 5l-10 7l-2 6l-22 0l-3 6l3 8l-1 9l3 4l-2 6l4 5l5 11l1 9l-3 5l1 4l-2 7l4 7l18 -3l6 2l9 -2l6 2l11 -2l6 -2l8 0l2 -5l8 -6l1 -7l4 -1z"
  },
  {
    "slug": "brasilandia",
    "name": "Brasilândia",
    "lat": -21.2553,
    "lng": -52.0369,
    "posicao": "banco",
    "x": 838.1,
    "y": 600.1,
    "d": "M691 519l12 6l3 7l-1 5l4 6l5 2l4 5l9 6l20 17l4 5l9 7l4 6l3 2l1 5l5 6l5 10l4 3l9 5l5 7l9 4l8 5l0 3l7 3l1 3l8 -2l4 -8l2 -1l8 2l5 -4l5 -5l4 -11l5 -6l1 -10l-4 -10l-1 -2l-7 0l-7 -6l0 -2l-6 -6l-9 -7l-7 -4l-9 -6l-4 2l-8 -4l-7 -10l-16 -9l-6 -4l-12 -13l-7 -5l-3 -4l-6 -4l-3 -6l-8 -5l-11 11l-12 5l-7 0l-6 4l-6 2z"
  },
  {
    "slug": "caarapo",
    "name": "Caarapó",
    "lat": -22.6339,
    "lng": -54.8219,
    "posicao": "banco",
    "x": 462.7,
    "y": 798.6,
    "d": "M444 760l-3 11l-6 9l-3 0l-3 5l-3 1l-1 5l-3 4l0 5l7 4l4 1l6 3l5 9l5 2l15 14l6 2l4 0l-1 -6l0 -10l4 -8l8 -4l-4 -3l-2 -8l7 3l7 0l8 -4l11 2l-2 -5l0 -11l-5 -9l-3 -5l-6 -2l-12 3l-8 3l-13 -6l-9 -3l-10 -2z"
  },
  {
    "slug": "camapua",
    "name": "Camapuã",
    "lat": -19.5319,
    "lng": -54.0439,
    "posicao": "banco",
    "x": 567.6,
    "y": 351.9,
    "d": "M515 355l5 6l5 1l10 3l10 -1l5 2l6 4l4 1l5 -4l6 0l3 7l1 5l11 -3l6 -24l5 3l4 4l2 5l9 9l9 4l1 4l5 5l20 4l4 -2l-5 -8l-1 -4l-3 -2l2 -9l-1 -5l-3 -3l-3 -11l-4 -5l-3 -14l-3 -4l-3 -11l3 -11l8 1l10 0l6 -4l0 -6l4 -5l7 -4l-8 -7l3 -9l-15 -13l0 6l-10 5l-4 6l-8 2l-4 3l-6 -2l-8 3l-6 -2l-8 2l-9 -1l-2 2l-2 8l-5 4l-4 0l-6 -5l-3 -7l-9 1l-8 6l4 8l1 7l0 12l-3 -1l-6 7l-5 4l0 12l-7 1l-4 8l-4 1l-1 11z"
  },
  {
    "slug": "campo-grande",
    "name": "Campo Grande",
    "lat": -20.4686,
    "lng": -54.6222,
    "posicao": "banco",
    "x": 489.6,
    "y": 486.8,
    "d": "M463 526l7 -7l6 3l3 8l-1 4l1 7l4 6l6 3l3 0l5 6l6 2l2 4l6 3l7 4l4 9l12 6l4 9l0 4l8 9l1 6l11 9l1 4l9 6l5 6l5 3l15 4l4 -1l12 4l9 -4l4 4l3 -1l2 -4l-1 -10l-4 -1l3 -8l0 -7l-3 -4l-1 -7l-5 -9l0 -7l-6 -5l-1 -5l-3 -4l-6 -1l-6 -5l-1 -7l-8 -5l-7 0l-5 -5l-3 -10l-5 -2l-4 -6l-9 -4l-2 -6l-3 -3l-1 -5l4 -11l-3 -8l1 -11l-2 2l-8 3l-11 -4l-6 -6l-8 -5l-6 0l-1 -9l-2 -7l-12 -5l-6 0l-2 -3l-6 -3l-8 -2l-2 -3l-10 0l-1 4l-7 1l-1 4l5 5l9 2l0 2l8 4l0 23l-5 4l0 7l4 8l-4 7l-6 3l3 8z"
  },
  {
    "slug": "caracol",
    "name": "Caracol",
    "lat": -22.0139,
    "lng": -57.0258,
    "posicao": "banco",
    "x": 165.7,
    "y": 709.3,
    "d": "M162 741l2 -5l0 -7l4 -2l-2 -6l12 -4l2 -2l9 -3l-2 -6l1 -10l4 -8l6 -8l-2 -5l6 -14l-5 -3l-1 -11l-1 -2l-4 -1l-13 4l-3 7l-8 -2l-4 4l-6 2l-10 13l1 5l-5 7l0 7l-4 2l-4 6l-7 -2l-5 5l-5 1l-5 8l-2 6l-3 2l-2 7l-6 6l4 3l5 -1l8 3l2 3l6 2l4 -3l8 4l3 -3l16 3l6 -2z"
  },
  {
    "slug": "cassilandia",
    "name": "Cassilândia",
    "lat": -19.1139,
    "lng": -51.7319,
    "posicao": "banco",
    "x": 879.2,
    "y": 291.7,
    "d": "M885 292l-5 -1l-12 -8l-5 0l-6 -8l-7 -2l-9 -1l-4 -4l-5 0l-3 -3l-1 -4l-5 -1l-5 -7l-16 -1l-5 -2l-2 -3l-7 -9l-10 7l2 7l-4 6l2 12l-5 -1l-2 -6l-8 7l2 9l7 5l-2 24l7 5l1 7l6 4l7 0l8 4l9 0l6 1l2 -4l7 1l3 3l6 -7l-1 -3l-10 0l-5 -7l-3 -3l8 -5l8 4l2 4l4 -1l5 -7l6 -1l6 3l9 1l8 2l8 -3l3 4l10 2l2 2l7 1l4 -10l2 -9l-7 -2l-2 2l-7 -1l-4 -3z"
  },
  {
    "slug": "chapadao-do-sul",
    "name": "Chapadão do Sul",
    "lat": -18.7889,
    "lng": -52.6258,
    "posicao": "banco",
    "x": 758.7,
    "y": 244.9,
    "d": "M702 246l9 0l3 -2l8 0l3 16l6 5l0 5l-6 15l-8 6l-5 0l1 5l3 1l1 6l5 8l7 -1l12 4l4 0l6 5l0 4l8 3l6 7l0 2l2 5l5 5l2 10l3 -3l4 -11l-1 -9l4 -8l-6 -4l-1 -7l-7 -5l2 -24l-7 -5l-2 -9l8 -7l2 6l5 1l-2 -12l4 -6l-2 -7l10 -7l-5 -7l-8 -2l-4 -3l-4 1l-3 3l-6 1l-8 -2l-8 2l-8 -4l-5 0l-4 -3l-5 0l-1 -4l-10 7l-3 1l-4 7l0 11z"
  },
  {
    "slug": "corguinho",
    "name": "Corguinho",
    "lat": -19.8319,
    "lng": -54.8289,
    "posicao": "banco",
    "x": 461.8,
    "y": 395.1,
    "d": "M433 442l2 -5l4 0l4 -4l4 -4l1 -4l5 -9l2 -8l4 -2l2 -9l2 -1l5 -6l7 -3l1 -9l-4 -11l4 -6l-3 -14l-7 -6l-2 4l0 7l-4 17l-7 0l-1 4l-4 2l-4 -1l-9 2l-2 -5l1 -7l-7 2l-8 -2l-4 -3l-9 -11l-3 10l-3 3l-2 9l-3 3l-3 10l-6 6l2 7l5 4l1 6l3 4l-2 4l7 3l7 -3l3 2l8 -1l5 5l1 4l4 9l-3 7l6 0z"
  },
  {
    "slug": "coronel-sapucaia",
    "name": "Coronel Sapucaia",
    "lat": -23.2722,
    "lng": -55.5278,
    "posicao": "banco",
    "x": 367.6,
    "y": 890.5,
    "d": "M366 886l-2 11l7 9l-2 4l-6 11l6 1l12 -4l2 4l16 3l3 8l9 -24l7 -3l-2 -3l-11 -8l-12 -6l-3 -6l-10 -19l-6 6l-2 5l0 5l-3 6l-3 0z"
  },
  {
    "slug": "corumba",
    "name": "Corumbá",
    "lat": -19.0089,
    "lng": -57.6528,
    "posicao": "banco",
    "x": 81.2,
    "y": 276.6,
    "d": "M170 365l10 -1l7 1l2 -2l32 -14l5 -34l82 0l0 27l3 0l8 -10l7 -6l2 -3l0 -6l4 -5l4 -9l3 -4l5 -10l5 -5l19 -17l17 -52l12 -48l23 -86l-15 -8l-2 -4l-5 -4l-4 1l-10 -5l-4 0l-6 -5l-5 1l-10 -10l1 -5l-3 -2l-6 -1l-1 -3l-8 2l-6 -4l-17 -6l-10 -5l-7 -2l0 -6l-4 -3l-11 1l-8 2l-4 5l-5 -1l-11 10l-4 -1l-3 3l-9 3l-6 -5l-7 5l-17 1l-1 -2l-6 -1l-4 2l-4 9l-6 0l1 5l-3 9l-4 7l-5 0l-8 7l1 6l-3 5l-6 5l-2 6l-4 0l-3 6l-17 1l-5 5l-7 0l-5 3l-10 3l-5 6l-3 -6l-4 1l-2 -4l-11 -6l-2 -9l-8 -3l2 -7l-3 -5l-3 -12l-4 -1l-1 4l-5 0l1 10l4 9l5 4l-1 7l5 5l-5 3l16 30l4 13l9 10l7 5l-14 1l-28 95l6 0l0 11l3 5l-2 3l-9 0l-30 65l-17 40l36 30l-5 10l-4 -3l-5 1l-2 4l-6 1l-4 7l-5 0l-3 5l-5 1l3 8l-5 4l3 5l3 -3l4 5l-1 6l4 9l6 2l4 8l-3 8l3 9l-2 5l5 5l-2 6l5 2l5 -4l5 6l0 5l-8 0l-3 7l9 -1l4 5l-1 4l-8 6l6 2l3 6l4 -2l-1 -6l3 -4l-1 -5l4 -4l7 -1l1 -6l3 -4l6 0l3 -3l1 -6l5 -5l8 -1l13 -9l-5 -2l2 -11l1 0l5 -8l1 -8l12 -7l-1 -3l4 -3l0 -9l5 -4l3 4l6 5l3 -1l7 6l6 -1l5 2l4 -1l7 -8l-5 -4l2 -9l-2 -3l0 -8l-4 -5l-5 0l10 -57zM106 279l1 4l-6 10l0 13l-22 -7l-1 -4l2 -7l3 -1l1 -7l2 -5l9 3l11 1z"
  },
  {
    "slug": "costa-rica",
    "name": "Costa Rica",
    "lat": -18.5439,
    "lng": -53.1289,
    "posicao": "banco",
    "x": 690.9,
    "y": 209.6,
    "d": "M699 136l-14 1l-9 -5l0 7l3 11l-13 11l-6 -2l-2 2l6 5l-3 2l-5 -2l-7 2l-3 3l4 7l-2 4l2 4l-4 3l-5 0l-11 5l9 12l2 0l4 9l0 5l5 2l8 8l-1 8l5 5l-20 9l0 2l15 13l8 -7l4 0l6 6l6 3l5 -2l3 -6l5 -3l6 -10l2 -2l0 -11l4 -7l3 -1l10 -7l-4 -6l-2 -5l6 -4l5 -7l1 -5l5 -1l5 -1l6 -7l-3 -5l-6 -3l-7 1l-8 -3l-4 0l-7 4l-1 4l-6 -2l-4 -4l-2 -13l-2 -9l-2 -11l3 -3l6 -1l1 -3z"
  },
  {
    "slug": "coxim",
    "name": "Coxim",
    "lat": -18.5069,
    "lng": -54.7589,
    "posicao": "banco",
    "x": 471.2,
    "y": 204.3,
    "d": "M397 167l4 1l6 -4l3 2l7 -1l7 2l2 4l7 2l-2 4l6 4l3 7l8 6l6 2l5 -3l13 9l-2 2l6 12l14 6l1 6l5 6l6 2l12 0l7 -3l6 -11l4 -9l6 2l13 0l3 -7l10 -2l0 -10l-2 -5l0 -8l-6 -4l1 -7l-1 -4l-1 -14l-4 -7l-4 -3l-5 1l-8 6l-5 -1l-7 2l-6 -1l-9 8l-6 2l-5 6l-2 -2l0 -6l-2 -2l-6 1l-6 -9l3 -17l0 -6l-1 -7l-7 4l-2 4l-12 5l-5 -1l-7 -7l-2 -5l-6 -5l-5 2l-6 -3l-8 -11l0 -6l-3 -2l2 -13l-23 86z"
  },
  {
    "slug": "deodapolis",
    "name": "Deodápolis",
    "lat": -22.2758,
    "lng": -54.1658,
    "posicao": "banco",
    "x": 551.2,
    "y": 747,
    "d": "M536 749l22 9l3 -3l11 -24l2 -1l0 -5l-12 -6l-1 -14l-4 -6l-9 -3l-6 5l4 8l-5 10l2 8l-7 6l1 2l-4 6l5 3l-2 5z"
  },
  {
    "slug": "dois-irmaos-do-buriti",
    "name": "Dois Irmãos do Buriti",
    "lat": -20.7333,
    "lng": -55.3,
    "posicao": "banco",
    "x": 398.3,
    "y": 524.9,
    "d": "M405 566l6 2l1 -20l5 -5l1 -8l-3 -10l-4 -2l-2 -5l3 -11l-1 -3l-9 -17l0 -3l-7 -6l-6 5l-3 -5l5 -3l0 -6l5 -3l10 -1l-4 -4l1 -6l3 -3l-14 -10l-7 3l-3 -5l-9 1l-5 13l1 6l9 4l-1 3l2 9l-1 8l-5 2l-2 -1l-7 7l-4 1l1 1l-1 13l4 11l4 3l0 5l8 6l2 6l4 2l4 8l6 14l5 7l6 -6l2 3z"
  },
  {
    "slug": "douradina",
    "name": "Douradina",
    "lat": -22.04,
    "lng": -54.6158,
    "posicao": "banco",
    "x": 490.5,
    "y": 713,
    "d": "M481 717l1 4l7 0l6 5l5 -6l0 -5l4 -5l2 -12l-4 -3l-6 1l-7 0l0 3l-8 18z"
  },
  {
    "slug": "dourados",
    "name": "Dourados",
    "lat": -22.2208,
    "lng": -54.8058,
    "posicao": "banco",
    "x": 464.9,
    "y": 739.1,
    "d": "M444 760l10 2l9 3l13 6l8 -3l12 -3l-9 -7l10 -8l5 3l2 5l15 -5l6 -9l8 -3l4 -6l-1 -2l7 -6l-2 -8l5 -10l-4 -8l-6 -3l-11 2l-9 -7l-6 -1l-4 6l-2 12l-4 5l0 5l-5 6l-6 -5l-7 0l-1 -4l-3 4l-5 3l-4 3l-13 9l-7 -1l-7 -6l-6 -1l-3 -6l-7 3l1 -7l-2 -6l0 -4l5 -4l6 -2l1 -11l-3 2l-9 1l-8 2l-4 -1l-5 2l-8 -3l-8 -2l-2 -2l-7 2l-3 6l-12 7l3 7l2 13l6 4l7 -1l1 4l4 5l8 -2l6 5l6 2l8 -2l9 5l10 12l3 2l3 1z"
  },
  {
    "slug": "eldorado",
    "name": "Eldorado",
    "lat": -23.7869,
    "lng": -54.2839,
    "posicao": "banco",
    "x": 535.2,
    "y": 964.6,
    "d": "M521 968l16 7l3 5l6 4l7 1l5 -4l4 -5l0 -9l1 -6l4 -6l0 -5l-2 -7l-6 0l-11 -5l-3 -4l-9 -1l-7 -2l-8 22l2 2l-6 10l4 3z"
  },
  {
    "slug": "fatima-do-sul",
    "name": "Fátima do Sul",
    "lat": -22.3789,
    "lng": -54.5131,
    "posicao": "banco",
    "x": 504.4,
    "y": 761.8,
    "d": "M496 765l6 2l3 5l5 -13l5 -1l15 6l6 -15l2 -5l-5 -3l-8 3l-6 9l-15 5l-2 -5l-5 -3l-10 8l9 7z"
  },
  {
    "slug": "figueirao",
    "name": "Figueirão",
    "lat": -18.6789,
    "lng": -53.6389,
    "posicao": "banco",
    "x": 622.2,
    "y": 229.1,
    "d": "M548 279l9 -1l3 7l6 5l4 0l5 -4l2 -8l2 -2l9 1l8 -2l6 2l8 -3l6 2l4 -3l8 -2l4 -6l10 -5l0 -6l0 -2l20 -9l-5 -5l1 -8l-8 -8l-5 -2l0 -5l-4 -9l-2 0l-9 -12l-8 3l-9 -1l-7 1l-3 4l-8 -4l-12 10l-7 3l-8 -6l-5 2l-10 2l-3 7l-13 0l-6 -2l-4 9l-6 11l8 2l4 3l5 7l1 6l6 8l3 20z"
  },
  {
    "slug": "gloria-de-dourados",
    "name": "Glória de Dourados",
    "lat": -22.4136,
    "lng": -54.2333,
    "posicao": "banco",
    "x": 542.1,
    "y": 766.8,
    "d": "M527 771l31 13l1 4l11 -2l-4 -10l-6 -5l-2 -9l0 -4l-22 -9l-6 15l-3 7z"
  },
  {
    "slug": "guia-lopes-da-laguna",
    "name": "Guia Lopes da Laguna",
    "lat": -21.4583,
    "lng": -56.1139,
    "posicao": "banco",
    "x": 288.6,
    "y": 629.3,
    "d": "M273 605l4 9l-2 4l2 8l7 1l4 5l2 10l-4 5l1 7l10 12l5 3l4 7l0 4l5 1l7 -1l-6 0l1 -10l-3 -8l7 -4l7 2l3 -1l3 -7l7 1l-8 -12l2 -4l-5 -4l-6 -5l-5 -2l-2 -4l-4 -1l-7 -6l-5 -2l-9 1l-10 -6l-1 -4l-4 1z"
  },
  {
    "slug": "iguatemi",
    "name": "Iguatemi",
    "lat": -23.6739,
    "lng": -54.5619,
    "posicao": "banco",
    "x": 497.8,
    "y": 948.3,
    "d": "M486 955l10 2l14 2l2 5l5 1l6 -10l-2 -2l8 -22l7 2l3 -5l0 -4l3 -8l-1 -5l-6 -6l-12 -9l-3 -10l3 -3l0 -5l5 -12l-10 -2l-2 -4l-6 -3l0 1l-7 10l-9 6l-6 1l-4 7l3 9l-4 5l-5 -3l-9 0l-5 2l-4 8l0 5l-5 7l4 4l5 11l9 5l10 9l3 11z"
  },
  {
    "slug": "inocencia",
    "name": "Inocência",
    "lat": -19.7278,
    "lng": -51.9289,
    "posicao": "banco",
    "x": 852.6,
    "y": 380.1,
    "d": "M914 413l-2 -1l-3 -9l-5 -3l-2 -5l-6 -6l-1 -4l-4 -1l-12 -20l-8 -7l2 -12l-6 -9l0 -4l-3 -12l-1 -6l-2 -7l-9 -1l-6 -3l-6 1l-5 7l-4 1l-2 -4l-8 -4l-8 5l3 3l5 7l10 0l1 3l-6 7l-3 -3l-7 -1l-2 4l-6 -1l-9 0l-8 -4l-7 0l-4 8l1 9l-4 11l-3 3l5 8l12 3l6 7l1 7l4 3l1 5l11 12l0 15l3 7l4 6l2 7l4 3l3 -6l6 -3l3 -4l8 -3l10 1l7 -3l9 -11l4 15l8 2l2 -5l5 -4l11 -3l11 -1z"
  },
  {
    "slug": "itapora",
    "name": "Itaporã",
    "lat": -22.08,
    "lng": -54.7858,
    "posicao": "banco",
    "x": 467.6,
    "y": 718.8,
    "d": "M481 717l8 -18l0 -3l-5 3l-5 -4l2 -6l-6 1l-4 3l-5 -11l-4 1l-3 2l-4 -3l-6 0l-3 -2l-5 1l-4 10l-1 11l-6 2l-5 4l0 4l2 6l-1 7l7 -3l3 6l6 1l7 6l7 1l13 -9l4 -3l5 -3l3 -4z"
  },
  {
    "slug": "itaquirai",
    "name": "Itaquiraí",
    "lat": -23.4739,
    "lng": -54.1872,
    "posicao": "banco",
    "x": 548.3,
    "y": 919.5,
    "d": "M528 866l-5 12l0 5l-3 3l3 10l12 9l6 6l1 5l-3 8l0 4l-3 5l9 1l3 4l11 5l6 0l2 7l2 -8l6 -24l4 -3l6 -6l5 -7l4 -3l3 -6l-3 -5l-1 -5l-5 -4l-7 -3l-18 -5l-5 4l-9 1l0 -4l-6 -2l-4 0l-9 -6l-2 2z"
  },
  {
    "slug": "ivinhema",
    "name": "Ivinhema",
    "lat": -22.3047,
    "lng": -53.8189,
    "posicao": "banco",
    "x": 597.9,
    "y": 751.2,
    "d": "M570 786l1 -1l13 -15l6 4l5 7l9 5l15 4l6 -3l8 2l5 -5l5 -12l-3 -2l-1 -5l-3 -4l0 -6l-3 -3l-2 -9l1 -3l-3 -5l-3 0l-10 6l-13 0l-7 -4l-9 -1l-4 -5l-7 -2l-2 1l-2 1l-11 24l-3 3l0 4l2 9l6 5l4 10z"
  },
  {
    "slug": "japora",
    "name": "Japorã",
    "lat": -23.8917,
    "lng": -54.4058,
    "posicao": "banco",
    "x": 518.8,
    "y": 979.7,
    "d": "M481 971l13 1l10 7l10 2l2 4l4 -1l4 -5l-5 -1l-2 -4l4 -6l-4 -3l-5 -1l-2 -5l-14 -2l-10 -2l-8 2l3 14z"
  },
  {
    "slug": "jaraguari",
    "name": "Jaraguari",
    "lat": -20.1389,
    "lng": -54.3989,
    "posicao": "banco",
    "x": 519.7,
    "y": 439.3,
    "d": "M468 444l2 3l8 2l6 3l2 3l6 0l12 5l2 7l1 9l6 0l8 5l6 6l11 4l8 -3l2 -2l10 -4l9 -2l6 -3l16 -5l-9 -5l-5 -4l1 -3l-4 -6l-7 -8l-1 -5l-4 -5l-2 -2l-9 -3l0 -2l-6 -3l-4 0l-5 -3l-10 0l-6 1l-12 -5l-3 3l-7 0l-10 -3l-8 3l-4 4l-3 0l-3 18z"
  },
  {
    "slug": "jardim",
    "name": "Jardim",
    "lat": -21.4808,
    "lng": -56.1381,
    "posicao": "banco",
    "x": 285.4,
    "y": 632.5,
    "d": "M195 645l6 -2l8 -1l6 6l4 -4l12 -5l2 12l4 3l8 1l10 -2l11 9l4 14l6 0l7 4l1 8l5 1l3 3l4 1l5 -2l4 1l0 -8l5 -2l8 -2l-7 1l-5 -1l0 -4l-4 -7l-5 -3l-10 -12l-1 -7l4 -5l-2 -10l-4 -5l-7 -1l-2 -8l2 -4l-4 -9l-1 7l-8 6l-2 5l-8 0l-6 2l-11 2l-6 -2l-9 2l-6 -2l-18 3l-9 2l-11 14l0 4l13 -4l4 1z"
  },
  {
    "slug": "jatei",
    "name": "Jateí",
    "lat": -22.4808,
    "lng": -54.3039,
    "posicao": "banco",
    "x": 532.5,
    "y": 776.5,
    "d": "M515 797l6 1l9 -7l13 19l5 1l8 0l5 5l9 4l11 12l10 1l6 4l8 0l6 5l4 1l5 6l0 -9l4 -3l2 -6l6 -3l1 -4l5 -3l2 -4l-4 -3l0 -3l-3 -8l-5 0l-3 4l-8 3l-15 2l-10 -6l-8 -3l-8 -11l-6 -6l-11 2l-1 -4l-31 -13l-12 26z"
  },
  {
    "slug": "juti",
    "name": "Juti",
    "lat": -22.86,
    "lng": -54.6058,
    "posicao": "banco",
    "x": 491.9,
    "y": 831.1,
    "d": "M474 835l7 0l3 4l5 1l6 7l7 0l1 4l7 7l0 -1l5 -12l1 -11l1 -2l-1 -6l34 -8l7 1l4 -3l-5 -5l-8 0l-5 -1l-13 -19l-9 7l-6 -1l-3 0l-11 -2l-8 4l-7 0l-7 -3l2 8l4 3l-8 4l-4 8l0 10l1 6z"
  },
  {
    "slug": "ladario",
    "name": "Ladário",
    "lat": -19.0089,
    "lng": -57.6,
    "posicao": "banco",
    "x": 88.3,
    "y": 276.6,
    "d": "M106 279l-11 -1l-9 -3l-2 5l-1 7l-3 1l-2 7l1 4l22 7l0 -13l6 -10l-1 -4z"
  },
  {
    "slug": "laguna-carapa",
    "name": "Laguna Carapã",
    "lat": -22.5458,
    "lng": -55.15,
    "posicao": "banco",
    "x": 418.5,
    "y": 785.9,
    "d": "M391 809l6 5l10 15l10 6l4 5l3 -4l5 3l5 1l5 -2l3 5l7 -3l2 -4l8 -1l5 -2l-15 -14l-5 -2l-5 -9l-6 -3l-4 -1l-7 -4l0 -5l3 -4l1 -5l3 -1l3 -5l3 0l6 -9l3 -11l-3 -1l-8 1l-2 7l-4 2l-5 -3l-13 8l-16 7l-3 7l1 21z"
  },
  {
    "slug": "maracaju",
    "name": "Maracaju",
    "lat": -21.6145,
    "lng": -55.1683,
    "posicao": "banco",
    "x": 416.1,
    "y": 651.8,
    "d": "M462 683l-2 -7l-7 -3l-6 -6l-3 -7l-3 -1l-1 -6l-5 -2l0 -3l-4 -4l-6 -1l-3 -7l-7 -4l1 -2l-6 -3l-6 -5l-5 -9l2 -4l-3 -10l-2 -1l-1 -10l2 -5l0 -8l5 -10l3 1l-2 -3l-6 6l-7 -1l-8 3l-9 -4l-2 2l1 5l-4 2l-3 -6l-3 4l-10 3l3 6l-4 13l-7 4l5 5l-4 8l4 8l-2 4l4 6l-11 -2l-7 -4l-2 4l-4 1l-1 3l5 4l-2 4l8 12l-7 -1l-3 7l5 4l8 13l3 -4l10 5l9 1l8 5l7 6l5 -1l1 4l7 -2l2 2l8 2l8 3l5 -2l4 1l8 -2l9 -1l3 -2l4 -10l5 -1l3 2l6 0l4 3l3 -2z"
  },
  {
    "slug": "miranda",
    "name": "Miranda",
    "lat": -20.2406,
    "lng": -56.3781,
    "posicao": "banco",
    "x": 253,
    "y": 453.9,
    "d": "M169 447l7 -1l10 10l7 2l-1 13l7 8l4 -2l6 1l3 -7l15 0l3 0l10 -4l2 -3l9 4l-2 7l1 8l1 6l5 8l10 11l0 3l7 3l2 -2l9 -4l3 -2l-2 -8l1 -7l-2 -7l-4 -3l10 -1l0 -6l-8 -7l-4 -1l-5 -5l1 -6l-2 -7l3 -4l-5 -10l0 -9l-1 -7l-4 -2l-5 -7l-3 0l-8 -8l-6 -3l-5 -5l-12 0l-7 2l-3 -6l-6 -3l-3 2l-5 0l-4 2l-5 -3l-5 -8l-2 0l-3 -5l-8 1l-5 -4l0 -6l-10 57l5 0l4 5l0 8l2 3l-2 9z"
  },
  {
    "slug": "mundo-novo",
    "name": "Mundo Novo",
    "lat": -23.9358,
    "lng": -54.2889,
    "posicao": "banco",
    "x": 534.6,
    "y": 986,
    "d": "M562 976l-4 5l-5 4l-7 -1l-6 -4l-3 -5l-16 -7l-4 6l2 4l5 1l-4 5l-4 1l2 4l8 7l4 0l2 6l3 3l5 -2l11 -8l4 -1l5 -6l3 -8l-1 -4z"
  },
  {
    "slug": "navirai",
    "name": "Naviraí",
    "lat": -23.0658,
    "lng": -54.1919,
    "posicao": "banco",
    "x": 547.6,
    "y": 860.8,
    "d": "M528 866l2 -2l9 6l4 0l6 2l0 4l9 -1l5 -4l18 5l7 3l5 4l1 5l3 5l-3 6l-4 3l-5 7l-6 6l4 0l23 -12l6 -11l2 -7l8 -16l1 -17l-3 -3l-5 -6l-4 -1l-6 -5l-8 0l-6 -4l-10 -1l-11 -12l-9 -4l-4 3l-7 -1l-34 8l1 6l-1 2l-1 11l-5 12l6 3l2 4l10 2z"
  },
  {
    "slug": "nioaque",
    "name": "Nioaque",
    "lat": -21.1358,
    "lng": -55.8289,
    "posicao": "banco",
    "x": 327,
    "y": 582.8,
    "d": "M373 567l-4 -5l-9 1l-7 -7l-7 -5l0 -4l-5 -9l1 -4l-3 -5l-14 -4l0 3l-6 8l-7 2l-9 -3l-4 -5l-7 0l-6 3l3 4l-3 6l-7 6l4 7l-8 7l5 11l-5 1l-2 4l2 10l3 3l-5 3l3 3l1 6l1 4l10 6l9 -1l5 2l7 6l4 1l2 4l5 2l6 5l1 -3l4 -1l2 -4l7 4l11 2l-4 -6l2 -4l-4 -8l4 -8l-5 -5l7 -4l4 -13l-3 -6l10 -3l3 -4l3 6l4 -2l-1 -5l2 -2z"
  },
  {
    "slug": "nova-alvorada-do-sul",
    "name": "Nova Alvorada do Sul",
    "lat": -21.4658,
    "lng": -54.3839,
    "posicao": "banco",
    "x": 521.8,
    "y": 630.4,
    "d": "M479 614l2 8l-3 3l5 5l-2 4l0 4l5 4l6 -8l5 1l10 6l1 4l7 5l7 -9l7 -3l-1 6l-2 3l2 5l10 9l5 1l2 5l14 5l2 -1l11 5l7 5l1 5l7 4l14 6l1 -5l5 -9l2 -5l1 -9l-2 -6l2 -2l-1 -7l15 -1l2 -4l-1 -2l-3 1l-4 -4l-9 4l-12 -4l-4 1l-15 -4l-5 -3l-5 -6l-9 -6l-1 -4l-11 -9l-1 -6l-8 -9l0 -4l-4 -9l-12 -6l-4 -9l-7 -4l-6 -3l0 3l4 16l-6 1l-5 3l5 6l-1 3l-6 4l-9 9l-4 0l-1 6l-3 1z"
  },
  {
    "slug": "nova-andradina",
    "name": "Nova Andradina",
    "lat": -22.2328,
    "lng": -53.3439,
    "posicao": "banco",
    "x": 661.9,
    "y": 740.8,
    "d": "M705 652l-4 -1l-12 -5l-5 3l-4 -4l-3 4l-5 -2l-7 2l-11 -5l-5 -1l-15 8l-5 0l-3 -3l-2 4l-15 1l1 7l-2 2l2 6l-1 9l-2 5l-5 9l-1 5l6 9l9 8l3 10l9 6l1 6l3 5l-1 3l2 9l3 3l0 6l3 4l1 5l3 2l-5 12l-5 5l8 2l19 -36l28 -51l11 -20l-2 -5l6 -17l0 -8l2 -2z"
  },
  {
    "slug": "novo-horizonte-do-sul",
    "name": "Novo Horizonte do Sul",
    "lat": -22.6032,
    "lng": -53.7828,
    "posicao": "ibge",
    "x": 602.8,
    "y": 794.1,
    "d": "M570 786l6 6l8 11l8 3l10 6l15 -2l8 -3l3 -4l5 0l6 -5l-1 -2l3 -5l-8 -2l-8 -2l-6 3l-15 -4l-9 -5l-5 -7l-6 -4l-13 15l-1 1z"
  },
  {
    "slug": "paraiso-das-aguas",
    "name": "Paraíso das Águas",
    "lat": -19.0522,
    "lng": -53.0008,
    "posicao": "banco",
    "x": 708.2,
    "y": 282.8,
    "d": "M765 335l0 -2l-6 -7l-8 -3l0 -4l-6 -5l-4 0l-12 -4l-7 1l-5 -8l-1 -6l-3 -1l-1 -5l5 0l8 -6l6 -15l0 -5l-6 -5l-3 -16l-8 0l-3 2l-9 0l-2 2l-6 10l-5 3l-3 6l-5 2l-6 -3l-6 -6l-4 0l-8 7l-3 9l8 7l-7 4l-4 5l0 6l-6 4l-10 0l-8 -1l-3 11l3 11l3 4l3 14l4 5l3 11l3 3l10 -10l3 -1l6 -9l2 7l25 -6l7 1l-1 -6l11 1l4 5l11 5l6 6l13 -2l7 4l8 -9l4 -10l6 -1z"
  },
  {
    "slug": "paranaiba",
    "name": "Paranaíba",
    "lat": -19.6758,
    "lng": -51.1908,
    "posicao": "banco",
    "x": 952.1,
    "y": 372.6,
    "d": "M987 343l-8 -9l-4 -3l-3 -6l-7 -5l-10 -3l-8 -4l-6 0l-5 -6l-7 0l-8 -8l-4 -1l-6 0l-6 -2l-2 9l-4 10l-7 -1l-2 -2l-10 -2l-3 -4l-8 3l-8 -2l2 7l1 6l3 12l0 4l6 9l-2 12l8 7l12 20l4 1l1 4l6 6l2 5l5 3l3 9l2 1l6 -4l6 -7l8 -4l7 -1l5 3l5 -2l5 2l5 -7l8 -1l4 -3l1 -5l-2 -3l1 -6l6 -15l9 -1l-1 -6l-4 -6l4 -4z"
  },
  {
    "slug": "paranhos",
    "name": "Paranhos",
    "lat": -23.8917,
    "lng": -55.4308,
    "posicao": "banco",
    "x": 380.7,
    "y": 979.7,
    "d": "M363 921l5 12l-2 4l1 5l8 3l6 20l-2 6l1 6l-1 6l3 6l10 5l4 -4l7 4l-1 -9l5 -1l-2 -6l-4 -8l5 -3l15 -5l-5 -5l-1 -5l-9 -8l0 -4l-4 -7l-3 -8l-16 -3l-2 -4l-12 4l-6 -1z"
  },
  {
    "slug": "pedro-gomes",
    "name": "Pedro Gomes",
    "lat": -18.1,
    "lng": -54.55,
    "posicao": "banco",
    "x": 499.4,
    "y": 145.7,
    "d": "M481 119l1 7l0 6l-3 17l6 9l6 -1l2 2l0 6l2 2l5 -6l6 -2l9 -8l6 1l7 -2l5 1l8 -6l5 -1l13 2l4 -5l4 -13l2 -3l11 -6l-1 -5l2 -6l4 -4l4 -9l4 -6l8 -5l5 0l-3 -3l-5 2l-4 -4l-5 5l-5 0l-1 -3l-8 -2l-12 2l-2 5l-6 9l-7 2l-10 8l-4 -1l-3 -6l-6 2l-4 -3l-6 0l-2 -4l-5 3l-7 -7l-13 -1l-5 2l-11 3l1 7l6 10l2 9z"
  },
  {
    "slug": "ponta-pora",
    "name": "Ponta Porã",
    "lat": -22.5361,
    "lng": -55.7256,
    "posicao": "banco",
    "x": 340.9,
    "y": 784.5,
    "d": "M335 763l3 -1l2 9l-2 5l3 11l13 11l2 9l8 8l4 2l2 -5l7 -4l14 1l-1 -21l3 -7l16 -7l13 -8l5 3l4 -2l2 -7l8 -1l-3 -2l-10 -12l-9 -5l-8 2l-6 -2l-6 -5l-8 2l-4 -5l-1 -4l-7 1l-6 -4l-2 -13l-3 -7l12 -7l3 -6l-1 -4l-5 1l-7 -6l-8 -5l-9 -1l-10 -5l-3 4l-8 -13l-5 -4l-3 1l-7 -2l-7 4l3 8l-1 10l6 0l-8 2l-5 2l0 8l-4 -1l-5 2l-4 -1l6 11l2 3l-2 7l4 3l6 5l4 0l9 8l5 -1l5 1l5 -4l7 -1l3 2l5 0l-5 7l-3 7l0 3l-5 5l-2 6l2 3l-3 6z"
  },
  {
    "slug": "porto-murtinho",
    "name": "Porto Murtinho",
    "lat": -21.6989,
    "lng": -57.8839,
    "posicao": "banco",
    "x": 50.1,
    "y": 663.9,
    "d": "M57 554l2 7l-7 8l3 8l-2 6l2 7l-1 6l-9 8l4 4l5 1l-1 5l-4 4l-5 10l-1 5l-3 4l0 7l6 5l-4 5l2 4l6 5l-8 6l0 4l5 2l-3 7l-4 4l6 3l-5 4l2 4l-5 13l-4 2l2 4l0 4l6 -1l2 6l9 1l4 -1l4 4l3 -4l4 2l8 -7l4 3l7 0l3 5l1 5l9 -1l6 -6l2 -7l3 -2l2 -6l5 -8l5 -1l5 -5l7 2l4 -6l4 -2l0 -7l5 -7l-1 -5l10 -13l6 -2l4 -4l8 2l3 -7l0 -4l11 -14l9 -2l-4 -7l2 -7l-1 -4l3 -5l-1 -9l-5 -11l-4 -5l2 -6l-3 -4l1 -9l-3 -8l3 -6l-2 -4l4 -10l-3 -4l-1 -5l-2 -6l3 -7l-1 -8l-4 -7l-3 -6l1 -4l-3 -7l-6 0l-3 -11l8 -1l0 -4l-3 -4l1 -8l-7 8l-4 1l-5 -2l-6 1l-7 -6l-3 1l-6 -5l-3 -4l-5 4l0 9l-4 3l1 3l-12 7l-1 8l-5 8l-1 0l-2 11l5 2l-13 9l-8 1l-5 5l-1 6l-3 3l-6 0l-3 4l-1 6l-7 1l-4 4l1 5l-3 4l1 6z"
  },
  {
    "slug": "ribas-do-rio-pardo",
    "name": "Ribas do Rio Pardo",
    "lat": -20.4428,
    "lng": -53.7592,
    "posicao": "banco",
    "x": 606,
    "y": 483.1,
    "d": "M548 486l-1 11l3 8l-4 11l1 5l3 3l2 6l9 4l4 6l5 2l3 10l5 5l7 0l8 5l1 7l6 5l6 1l3 4l1 5l6 5l0 7l5 9l1 7l3 4l0 7l-3 8l4 1l1 10l-2 4l1 2l3 3l5 0l15 -8l5 1l11 5l7 -2l5 2l3 -4l4 4l5 -3l12 5l4 1l4 2l-4 -19l-3 -3l-2 -7l1 -3l-6 -8l-5 -18l0 -11l-7 -8l0 -4l-11 -11l-3 -6l4 -9l3 -1l9 -8l1 -10l-2 -4l2 -6l5 1l6 -2l6 -4l7 0l12 -5l11 -11l-3 -3l-4 -9l-4 -2l-10 -11l-13 -9l-4 -9l1 -5l-2 -5l-6 -5l-4 -11l-11 -9l-9 -16l-5 -1l-3 -8l-5 -6l-4 2l-20 -4l-5 -5l-1 -4l-9 -4l-9 -9l-2 -5l-4 -4l-5 -3l-6 24l-11 3l3 20l6 8l3 10l-7 2l-4 7l-10 3l-6 7l4 5l1 5l7 8l4 6l-1 3l5 4l9 5l-16 5l-6 3l-9 2l-10 4z"
  },
  {
    "slug": "rio-brilhante",
    "name": "Rio Brilhante",
    "lat": -21.8019,
    "lng": -54.5469,
    "posicao": "banco",
    "x": 499.8,
    "y": 678.8,
    "d": "M489 696l7 0l6 -1l4 3l4 -6l6 1l9 7l11 -2l6 3l6 -5l9 3l3 -4l10 -3l7 2l8 -1l2 -3l-7 -4l-1 -5l-7 -5l-11 -5l-2 1l-14 -5l-2 -5l-5 -1l-10 -9l-2 -5l2 -3l1 -6l-7 3l-7 9l-7 -5l-1 -4l-10 -6l-5 -1l-6 8l-5 -4l0 -4l2 -4l-5 -5l3 -3l-2 -8l-9 4l-2 -5l-5 -1l-2 2l-8 -2l-16 21l-1 11l-1 4l0 3l5 2l1 6l3 1l3 7l6 6l7 3l2 7l4 -1l5 11l4 -3l6 -1l-2 6l5 4l5 -3z"
  },
  {
    "slug": "rio-negro",
    "name": "Rio Negro",
    "lat": -19.4478,
    "lng": -54.9858,
    "posicao": "banco",
    "x": 440.6,
    "y": 339.8,
    "d": "M406 350l9 11l4 3l8 2l7 -2l-1 7l2 5l9 -2l4 1l4 -2l1 -4l7 0l4 -17l0 -7l2 -4l12 -22l-5 -5l1 -6l-9 -4l-9 -2l-6 7l-10 0l-4 7l0 2l-5 8l-6 -2l-1 5l-7 4l-6 2l-3 12l-2 3z"
  },
  {
    "slug": "rio-verde-de-mato-grosso",
    "name": "Rio Verde de Mato Grosso",
    "lat": -18.9189,
    "lng": -54.8439,
    "posicao": "banco",
    "x": 459.8,
    "y": 263.6,
    "d": "M496 234l-5 -6l-1 -6l-14 -6l-6 -12l2 -2l-13 -9l-5 3l-6 -2l-8 -6l-3 -7l-6 -4l2 -4l-7 -2l-2 -4l-7 -2l-7 1l-3 -2l-6 4l-4 -1l-12 48l-6 60l-3 32l6 6l14 -3l2 2l7 0l6 4l5 6l4 3l5 -1l6 2l5 -8l0 -2l4 -7l10 0l6 -7l9 2l2 -4l4 -2l5 -9l0 -3l4 -7l18 -10l10 3l7 -1l3 -2l-5 -8l-10 -8l-1 -9l-4 -2l-2 -8z"
  },
  {
    "slug": "rochedo",
    "name": "Rochedo",
    "lat": -19.9792,
    "lng": -54.7358,
    "posicao": "ibge",
    "x": 474.3,
    "y": 416.3,
    "d": "M475 387l-7 3l-5 6l-2 1l-2 9l-4 2l-2 8l-5 9l-1 4l-4 4l-4 4l-4 0l-2 5l11 1l6 6l7 -1l1 -4l10 0l3 -18l3 0l4 -4l8 -3l10 3l7 0l3 -3l12 5l2 -5l-7 -3l-1 -5l0 -8l-5 -3l-12 0l-7 2l-2 -15l-11 0z"
  },
  {
    "slug": "santa-rita-do-pardo",
    "name": "Santa Rita do Pardo",
    "lat": -21.3019,
    "lng": -52.8339,
    "posicao": "banco",
    "x": 730.7,
    "y": 606.8,
    "d": "M709 654l8 5l7 -1l9 2l11 8l6 2l8 -5l11 1l8 -3l13 -3l11 -6l3 2l4 -2l8 6l3 4l2 10l8 -3l7 -10l0 -5l-2 -7l-5 -4l-8 2l-1 -3l-7 -3l0 -3l-8 -5l-9 -4l-5 -7l-9 -5l-4 -3l-5 -10l-5 -6l-1 -5l-3 -2l-4 -6l-9 -7l-4 -5l-20 -17l-9 -6l-4 -5l-5 -2l-4 -6l1 -5l-3 -7l-12 -6l-5 -1l-2 6l2 4l-1 10l-9 8l-3 1l-4 9l3 6l11 11l0 4l7 8l0 11l5 18l6 8l-1 3l2 7l3 3l4 19z"
  },
  {
    "slug": "sao-gabriel-do-oeste",
    "name": "São Gabriel do Oeste",
    "lat": -19.3958,
    "lng": -54.5689,
    "posicao": "banco",
    "x": 496.8,
    "y": 332.3,
    "d": "M496 234l2 8l4 2l1 9l10 8l5 8l-3 2l-7 1l-10 -3l-18 10l-4 7l0 3l-5 9l-4 2l-2 4l9 4l-1 6l5 5l-12 22l7 6l3 14l6 0l7 -5l5 1l5 -5l11 1l5 2l1 -11l4 -1l4 -8l7 -1l0 -12l5 -4l6 -7l3 1l0 -12l-1 -7l-4 -8l8 -6l-3 -20l-6 -8l-1 -6l-5 -7l-4 -3l-8 -2l-7 3l-12 0l-6 -2z"
  },
  {
    "slug": "selviria",
    "name": "Selvíria",
    "lat": -20.3639,
    "lng": -51.4219,
    "posicao": "banco",
    "x": 921,
    "y": 471.7,
    "d": "M827 438l4 8l-1 10l4 10l0 5l8 10l-1 4l12 9l4 -6l3 1l6 -6l6 1l5 -2l4 3l3 5l3 0l7 9l1 4l6 5l9 -7l7 -12l4 -3l11 -15l-3 -6l-7 -4l-5 -4l-7 -3l-8 -7l-9 -13l-8 -8l-8 -2l-4 -15l-9 11l-7 3l-10 -1l-8 3l-3 4l-6 3l-3 6z"
  },
  {
    "slug": "sete-quedas",
    "name": "Sete Quedas",
    "lat": -23.9708,
    "lng": -55.0389,
    "posicao": "banco",
    "x": 433.5,
    "y": 991.1,
    "d": "M403 994l5 3l13 -4l3 -3l6 4l9 -5l10 1l0 -6l9 -2l9 -6l11 0l3 -5l-3 -14l-8 6l-15 8l-6 2l-10 5l-6 -6l-4 0l-8 -10l-15 5l-5 3l4 8l2 6l-5 1l1 9z"
  },
  {
    "slug": "sidrolandia",
    "name": "Sidrolândia",
    "lat": -20.9319,
    "lng": -54.9619,
    "posicao": "banco",
    "x": 443.9,
    "y": 553.5,
    "d": "M463 526l0 5l-7 1l-3 -2l-4 2l-4 -2l-15 -4l-2 -10l-5 -7l-8 -3l-4 -2l1 3l-3 11l2 5l4 2l3 10l-1 8l-5 5l-1 20l-6 -2l-3 -1l-5 10l0 8l-2 5l1 10l2 1l3 10l-2 4l5 9l6 5l6 3l-1 2l7 4l3 7l6 1l4 4l1 -4l1 -11l16 -21l8 2l2 -2l5 1l2 5l9 -4l3 -1l1 -6l4 0l9 -9l6 -4l1 -3l-5 -6l5 -3l6 -1l-4 -16l0 -3l-2 -4l-6 -2l-5 -6l-3 0l-6 -3l-4 -6l-1 -7l1 -4l-3 -8l-6 -3l-7 7z"
  },
  {
    "slug": "sonora",
    "name": "Sonora",
    "lat": -17.5758,
    "lng": -54.7589,
    "posicao": "banco",
    "x": 471.2,
    "y": 70.2,
    "d": "M617 24l-4 -4l-8 3l-3 6l-4 1l-2 8l-5 2l-8 11l-6 4l-7 1l-4 5l1 7l-5 8l-7 0l-7 -1l-15 8l-6 -1l-6 -4l2 -3l-2 -6l-5 -4l-6 -2l0 -4l-4 -2l-9 -2l-9 4l-15 3l-2 7l-5 2l-4 4l-5 2l-11 -2l-14 5l-3 -2l-9 3l-2 13l3 2l0 6l8 11l6 3l5 -2l6 5l2 5l7 7l5 1l12 -5l2 -4l7 -4l-2 -9l-6 -10l-1 -7l11 -3l5 -2l13 1l7 7l5 -3l2 4l6 0l4 3l6 -2l3 6l4 1l10 -8l7 -2l6 -9l2 -5l12 -2l8 2l1 3l5 0l5 -5l4 4l5 -2l3 3l7 -1l4 -59z"
  },
  {
    "slug": "tacuru",
    "name": "Tacuru",
    "lat": -23.6361,
    "lng": -55.0158,
    "posicao": "banco",
    "x": 436.6,
    "y": 942.9,
    "d": "M421 962l8 10l4 0l6 6l10 -5l6 -2l15 -8l8 -6l8 -2l-3 -11l-10 -9l-9 -5l-7 0l-8 3l-6 -4l-7 -6l-9 -4l-8 -9l-1 -4l-7 3l-9 24l4 7l0 4l9 8l1 5l5 5z"
  },
  {
    "slug": "taquarussu",
    "name": "Taquarussu",
    "lat": -22.4897,
    "lng": -53.3489,
    "posicao": "banco",
    "x": 661.3,
    "y": 777.8,
    "d": "M660 755l-19 36l-3 5l1 2l-6 5l3 8l0 3l4 3l-2 4l-5 3l-1 4l-6 3l-2 6l-4 3l0 9l3 3l3 -8l5 -3l4 -6l8 -3l10 -8l4 -1l7 -6l-1 -4l6 -1l2 -6l-1 -16l-3 -5l-1 -6l-3 -6l0 -14l-3 -4z"
  },
  {
    "slug": "terenos",
    "name": "Terenos",
    "lat": -20.4422,
    "lng": -54.8606,
    "posicao": "banco",
    "x": 457.5,
    "y": 483,
    "d": "M411 504l4 2l8 3l5 7l2 10l15 4l4 2l4 -2l3 2l7 -1l0 -5l-3 -8l6 -3l4 -7l-4 -8l0 -7l5 -4l0 -23l-8 -4l0 -2l-9 -2l-5 -5l1 -4l-6 -6l-11 -1l-6 0l-7 -2l-7 4l-7 8l-3 3l-1 6l4 4l-10 1l-5 3l0 6l-5 3l3 5l6 -5l7 6l0 3l9 17z"
  },
  {
    "slug": "tres-lagoas",
    "name": "Três Lagoas",
    "lat": -20.7519,
    "lng": -51.6789,
    "posicao": "banco",
    "x": 886.3,
    "y": 527.6,
    "d": "M874 571l1 -5l7 -7l6 0l6 -4l1 -8l-2 -9l1 -7l-2 -3l5 -13l3 -6l1 -1l-6 -5l-1 -4l-7 -9l-3 0l-3 -5l-4 -3l-5 2l-6 -1l-6 6l-3 -1l-4 6l-12 -9l1 -4l-8 -10l0 -5l-4 -10l1 -10l-4 -8l-4 -3l-2 -7l-4 -6l-3 -7l0 -15l-11 -12l-1 -5l-4 -3l-1 -7l-6 -7l-12 -3l-10 4l-5 8l-1 8l-3 6l-4 2l-9 1l-9 9l5 2l2 4l1 16l3 8l-4 3l0 8l3 6l-4 8l1 5l7 11l7 6l1 3l7 6l5 9l3 2l2 5l4 4l7 18l7 10l-1 12l7 10l8 4l4 -2l9 6l7 4l9 7l6 6l0 2l7 6l7 0l1 2l0 -7l2 -3l6 0l4 -4l3 -7z"
  },
  {
    "slug": "vicentina",
    "name": "Vicentina",
    "lat": -22.4097,
    "lng": -54.4419,
    "posicao": "banco",
    "x": 513.9,
    "y": 766.3,
    "d": "M530 764l-15 -6l-5 1l-5 13l5 9l0 11l2 5l3 0l12 -26l3 -7z"
  }
]
