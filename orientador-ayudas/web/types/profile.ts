export type UserProfile = {
  edad: number;
  edad52: boolean | null;
  residenciaLegal: boolean | null;
  aniosResidencia: number | null;
  convivencia: 'solo' | 'acompanado' | null;
  numAdultos: number | null;
  numMenores: number | null;
  ingresosMensualesHogar: number | null; // indice del rango: 0='Menos de 500€', 1='500-1.000€', 2='1.000-1.500€', 3='1.500-2.500€', 4='Mas de 2.500€'
  patrimonioHogar: number | null; // indice del rango: 0='Menos de 10.000€', 1='10.000-30.000€', 2='30.000-75.000€', 3='Mas de 75.000€'
  situacion: 'trabajando' | 'paro' | 'autonomo' | 'estudiante' | 'otra' | null;
  finInvoluntario: boolean | null;
  agotadoPrestacion: boolean | null;
  diasCotizados: number | null; // indice del rango: 0='Menos de 90 dias', 1='90-360 dias', 2='360-720 dias', 3='Mas de 720 dias'
  inscritoDemandante: boolean | null;
  responsabilidadesFamiliares: boolean | null;
  unidadConvivencia6meses: boolean | null;
  administradorSociedad: boolean | null;
  menoresACargo: boolean | null;
};
