import type { UserProfile } from '../../types/profile';
import type { EligibilityResult } from '../../types/result';

const AYUDA = 'Subsidio por desempleo para mayores de 52 años';
const DOCUMENTACION = [
  'DNI o NIE en vigor',
  'Vida laboral actualizada',
  'Certificado de empresa',
  'Justificante de ingresos del hogar',
  'Número de cuenta bancaria',
];
const ENLACE_OFICIAL =
  'https://www.sepe.es/HomeSepe/Personas/distributiva-prestaciones/subsidio-desempleo.html';
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
  if (perfil.agotadoPrestacion === null || perfil.agotadoPrestacion === undefined) {
    return 'Hace falta confirmar si ya has agotado la prestación contributiva por desempleo.';
  }

  if (perfil.inscritoDemandante === false) {
    return 'Te falta inscribirte como demandante de empleo para poder tramitar este subsidio.';
  }

  if (
    perfil.ingresosMensualesHogar === null ||
    perfil.ingresosMensualesHogar === undefined
  ) {
    return 'Hace falta indicar los ingresos mensuales del hogar para comprobar el límite económico.';
  }

  return null;
}

export function evaluarSepeSubsidio52(
  perfil: Partial<UserProfile>,
): EligibilityResult {
  if (perfil.situacion !== 'paro' && perfil.situacion !== null) {
    return crearResultado(
      'rojo',
      'Esta ayuda está reservada para personas en situación de desempleo.\nCon la situación que indicas, ahora mismo no encajarías en este subsidio del SEPE.',
      null,
    );
  }

  if (perfil.finInvoluntario === false) {
    return crearResultado(
      'rojo',
      'Este subsidio exige que la pérdida del empleo haya sido involuntaria.\nCon el dato que has marcado, el SEPE normalmente no lo reconocería.',
      null,
    );
  }

  if (perfil.residenciaLegal === false) {
    return crearResultado(
      'rojo',
      'Para acceder a esta ayuda necesitas residencia legal en España.\nCon la información actual, ese requisito básico no se estaría cumpliendo.',
      null,
    );
  }

  if (perfil.edad !== null && perfil.edad !== undefined && perfil.edad < 52) {
    return crearResultado(
      'rojo',
      'Este subsidio es exclusivo para personas de 52 años o más.\nCon la edad indicada, ahora mismo no encajarías en esta modalidad específica del SEPE.',
      null,
    );
  }

  if (
    perfil.situacion === null ||
    perfil.edad === null ||
    perfil.edad === undefined
  ) {
    return crearResultado(
      'gris',
      'Faltan datos básicos para valorar esta ayuda con un mínimo de seguridad.\nSi confirmas tu situación laboral y tu edad, podremos afinar el resultado.',
      null,
    );
  }

  if (
    (perfil.edad >= 52 &&
      (perfil.agotadoPrestacion === null ||
        perfil.agotadoPrestacion === undefined)) ||
    perfil.inscritoDemandante === false ||
    perfil.ingresosMensualesHogar === null ||
    perfil.ingresosMensualesHogar === undefined
  ) {
    return crearResultado(
      'amarillo',
      'Hay señales de que podrías encajar en el subsidio para mayores de 52 años, pero falta comprobar un dato importante o completar un requisito previo.\nHasta resolver ese punto, no se puede dar la ayuda por segura.',
      obtenerDatoFaltante(perfil),
    );
  }

  if (
    perfil.situacion === 'paro' &&
    perfil.finInvoluntario === true &&
    perfil.edad >= 52 &&
    perfil.inscritoDemandante === true &&
    perfil.residenciaLegal === true &&
    perfil.ingresosMensualesHogar !== null &&
    perfil.ingresosMensualesHogar !== undefined &&
    perfil.ingresosMensualesHogar <= 1
  ) {
    return crearResultado(
      'verde',
      'Por los datos que has indicado, encajas bien en los requisitos principales de este subsidio.\nEs una ayuda que puede mantenerse hasta la jubilación y además cotiza a la Seguridad Social, pendiente de revisión final del SEPE.',
      null,
    );
  }

  return crearResultado(
    'rojo',
    'Con la información disponible, no se aprecia encaje suficiente con los requisitos principales de esta ayuda.\nConviene revisar sobre todo la situación legal de desempleo, la inscripción como demandante y el nivel de ingresos del hogar.',
    null,
  );
}
