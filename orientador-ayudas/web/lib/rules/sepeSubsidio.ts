import type { UserProfile } from '../../types/profile';
import type { EligibilityResult } from '../../types/result';

const AYUDA = 'Subsidio por desempleo (cotizaciones insuficientes)';
const DOCUMENTACION = [
  'DNI o NIE en vigor',
  'Vida laboral actualizada',
  'Certificado de empresa (si lo tienes)',
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
  if (perfil.diasCotizados === null || perfil.diasCotizados === undefined) {
    return 'Hace falta confirmar tu tramo de días cotizados para saber si alcanzas este subsidio.';
  }

  if (perfil.finInvoluntario === null || perfil.finInvoluntario === undefined) {
    return 'Hace falta confirmar si el fin de tu último trabajo fue involuntario.';
  }

  if (perfil.inscritoDemandante === false) {
    return 'Te falta inscribirte como demandante de empleo para poder solicitar esta ayuda.';
  }

  if (
    perfil.ingresosMensualesHogar === null ||
    perfil.ingresosMensualesHogar === undefined
  ) {
    return 'Hace falta indicar los ingresos mensuales del hogar para valorar el límite económico.';
  }

  if (perfil.ingresosMensualesHogar === 2) {
    return 'Tus ingresos están en el tramo límite y conviene revisar el cálculo exacto para confirmar si entras.';
  }

  return null;
}

export function evaluarSepeSubsidio(
  perfil: Partial<UserProfile>,
): EligibilityResult {
  if (perfil.situacion !== 'paro' && perfil.situacion !== null) {
    return crearResultado(
      'rojo',
      'Esta ayuda está pensada para personas que están en paro.\nCon la situación que indicas, ahora mismo no encajarías en este subsidio del SEPE.',
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

  if (perfil.diasCotizados === 0) {
    return crearResultado(
      'rojo',
      'Has indicado menos de 90 días cotizados.\nNo se alcanzan los 90 días mínimos que suelen exigirse para este subsidio.',
      null,
    );
  }

  if (
    perfil.diasCotizados !== null &&
    perfil.diasCotizados !== undefined &&
    perfil.diasCotizados >= 2
  ) {
    return crearResultado(
      'rojo',
      'Has indicado 360 días cotizados o más.\nEn ese caso probablemente tendrías derecho a la prestación contributiva, no a este subsidio por cotizaciones insuficientes.',
      null,
    );
  }

  if (
    perfil.situacion === null ||
    ((perfil.diasCotizados === null || perfil.diasCotizados === undefined) &&
      (perfil.finInvoluntario === null || perfil.finInvoluntario === undefined))
  ) {
    return crearResultado(
      'gris',
      'Faltan datos clave para valorar esta ayuda con un mínimo de seguridad.\nSi confirmas tu situación laboral y las cotizaciones o el motivo del fin del trabajo, podremos afinar el resultado.',
      null,
    );
  }

  if (
    perfil.diasCotizados === null ||
    perfil.diasCotizados === undefined ||
    perfil.finInvoluntario === null ||
    perfil.finInvoluntario === undefined ||
    perfil.inscritoDemandante === false ||
    perfil.ingresosMensualesHogar === null ||
    perfil.ingresosMensualesHogar === undefined ||
    perfil.ingresosMensualesHogar === 2
  ) {
    return crearResultado(
      'amarillo',
      'Hay señales de que podrías encajar en este subsidio, pero falta comprobar un dato importante o completar un requisito previo.\nHasta resolver ese punto, no se puede dar la ayuda por segura.',
      obtenerDatoFaltante(perfil),
    );
  }

  if (
    perfil.situacion === 'paro' &&
    perfil.finInvoluntario === true &&
    perfil.diasCotizados === 1 &&
    perfil.inscritoDemandante === true &&
    perfil.residenciaLegal === true &&
    perfil.ingresosMensualesHogar !== null &&
    perfil.ingresosMensualesHogar !== undefined &&
    perfil.ingresosMensualesHogar <= 1
  ) {
    return crearResultado(
      'verde',
      'Por los datos que has indicado, encajas bien en los requisitos principales del subsidio por cotizaciones insuficientes.\nParece una opción viable, pendiente de la revisión final que haga el SEPE.',
      null,
    );
  }

  return crearResultado(
    'rojo',
    'Con la información disponible, no se aprecia encaje suficiente con los requisitos principales de esta ayuda.\nConviene revisar sobre todo las cotizaciones, la inscripción como demandante y el nivel de ingresos del hogar.',
    null,
  );
}
