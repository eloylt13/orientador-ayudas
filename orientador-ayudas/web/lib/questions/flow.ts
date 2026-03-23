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
  ayuda?: string;
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
    ayuda:
      'Tu edad determina si puedes acceder al IMV (m\u00EDnimo 23 a\u00F1os salvo con menores a cargo)',
    tipo: 'numero',
    permitirNoSe: false,
  },
  {
    id: 'residenciaLegal',
    rama: 'base',
    texto: '\u00BFTienes residencia legal y efectiva en Espa\u00F1a?',
    ayuda:
      'Se considera residencia legal tener permiso de residencia en vigor o ser ciudadano espa\u00F1ol o de la UE',
    tipo: 'booleano',
    permitirNoSe: false,
  },
  {
    id: 'aniosResidencia',
    rama: 'base',
    texto: '\u00BFLlevas al menos 1 a\u00F1o residiendo en Espa\u00F1a?',
    ayuda: 'El IMV exige al menos 1 a\u00F1o de residencia continuada en Espa\u00F1a',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) => perfil.residenciaLegal === true,
  },
  {
    id: 'convivencia',
    rama: 'base',
    texto: '\u00BFVives solo o con m\u00E1s personas?',
    ayuda:
      'Se cuenta a todas las personas que comparten vivienda y gastos contigo de forma habitual',
    tipo: 'selector',
    opciones: ['Solo', 'Con m\u00E1s personas'],
    permitirNoSe: false,
  },
  {
    id: 'numAdultos',
    rama: 'base',
    texto: '\u00BFCu\u00E1ntos adultos viven en tu hogar (incluy\u00E9ndote a ti)?',
    ayuda:
      'Cuenta a todas las personas mayores de 18 a\u00F1os que viven contigo, incluy\u00E9ndote a ti',
    tipo: 'numero',
    permitirNoSe: false,
    condicion: (perfil) => perfil.convivencia === 'acompanado',
  },
  {
    id: 'numMenores',
    rama: 'base',
    texto: '\u00BFCu\u00E1ntos menores de edad viven en tu hogar?',
    ayuda: 'Cuenta a todas las personas menores de 18 a\u00F1os que viven en el hogar',
    tipo: 'numero',
    permitirNoSe: false,
    condicion: (perfil) => perfil.convivencia === 'acompanado',
  },
  {
    id: 'ingresosMensualesHogar',
    rama: 'base',
    texto: '\u00BFCu\u00E1les son los ingresos aproximados de tu hogar al mes?',
    ayuda:
      'Suma todos los ingresos del hogar: sueldos, prestaciones, pensiones, etc. Usa cifras aproximadas netas (lo que recibes despu\u00E9s de impuestos)',
    tipo: 'rango',
    rangos: [...RANGOS.ingresos],
    permitirNoSe: true,
  },
  {
    id: 'patrimonioHogar',
    rama: 'base',
    texto:
      '\u00BFCu\u00E1nto dinero aproximado tiene tu hogar en ahorros o inversiones (sin contar la vivienda habitual)?',
    ayuda:
      'Incluye ahorros, dep\u00F3sitos e inversiones. No cuentes el valor de la vivienda habitual ni el coche',
    tipo: 'rango',
    rangos: [...RANGOS.patrimonio],
    permitirNoSe: true,
  },
  {
    id: 'situacion',
    rama: 'base',
    texto: '\u00BFCu\u00E1l es tu situaci\u00F3n actual?',
    ayuda:
      'Elige la opci\u00F3n que mejor describe tu situaci\u00F3n principal en este momento',
    tipo: 'selector',
    opciones: ['Trabajando', 'En paro', 'Aut\u00F3nomo', 'Estudiante', 'Otra'],
    permitirNoSe: false,
  },
  {
    id: 'finInvoluntario',
    rama: 'desempleo',
    texto:
      '\u00BFTu \u00FAltimo trabajo termin\u00F3 de forma involuntaria (despido, fin de contrato, ERE)?',
    ayuda:
      'Se considera involuntario: despido, ERE, fin de contrato temporal, cierre de empresa. No cuenta la dimisi\u00F3n voluntaria',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) => perfil.situacion === 'paro',
  },
  {
    id: 'diasCotizados',
    rama: 'desempleo',
    texto: '\u00BFCu\u00E1ntos d\u00EDas cotizados tienes aproximadamente por cuenta ajena?',
    ayuda:
      'Puedes consultar tus d\u00EDas cotizados en tu vida laboral, disponible gratis en la Seguridad Social',
    tipo: 'rango',
    rangos: [...RANGOS.diasCotizados],
    permitirNoSe: true,
    condicion: (perfil) => perfil.situacion === 'paro',
  },
  {
    id: 'inscritoDemandante',
    rama: 'desempleo',
    texto: '\u00BFEst\u00E1s inscrito como demandante de empleo en el SEPE?',
    ayuda:
      'Debes estar inscrito en tu oficina del SEPE o por sede electr\u00F3nica. Es requisito para cobrar cualquier prestaci\u00F3n por desempleo',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) => perfil.situacion === 'paro',
  },
  {
    id: 'unidadConvivencia6meses',
    rama: 'imv',
    texto: '\u00BFLlevas al menos 6 meses viviendo con las mismas personas en el hogar?',
    ayuda:
      'El IMV exige que el hogar lleve al menos 6 meses constituido tal como est\u00E1 ahora',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) =>
      perfil.ingresosMensualesHogar != null && perfil.ingresosMensualesHogar <= 2,
  },
  {
    id: 'administradorSociedad',
    rama: 'imv',
    texto: '\u00BFEres actualmente administrador de alguna sociedad mercantil?',
    ayuda:
      'Ser administrador de una sociedad mercantil activa es causa de exclusi\u00F3n del IMV',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) =>
      perfil.ingresosMensualesHogar != null && perfil.ingresosMensualesHogar <= 2,
  },
  {
    id: 'menoresACargo',
    rama: 'imv',
    texto: '\u00BFHay menores a cargo en tu hogar?',
    ayuda:
      'Los menores a cargo ampl\u00EDan el umbral de ingresos permitido y pueden dar acceso al IMV a menores de 23 a\u00F1os',
    tipo: 'booleano',
    permitirNoSe: false,
    condicion: (perfil) =>
      perfil.ingresosMensualesHogar != null && perfil.ingresosMensualesHogar <= 2,
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
