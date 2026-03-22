export const AYUDAS_CATALOG = {
  imv: {
    nombre: 'Ingreso Mínimo Vital (IMV)',
    organismo: 'Seguridad Social',
    enlaceSolicitud: 'https://imv.seg-social.es',
    enlaceInfo: 'https://imv.seg-social.es',
    ultimaRevision: 'marzo 2026',
    baseNormativa: 'RD-Ley 20/2020 y Ley 19/2021',
    plazoHabitual:
      'Convocatoria permanente - se puede solicitar en cualquier momento',
  },
  sepeContributiva: {
    nombre: 'Prestación contributiva por desempleo',
    organismo: 'SEPE',
    enlaceSolicitud: 'https://sede.sepe.gob.es',
    enlaceInfo:
      'https://www.sepe.es/HomeSepe/Personas/distributiva-prestaciones/prestacion-contributiva.html',
    ultimaRevision: 'marzo 2026',
    baseNormativa: 'ET art. 269, LGSS art. 263-278',
    plazoHabitual:
      'Solicitar en los 15 días hábiles siguientes al despido para no perder días de prestación',
  },
  sepeSubsidio: {
    nombre: 'Subsidio por desempleo (cotizaciones insuficientes)',
    organismo: 'SEPE',
    enlaceSolicitud: 'https://sede.sepe.gob.es',
    enlaceInfo:
      'https://www.sepe.es/HomeSepe/Personas/distributiva-prestaciones/subsidio-desempleo.html',
    ultimaRevision: 'marzo 2026',
    baseNormativa: 'LGSS art. 274-277 bis',
    plazoHabitual:
      'Solicitar en los 15 días hábiles siguientes al fin de la situación legal de desempleo',
  },
} as const;

export type AyudaKey = keyof typeof AYUDAS_CATALOG;
export type AyudaCatalogItem = (typeof AYUDAS_CATALOG)[AyudaKey];
