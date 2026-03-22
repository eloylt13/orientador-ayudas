import type { DocumentType } from '@/types/risk';

export function detectDocumentType(pages: string[]): DocumentType {
    const fullText = pages.join(' ').toLowerCase();

    // ── Documentos informativos del SEPE / Ministerio ──────────────────────────
    // Detectar antes que cualquier otra cosa para evitar falsos positivos
    const informativoIndicators = [
        'nipo pdf',
        'catálogo de publicaciones de la administración general del estado',
        'publicacionesoficiales.boe.es',
        'trabajamos para ti',
        'www.sepe.es',
        'destinatarios',
        'ventajas que obtiene la empresa',
        'normativa de referencia',
        '901 11 99 99',
        '901 11 01 21',
    ];
    const scoreInformativo = informativoIndicators.filter((k) => fullText.includes(k)).length;
    // Si tiene 3 o más indicadores de documento informativo, lo clasificamos como tal
    if (scoreInformativo >= 3) return 'documento_informativo';

    // ── Contratos laborales post-2022 ──────────────────────────────────────────
    const post2022: string[] = [
        'práctica profesional',
        'practica profesional',
        'ley 32/2021',
        'contrato formativo',
        'fse+',
        'fondo social europeo plus',
        'plan formativo individual',
    ];

    // ── Contratos laborales pre-2022 ───────────────────────────────────────────
    const pre2022: string[] = [
        'contrato de trabajo en prácticas',
        'contrato en prácticas',
        'rd 488/1998',
        'rd. 488/98',
        'real decreto 488/1998',
        'código 420',
        'código 520',
        '60% del salario',
        '75% del salario',
        '60 por ciento',
        '75 por ciento',
        'mod. pe -176',
    ];

    // ── Convenios no laborales ─────────────────────────────────────────────────
    const convenio: string[] = [
        'convenio de cooperación educativa',
        'prácticas curriculares',
        'prácticas extracurriculares',
        'tutor académico',
        'rd 592/2014',
        'real decreto 592/2014',
        'rd 1493/2011',
        'real decreto 1493/2011',
        'convenio de prácticas',
        'institución educativa',
        'universidad',
        'centro universitario',
        'centro de estudios',
    ];

    const scorePost2022 = post2022.filter((k) => fullText.includes(k)).length;
    const scorePre2022 = pre2022.filter((k) => fullText.includes(k)).length;
    const scoreConvenio = convenio.filter((k) => fullText.includes(k)).length;

    const max = Math.max(scorePost2022, scorePre2022, scoreConvenio);
    if (max === 0) return 'desconocido';
    if (scorePost2022 === max) return 'contrato_post2022';
    if (scorePre2022 === max) return 'contrato_pre2022';
    return 'convenio_no_laboral';
}