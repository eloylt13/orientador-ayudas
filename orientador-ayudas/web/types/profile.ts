export type UserProfile = {
  edad: number;
  residenciaLegal: boolean | null;
  aniosResidencia: number | null;
  convivencia: 'solo' | 'acompanado' | null;
  numAdultos: number | null;
  numMenores: number | null;
  ingresosMensualesHogar: number | null;
  patrimonioHogar: number | null;
  situacion: 'trabajando' | 'paro' | 'autonomo' | 'estudiante' | 'otra' | null;
  finInvoluntario: boolean | null;
  diasCotizados: number | null;
  inscritoDemandante: boolean | null;
  unidadConvivencia6meses: boolean | null;
  administradorSociedad: boolean | null;
  menoresACargo: boolean | null;
};
