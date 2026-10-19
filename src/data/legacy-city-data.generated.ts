// Este arquivo é gerado por scripts/generate-legacy-city-data.mjs (L02, L03).
// Fonte: fichas de município publicadas em BD/u195698278_HZYqx.sql (wp_posts). Não editar à mão.

/** Número como a fonte o escreveu: valor e casas decimais. */
export type Indicador = { valor: number; casas: number }

export type ColetaDoAno = {
  ano: 2018 | 2019
  /** Quantidade recolhida, em t. */
  recolhida: Indicador | null
  /** População com coleta seletiva porta a porta. */
  populacao: Indicador | null
  /** Materiais recuperados, em t. */
  recuperadoTotal: Indicador | null
  papelao: Indicador | null
  plasticos: Indicador | null
  metais: Indicador | null
  vidros: Indicador | null
  outros: Indicador | null
  /** Produção de lixo diária, em t. */
  producaoDiaria: Indicador | null
}

export type LocaisDeEntrega =
  | { tipo: 'mapa'; url: string }
  | { tipo: 'listas'; grupos: Array<{ titulo: string; itens: string[] }> }
  | { tipo: 'nao-possui' }
  | { tipo: 'incompleto' }

export type LegacyCityData = {
  slug: string
  /** Data de publicação da ficha no site antigo (AAAA-MM-DD). */
  publicadoEm: string
  entrega: LocaisDeEntrega
  coleta: ColetaDoAno[]
  /** false quando a fonte não escreve "(T)" na produção diária. */
  producaoDiariaComUnidade: boolean
}

export const legacyCityData: LegacyCityData[] = [
  {
    "slug": "campo-grande",
    "publicadoEm": "2021-11-16",
    "entrega": {
      "tipo": "mapa",
      "url": "https://www.google.com/maps/d/embed?mid=10d04hhnk92iLxujjfK0q2_IxMpRh70o&ehbc=2E312F"
    },
    "coleta": [
      {
        "ano": 2018,
        "recolhida": {
          "valor": 6387.9,
          "casas": 1
        },
        "populacao": {
          "valor": 491528,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 2281.6,
          "casas": 1
        },
        "papelao": {
          "valor": 1323.9,
          "casas": 1
        },
        "plasticos": {
          "valor": 619.8,
          "casas": 1
        },
        "metais": {
          "valor": 109.1,
          "casas": 1
        },
        "vidros": {
          "valor": 124.5,
          "casas": 1
        },
        "outros": {
          "valor": 104.3,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 1339.402,
          "casas": 3
        }
      },
      {
        "ano": 2019,
        "recolhida": {
          "valor": 7119.5,
          "casas": 1
        },
        "populacao": {
          "valor": 491528,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 1492.4,
          "casas": 1
        },
        "papelao": {
          "valor": 957.1,
          "casas": 1
        },
        "plasticos": {
          "valor": 251.9,
          "casas": 1
        },
        "metais": {
          "valor": 103,
          "casas": 0
        },
        "vidros": {
          "valor": 81.1,
          "casas": 1
        },
        "outros": {
          "valor": 99.3,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 1279.74,
          "casas": 2
        }
      }
    ],
    "producaoDiariaComUnidade": true
  },
  {
    "slug": "corumba",
    "publicadoEm": "2021-11-16",
    "entrega": {
      "tipo": "nao-possui"
    },
    "coleta": [
      {
        "ano": 2018,
        "recolhida": {
          "valor": 455.8,
          "casas": 1
        },
        "populacao": {
          "valor": 45000,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 348,
          "casas": 1
        },
        "papelao": {
          "valor": 180,
          "casas": 1
        },
        "plasticos": {
          "valor": 72,
          "casas": 1
        },
        "metais": {
          "valor": 36,
          "casas": 1
        },
        "vidros": {
          "valor": 60,
          "casas": 1
        },
        "outros": {
          "valor": 0,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 80.01,
          "casas": 2
        }
      },
      {
        "ano": 2019,
        "recolhida": {
          "valor": 354,
          "casas": 1
        },
        "populacao": {
          "valor": 45000,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 245,
          "casas": 1
        },
        "papelao": {
          "valor": 143,
          "casas": 1
        },
        "plasticos": {
          "valor": 71,
          "casas": 1
        },
        "metais": {
          "valor": 31,
          "casas": 1
        },
        "vidros": {
          "valor": 0,
          "casas": 1
        },
        "outros": {
          "valor": 0,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 61.47,
          "casas": 2
        }
      }
    ],
    "producaoDiariaComUnidade": true
  },
  {
    "slug": "dourados",
    "publicadoEm": "2021-11-16",
    "entrega": {
      "tipo": "listas",
      "grupos": [
        {
          "titulo": "PEV'S",
          "itens": [
            "Ecoponto de galhos 1",
            "Ecoponto de galhos 2",
            "Ecoponto de galhos 3",
            "Ecoponto de Resíduos Recicláveis",
            "Ecoponto de Pneus",
            "PEV Resíduos de Construção Civil"
          ]
        },
        {
          "titulo": "Projeto PapaPilha",
          "itens": [
            "PAP001",
            "PAP002",
            "PAP003",
            "PAP004",
            "PAP005",
            "PAP006",
            "PAP007",
            "PAP008",
            "PAP009",
            "PAP010",
            "PAP011",
            "PAP013",
            "PAP012",
            "PAP014",
            "PAP015",
            "PAP017",
            "PAP016",
            "PAP018",
            "PAP019",
            "PAP020",
            "PAP021",
            "PAP022",
            "PAP023",
            "PAP024",
            "PAP025",
            "PAP026",
            "PAP027",
            "PAP028",
            "PAP029",
            "PAP030",
            "PAP031",
            "PAP032",
            "PAP033",
            "PAP034",
            "PAP035",
            "PAP036",
            "PAP037",
            "PAP038",
            "PAP039",
            "PAP040"
          ]
        }
      ]
    },
    "coleta": [
      {
        "ano": 2018,
        "recolhida": {
          "valor": 890,
          "casas": 0
        },
        "populacao": {
          "valor": 60000,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 420,
          "casas": 0
        },
        "papelao": null,
        "plasticos": null,
        "metais": null,
        "vidros": null,
        "outros": null,
        "producaoDiaria": {
          "valor": 249.721,
          "casas": 3
        }
      },
      {
        "ano": 2019,
        "recolhida": {
          "valor": 812.2,
          "casas": 1
        },
        "populacao": {
          "valor": 60000,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 748,
          "casas": 0
        },
        "papelao": {
          "valor": 182.7,
          "casas": 1
        },
        "plasticos": {
          "valor": 175.4,
          "casas": 1
        },
        "metais": {
          "valor": 243.6,
          "casas": 1
        },
        "vidros": {
          "valor": 146.3,
          "casas": 1
        },
        "outros": {
          "valor": 0,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 261.269,
          "casas": 3
        }
      }
    ],
    "producaoDiariaComUnidade": true
  },
  {
    "slug": "ponta-pora",
    "publicadoEm": "2021-11-16",
    "entrega": {
      "tipo": "nao-possui"
    },
    "coleta": [
      {
        "ano": 2018,
        "recolhida": {
          "valor": 66.4,
          "casas": 1
        },
        "populacao": {
          "valor": 9368,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 49.8,
          "casas": 1
        },
        "papelao": {
          "valor": 26.3,
          "casas": 1
        },
        "plasticos": {
          "valor": 13.4,
          "casas": 1
        },
        "metais": {
          "valor": 10,
          "casas": 0
        },
        "vidros": {
          "valor": 0,
          "casas": 1
        },
        "outros": {
          "valor": 0.1,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 83.69,
          "casas": 2
        }
      },
      {
        "ano": 2019,
        "recolhida": {
          "valor": 85.2,
          "casas": 1
        },
        "populacao": {
          "valor": 9513,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 63.9,
          "casas": 1
        },
        "papelao": {
          "valor": 37.6,
          "casas": 1
        },
        "plasticos": {
          "valor": 9.7,
          "casas": 1
        },
        "metais": {
          "valor": 16.1,
          "casas": 1
        },
        "vidros": {
          "valor": 0.5,
          "casas": 1
        },
        "outros": {
          "valor": 0,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 86.44,
          "casas": 2
        }
      }
    ],
    "producaoDiariaComUnidade": false
  },
  {
    "slug": "tres-lagoas",
    "publicadoEm": "2021-11-16",
    "entrega": {
      "tipo": "incompleto"
    },
    "coleta": [
      {
        "ano": 2018,
        "recolhida": {
          "valor": 1057.6,
          "casas": 1
        },
        "populacao": {
          "valor": 113923,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 551.9,
          "casas": 1
        },
        "papelao": {
          "valor": 271.3,
          "casas": 1
        },
        "plasticos": {
          "valor": 213.8,
          "casas": 1
        },
        "metais": {
          "valor": 66.8,
          "casas": 1
        },
        "vidros": {
          "valor": 0,
          "casas": 1
        },
        "outros": {
          "valor": 0,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 94.72,
          "casas": 2
        }
      },
      {
        "ano": 2019,
        "recolhida": {
          "valor": 1119.5,
          "casas": 1
        },
        "populacao": {
          "valor": 113000,
          "casas": 0
        },
        "recuperadoTotal": {
          "valor": 689,
          "casas": 0
        },
        "papelao": {
          "valor": 315.2,
          "casas": 1
        },
        "plasticos": {
          "valor": 243.2,
          "casas": 1
        },
        "metais": {
          "valor": 81.6,
          "casas": 1
        },
        "vidros": {
          "valor": 48.6,
          "casas": 1
        },
        "outros": {
          "valor": 0.4,
          "casas": 1
        },
        "producaoDiaria": {
          "valor": 96.48,
          "casas": 2
        }
      }
    ],
    "producaoDiariaComUnidade": true
  }
]
