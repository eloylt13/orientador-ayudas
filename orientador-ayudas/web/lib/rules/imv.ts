import type { UserProfile } from '../../types/profile';
import type { EligibilityResult } from '../../types/result';

const AYUDA = 'Ingreso Mínimo Vital (IMV)';
const DOCUMENTACION = [
  'DNI o NIE en vigor',
  'Certificado de empadronamiento',
  'Declaración de la renta o certificado de imputaciones',
  'Libro de familia (si hay menores)',
  'Certificado de convivencia',
];
const ENLACE_OFICIAL =
  'https://www.seg-social.es/wps/portal/wss/internet/InformacionUtil/44539/44616';
const ULTIMA_REVISION = 'marzo 2026';

function crearResultado(
  badge: EligibilityResult['badge'],
  explicacion: string,
  queFalta: string | null,
): EligibilityResult {
  return {
    ayuda: AYUDA,
    badge,
    explicacion,
    queFalta,
    documentacion: DOCUMENTACION,
    enlaceOficial: ENLACE_OFICIAL,
    ultimaRevision: ULTIMA_REVISION,
  };
}

function obtenerDatoFaltante(perfil: Partial<UserProfile>): string | null {
  if (perfil.aniosResidencia === null || perfil.aniosResidencia === undefined) {
    return 'Confirma cuántos años llevas residiendo legalmente en España.';
  }

  if (
    perfil.unidadConvivencia6meses === null ||
    perfil.unidadConvivencia6meses === undefined
  ) {
    return 'Confirma si la unidad de convivencia lleva constituida al menos 6 meses.';
  }

  if (perfil.patrimonioHogar === null || perfil.patrimonioHogar === undefined) {
    return 'Confirma el tramo de patrimonio total del hogar.';
  }

  if (perfil.ingresosMensualesHogar === 1) {
    return 'Tus ingresos del hogar están en un tramo límite; habría que confirmar el importe mensual exacto.';
  }

  if (perfil.patrimonioHogar === 2) {
    return 'Tu patrimonio está en un tramo límite; habría que confirmar el valor exacto para validar el IMV.';
  }

  return null;
}

export function evaluarIMV(perfil: Partial<UserProfile>): EligibilityResult {
  const edad = perfil.edad ?? 0;
  const convivenciaValida =
    perfil.unidadConvivencia6meses === true || perfil.convivencia === 'solo';
  const aniosResidenciaValidos =
    perfil.aniosResidencia !== null &&
    perfil.aniosResidencia !== undefined &&
    perfil.aniosResidencia >= 1;

  if (perfil.residenciaLegal === false) {
    return crearResultado(
      'rojo',
      'Ahora mismo no aparece opción de IMV porque indicas que no tienes residencia legal en España.\nEs uno de los requisitos básicos para poder solicitar esta ayuda.',
      null,
    );
  }

  if (perfil.administradorSociedad === true) {
    return crearResultado(
      'rojo',
      'Has indicado que eres administrador de una sociedad.\nEse dato suele excluir el acceso al IMV en la revisión inicial.',
      null,
    );
  }

  if (
    edad < 23 &&
    perfil.menoresACargo === false &&
    perfil.menoresACargo !== null &&
    perfil.menoresACargo !== undefined
  ) {
    return crearResultado(
      'rojo',
      'Con menos de 23 años, el IMV normalmente exige tener menores a cargo.\nCon los datos que has dado, no cumplirías ese requisito.',
      null,
    );
  }

  if (
    perfil.ingresosMensualesHogar !== null &&
    perfil.ingresosMensualesHogar !== undefined &&
    perfil.ingresosMensualesHogar >= 3
  ) {
    return crearResultado(
      'rojo',
      'El nivel de ingresos del hogar que indicas está por encima del umbral orientativo para esta ayuda.\nPor eso el IMV no aparece como opción viable en este momento.',
      null,
    );
  }

  const camposClave = [
    perfil.residenciaLegal,
    perfil.aniosResidencia,
    perfil.ingresosMensualesHogar,
    perfil.patrimonioHogar,
    perfil.unidadConvivencia6meses,
  ];
  const camposClaveNulos = camposClave.filter(
    (valor) => valor === null || valor === undefined,
  ).length;

  if (camposClaveNulos > 2) {
    return crearResultado(
      'gris',
      'Faltan varios datos clave para valorar el IMV con un mínimo de seguridad.\nSi completas residencia, antigüedad, ingresos, patrimonio y convivencia, podremos afinar mejor el resultado.',
      null,
    );
  }

  if (
    perfil.aniosResidencia === null ||
    perfil.aniosResidencia === undefined ||
    perfil.unidadConvivencia6meses === null ||
    perfil.unidadConvivencia6meses === undefined ||
    perfil.patrimonioHogar === null ||
    perfil.patrimonioHogar === undefined ||
    perfil.ingresosMensualesHogar === 1 ||
    perfil.patrimonioHogar === 2
  ) {
    return crearResultado(
      'amarillo',
      'Hay señales de que podrías encajar en el IMV, pero falta confirmar un dato importante o estás en un tramo límite.\nCon un poco más de precisión se podría saber si realmente cumples los requisitos.',
      obtenerDatoFaltante(perfil),
    );
  }

  if (
    perfil.residenciaLegal === true &&
    aniosResidenciaValidos &&
    (edad >= 23 || perfil.menoresACargo === true) &&
    perfil.administradorSociedad === false &&
    perfil.ingresosMensualesHogar !== null &&
    perfil.ingresosMensualesHogar !== undefined &&
    perfil.ingresosMensualesHogar <= 1 &&
    perfil.patrimonioHogar !== null &&
    perfil.patrimonioHogar !== undefined &&
    perfil.patrimonioHogar <= 1 &&
    convivenciaValida
  ) {
    return crearResultado(
      'verde',
      'Por los datos que has indicado, encajas bastante bien en los requisitos generales del IMV.\nParece una ayuda viable para ti, salvo comprobación final de la Seguridad Social.',
      null,
    );
  }

  return crearResultado(
    'rojo',
    'Con la información disponible, no se aprecia encaje suficiente con los requisitos generales del IMV.\nPuede deberse al nivel de ingresos, patrimonio, antigüedad de residencia o a la situación de convivencia.',
    null,
  );
}
