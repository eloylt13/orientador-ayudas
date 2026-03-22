export type Severity = 'red' | 'yellow' | 'weak';

export type DocumentType =
  | 'convenio_no_laboral'
  | 'contrato_pre2022'
  | 'contrato_post2022'
  | 'documento_informativo'
  | 'desconocido';

export interface RiskItem {
  id: string;
  severity: Severity;
  title: string;
  explanation: string;
  legalRef?: string;
  snippet?: string;
  page?: number;
}

export interface AnalysisResult {
  documentType: DocumentType;
  items: RiskItem[];
}