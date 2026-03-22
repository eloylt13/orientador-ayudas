import type { UserProfile } from '../../types/profile';

type TipoRespuesta = 'numero' | 'booleano' | 'selector' | 'rango';
type Rama = 'base' | 'desempleo' | 'imv';

export const RANGOS = {
  ingresos: [
    'Menos de 500\u20AC',
    '500\u20AC - 1.000\u20AC',
    '1.000\u20AC - 1.500\u20AC',
    '1.500\u20AC - 2.500\u20AC',
    'M\u00E1s de 2.500\u20AC',
  ],
  patrimonio: [
    'Menos de 10.000\u20AC',
    '10.000\u20AC - 30.000\u20AC',
    '30.000\u20AC - 75.000\u20AC',
    'M\u00E1s de 75.000\u20AC',
  ],
  diasCotizados: [
    'Menos de 90 d\u00EDas',
    '90 - 360 d\u00EDas',
    '360 - 720 d\u00EDas',
    'M\u00E1s de 720 d\u00EDas',
  ],
} as const;

interface Pregunta {
  id: keyof UserProfile;
  rama: Rama;
  texto: string;
  tipo: TipoRespuesta;
  opciones?: string[];
  rangos?: string[];
  permitirNoSe: boolean;
  condicion?: (perfil: Partial<UserProfile>) => boolean;
}

export const PREGUNTAS: Pregunta[] = [
  {
    id: 'edad',
    rama: 'base',
    texto: '\u00BFCu\u00E1ntos a\u00F1os tienes?',
    tipo: 'numero',
    permitirNoSe: false,
  },
  {
    id: 'residenciaLegal',
    rama: 'base',
    texto: '\u00BFTienes residencia legal y efectiva en Espa\u00F1a?',
    tipo: 'booleano',
    permitirNoSe: false,
  },
  {
    id: 'aniosResidencia',
    rama: 'base',
    texto: '\u00BFLlevas al menos 1 a\u00F1o residiendo en Espa\u00F1a?',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) => perfil.residenciaLegal === true,
  },
  {
    id: 'convivencia',
    rama: 'base',
    texto: '\u00BFVives solo o con m\u00E1s personas?',
    tipo: 'selector',
    opciones: ['Solo', 'Con m\u00E1s personas'],
    permitirNoSe: false,
  },
  {
    id: 'numAdultos',
    rama: 'base',
    texto: '\u00BFCu\u00E1ntos adultos viven en tu hogar (incluy\u00E9ndote a ti)?',
    tipo: 'numero',
    permitirNoSe: false,
    condicion: (perfil) => perfil.convivencia === 'acompanado',
  },
  {
    id: 'numMenores',
    rama: 'base',
    texto: '\u00BFCu\u00E1ntos menores de edad viven en tu hogar?',
    tipo: 'numero',
    permitirNoSe: false,
    condicion: (perfil) => perfil.convivencia === 'acompanado',
  },
  {
    id: 'ingresosMensualesHogar',
    rama: 'base',
    texto: '\u00BFCu\u00E1les son los ingresos aproximados de tu hogar al mes?',
    tipo: 'rango',
    rangos: [...RANGOS.ingresos],
    permitirNoSe: true,
  },
  {
    id: 'patrimonioHogar',
    rama: 'base',
    texto:
      '\u00BFCu\u00E1nto dinero aproximado tiene tu hogar en ahorros o inversiones (sin contar la vivienda habitual)?',
    tipo: 'rango',
    rangos: [...RANGOS.patrimonio],
    permitirNoSe: true,
  },
  {
    id: 'situacion',
    rama: 'base',
    texto: '\u00BFCu\u00E1l es tu situaci\u00F3n actual?',
    tipo: 'selector',
    opciones: ['Trabajando', 'En paro', 'Aut\u00F3nomo', 'Estudiante', 'Otra'],
    permitirNoSe: false,
  },
  {
    id: 'finInvoluntario',
    rama: 'desempleo',
    texto:
      '\u00BFTu \u00FAltimo trabajo termin\u00F3 de forma involuntaria (despido, fin de contrato, ERE)?',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) => perfil.situacion === 'paro',
  },
  {
    id: 'diasCotizados',
    rama: 'desempleo',
    texto: '\u00BFCu\u00E1ntos d\u00EDas cotizados tienes aproximadamente por cuenta ajena?',
    tipo: 'rango',
    rangos: [...RANGOS.diasCotizados],
    permitirNoSe: true,
    condicion: (perfil) => perfil.situacion === 'paro',
  },
  {
    id: 'inscritoDemandante',
    rama: 'desempleo',
    texto: '\u00BFEst\u00E1s inscrito como demandante de empleo en el SEPE?',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) => perfil.situacion === 'paro',
  },
  {
    id: 'unidadConvivencia6meses',
    rama: 'imv',
    texto: '\u00BFLlevas al menos 6 meses viviendo con las mismas personas en el hogar?',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) =>
      perfil.ingresosMensualesHogar != null && perfil.ingresosMensualesHogar <= 1,
  },
  {
    id: 'administradorSociedad',
    rama: 'imv',
    texto: '\u00BFEres actualmente administrador de alguna sociedad mercantil?',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) =>
      perfil.ingresosMensualesHogar != null && perfil.ingresosMensualesHogar <= 1,
  },
  {
    id: 'menoresACargo',
    rama: 'imv',
    texto: '\u00BFHay menores a cargo en tu hogar?',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) =>
      perfil.ingresosMensualesHogar != null && perfil.ingresosMensualesHogar <= 1,
  },
];

export function getPreguntasActivas(
  perfil: Partial<UserProfile>,
): Pregunta[] {
  return PREGUNTAS.filter((pregunta) =>
    pregunta.condicion ? pregunta.condicion(perfil) : true,
  );
}

export type { Pregunta, Rama, TipoRespuesta };
