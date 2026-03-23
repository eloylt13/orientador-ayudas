import { UserProfile } from '../../types/profile';
import { EligibilityResult } from '../../types/result';
import { evaluarIMV } from './imv';
import { evaluarSepeContributiva } from './sepeContributiva';
import { evaluarSepeSubsidio } from './sepeSubsidio';
import { evaluarSepeSubsidio52 } from './sepeSubsidio52';

const BADGE_PRIORITY: Record<EligibilityResult['badge'], number> = {
  verde: 0,
  amarillo: 1,
  gris: 2,
  rojo: 3,
};

export function evaluarPerfil(
  perfil: Partial<UserProfile>,
): EligibilityResult[] {
  return [
    evaluarIMV(perfil),
    evaluarSepeContributiva(perfil),
    evaluarSepeSubsidio(perfil),
    evaluarSepeSubsidio52(perfil),
  ];
}

export function ordenarResultados(
  resultados: EligibilityResult[],
): EligibilityResult[] {
  return resultados
    .map((resultado, index) => ({ resultado, index }))
    .sort((a, b) => {
      const prioridadA = BADGE_PRIORITY[a.resultado.badge];
      const prioridadB = BADGE_PRIORITY[b.resultado.badge];

      if (prioridadA !== prioridadB) {
        return prioridadA - prioridadB;
      }

      return a.index - b.index;
    })
    .map(({ resultado }) => resultado);
}
