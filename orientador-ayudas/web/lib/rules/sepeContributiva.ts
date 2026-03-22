import type { UserProfile } from '../../types/profile';
import type { EligibilityResult } from '../../types/result';

const AYUDA = 'Prestación contributiva por desempleo (SEPE)';
const DOCUMENTACION = [
  'DNI o NIE en vigor',
  'Certificado de empresa (si lo tienes)',
  'Vida laboral actualizada',
  'Número de cuenta bancaria',
];
const ENLACE_OFICIAL =
  'https://www.sepe.es/HomeSepe/Personas/distributiva-prestaciones/prestacion-contributiva.html';
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
  if (perfil.inscritoDemandante === false) {
    return 'Te falta inscribirte como demandante de empleo para poder tramitar esta prestación.';
  }

  if (perfil.diasCotizados === null || perfil.diasCotizados === undefined) {
    return 'Hace falta confirmar tu tramo de días cotizados para saber si llegas a la prestación contributiva.';
  }

  if (perfil.finInvoluntario === null || perfil.finInvoluntario === undefined) {
    return 'Hace falta confirmar si el fin de tu último trabajo fue involuntario.';
  }

  return null;
}

export function evaluarSepeContributiva(
  perfil: Partial<UserProfile>,
): EligibilityResult {
  if (perfil.situacion !== 'paro' && perfil.situacion !== null) {
    return crearResultado(
      'rojo',
      'Esta ayuda está pensada para personas en situación de desempleo.\nCon la situación que indicas, ahora mismo no encajarías en la prestación contributiva del SEPE.',
      null,
    );
  }

  if (perfil.finInvoluntario === false) {
    return crearResultado(
      'rojo',
      'La prestación contributiva exige que la pérdida del empleo haya sido involuntaria.\nCon el dato que has marcado, el SEPE normalmente no reconocería este derecho.',
      null,
    );
  }

  if (perfil.residenciaLegal === false) {
    return crearResultado(
      'rojo',
      'Para acceder a esta prestación necesitas residencia legal en España.\nCon la información actual, ese requisito básico no se estaría cumpliendo.',
      null,
    );
  }

  if (perfil.diasCotizados === 0) {
    return crearResultado(
      'rojo',
      'Has indicado un tramo de cotización inferior a 90 días.\nCon eso no llegarías ni a la prestación contributiva ni, en principio, al subsidio por cotizaciones insuficientes.',
      null,
    );
  }

  if (perfil.diasCotizados === 1) {
    return crearResultado(
      'rojo',
      'Con entre 90 y 360 días cotizados no se alcanza la prestación contributiva.\nAun así, podrías encajar en el subsidio por cotizaciones insuficientes si cumples el resto de requisitos.',
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
    perfil.inscritoDemandante === false ||
    perfil.diasCotizados === null ||
    perfil.diasCotizados === undefined ||
    perfil.finInvoluntario === null ||
    perfil.finInvoluntario === undefined
  ) {
    return crearResultado(
      'amarillo',
      'Hay indicios de que podrías optar a esta prestación, pero falta un dato importante o un paso previo.\nCon esa comprobación pendiente todavía no se puede dar el encaje por seguro.',
      obtenerDatoFaltante(perfil),
    );
  }

  if (
    perfil.situacion === 'paro' &&
    perfil.finInvoluntario === true &&
    perfil.diasCotizados !== null &&
    perfil.diasCotizados !== undefined &&
    perfil.diasCotizados >= 2 &&
    perfil.inscritoDemandante === true &&
    perfil.residenciaLegal === true
  ) {
    return crearResultado(
      'verde',
      'Por los datos que has indicado, encajas bien en los requisitos generales de la prestación contributiva por desempleo.\nParece una opción viable, pendiente de la revisión final que haga el SEPE.',
      null,
    );
  }

  return crearResultado(
    'rojo',
    'Con la información disponible, no se aprecia encaje suficiente con los requisitos principales de esta prestación.\nConviene revisar sobre todo tu situación laboral, las cotizaciones acumuladas y la inscripción como demandante.',
    null,
  );
}
