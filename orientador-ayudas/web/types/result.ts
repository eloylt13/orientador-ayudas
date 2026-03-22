export type EligibilityResult = {
  ayuda: string;
  badge: 'verde' | 'amarillo' | 'rojo' | 'gris';
  explicacion: string;
  queFalta: string | null;
  documentacion: string[];
  enlaceOficial: string;
  ultimaRevision: string;
};
