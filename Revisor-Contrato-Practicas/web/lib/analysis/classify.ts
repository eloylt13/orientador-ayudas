import type { RiskItem, DocumentType } from '@/types/risk';

function normalize(text: string): string {
  return text.toLowerCase();
}

function getSnippet(pageText: string, idx: number): string {
  let start = pageText.lastIndexOf('\n', idx - 1);
  start = start === -1 ? 0 : start + 1;
  let end = pageText.indexOf('\n', idx);
  end = end === -1 ? pageText.length : end;
  let snippet = pageText.slice(start, end).trim();
  if (/^[a-záéíóúüñ]/.test(snippet)) {
    const spaceIdx = snippet.indexOf(' ');
    if (spaceIdx !== -1) snippet = snippet.slice(spaceIdx + 1).trim();
  }
  return snippet.slice(0, 300);
}

interface RulePattern {
  id: string;
  title: string;
  severity: 'red' | 'yellow' | 'weak';
  explanation: string;
  legalRef?: string;
  keywords: string[];
  // Si absent: true → dispara cuando NO se encuentra ninguna keyword (regla de ausencia)
  absent?: boolean;
}

function findMatchesInPage(pageText: string, rules: RulePattern[]): RiskItem[] {
  const normalized = normalize(pageText);
  const found: RiskItem[] = [];

  for (const rule of rules) {
    if (rule.absent) continue; // las reglas de ausencia se evalúan globalmente
    for (const kw of rule.keywords) {
      const idx = normalized.indexOf(kw);
      if (idx !== -1) {
        found.push({
          id: rule.id,
          severity: rule.severity,
          title: rule.title,
          explanation: rule.explanation,
          legalRef: rule.legalRef,
          snippet: getSnippet(pageText, idx),
        });
        break;
      }
    }
  }
  return found;
}

// Evalúa reglas de ausencia sobre el texto completo del documento
function findAbsenceMatches(allText: string, rules: RulePattern[]): RiskItem[] {
  const normalized = normalize(allText);
  const found: RiskItem[] = [];
  for (const rule of rules) {
    if (!rule.absent) continue;
    const noneFound = rule.keywords.every((kw) => !normalized.includes(kw));
    if (noneFound) {
      found.push({
        id: rule.id,
        severity: rule.severity,
        title: rule.title,
        explanation: rule.explanation,
        legalRef: rule.legalRef,
      });
    }
  }
  return found;
}

// ─── REGLAS CONTRATOS LABORALES PRE-2022 ────────────────────────────────────

const CONTRATO_PRE2022_RULES: RulePattern[] = [
  {
    id: 'R1', severity: 'red',
    title: 'Período de prueba posiblemente excesivo',
    explanation: 'En el contrato de trabajo en prácticas anterior a 2022, el período de prueba máximo es de 1 mes para titulaciones de grado medio o FP de nivel 1-2, y de 2 meses para titulaciones de grado superior. Verifica que no supere ese límite.',
    legalRef: 'ET art. 11.1 (redacción anterior a Ley 32/2021)',
    keywords: ['se establece un período de prueba', 'período de prueba de', 'periodo de prueba de', 'se fija un período de prueba'],
  },
  {
    id: 'R2', severity: 'red',
    title: 'Duración que puede superar el máximo legal',
    explanation: 'El contrato de trabajo en prácticas no puede superar los 2 años en total, incluyendo todas las prórrogas. Si se supera ese límite, el contrato se convierte automáticamente en indefinido.',
    legalRef: 'ET art. 11.1 (redacción anterior a Ley 32/2021)',
    keywords: ['duración del presente contrato', 'se extenderá desde', 'la duración será de'],
  },
  {
    id: 'R3', severity: 'red',
    title: 'Retribución que puede estar por debajo del mínimo',
    explanation: 'La retribución mínima es el 60% del salario fijado en convenio para el grupo profesional durante el primer año, y el 75% durante el segundo. Comprueba que la cifra indicada no sea inferior.',
    legalRef: 'ET art. 11.1 (redacción anterior a Ley 32/2021)',
    keywords: ['retribución', 'salario base', 'euros brutos', 'remuneración'],
  },
  {
    id: 'R4', severity: 'red',
    title: 'Posible cláusula de exclusividad o no competencia',
    explanation: 'Las cláusulas de exclusividad o no competencia en contratos formativos son nulas si no incluyen una compensación económica explícita y proporcional.',
    legalRef: 'ET art. 21.1',
    keywords: ['dedicación exclusiva', 'no podrá prestar servicios', 'exclusividad', 'no competencia'],
  },
  {
    id: 'R5', severity: 'red',
    title: 'Horas extraordinarias mencionadas — ilegales en este contrato',
    explanation: 'Los contratos formativos y en prácticas no pueden incluir horas extraordinarias. El ET las prohíbe expresamente para esta modalidad. Si aparecen en el contrato, esa cláusula es nula.',
    legalRef: 'ET art. 11 y art. 35.1',
    keywords: ['horas extraordinarias', 'horas extra', 'horas adicionales', 'trabajo suplementario'],
  },
  {
    id: 'A1', severity: 'yellow',
    title: 'Convenio colectivo no especificado',
    explanation: 'Si el contrato no indica qué convenio colectivo aplica, no es posible verificar si el salario y las condiciones son correctos. Pide que se concrete.',
    keywords: ['convenio colectivo', 'según convenio'],
  },
  {
    id: 'A2', severity: 'yellow',
    title: 'Jornada no concretada',
    explanation: 'El contrato debe especificar el número exacto de horas semanales. Una jornada ambigua permite a la empresa exigir más horas de las pactadas.',
    keywords: ['jornada de trabajo', 'horas semanales', 'distribución del tiempo'],
  },
  {
    id: 'A3', severity: 'yellow',
    title: 'Vacaciones que pueden estar por debajo del mínimo',
    explanation: 'El mínimo legal son 30 días naturales de vacaciones anuales. Verifica que el contrato no establezca menos.',
    legalRef: 'ET art. 38',
    keywords: ['vacaciones anuales', 'días naturales', 'días hábiles'],
  },
  {
    id: 'A4', severity: 'yellow',
    title: 'Prórroga automática sin límite definido',
    explanation: 'Si el contrato se prorroga automáticamente sin indicar un límite máximo, se puede superar el tope legal de 2 años sin que el trabajador lo advierta.',
    keywords: ['prórroga automática', 'se prorrogará', 'renovación automática'],
  },
  {
    id: 'A5', severity: 'yellow',
    title: 'Confidencialidad con penalización económica',
    explanation: 'Es habitual incluir cláusulas de confidencialidad, pero son problemáticas si incluyen multas económicas o tienen duración indefinida tras finalizar el contrato.',
    keywords: ['confidencialidad', 'penalización de', 'indemnización por incumplimiento'],
  },
  {
    id: 'A7', severity: 'yellow',
    title: 'Cotización a la Seguridad Social no mencionada',
    explanation: 'Desde el RD-ley 2/2023, todas las personas en prácticas —incluso las no remuneradas— cotizan obligatoriamente a la Seguridad Social. Si el contrato no lo menciona, puede indicar que la empresa no está cumpliendo esta obligación.',
    legalRef: 'RD-ley 2/2023, DA 52ª LGSS',
    keywords: ['seguridad social', 'cotización', 'contingencias', 'afiliación'],
    absent: true,
  },
  {
    id: 'S1', severity: 'weak',
    title: 'Certificado de prácticas no mencionado',
    explanation: 'Tienes derecho a recibir un certificado al finalizar que acredite el puesto, las tareas realizadas y las competencias adquiridas. Si no aparece en el contrato, pídelo por escrito.',
    keywords: ['certificado', 'acreditación', 'informe de prácticas'],
    absent: true,
  },
  {
    id: 'S2', severity: 'weak',
    title: 'Teletrabajo mencionado sin acuerdo específico',
    explanation: 'El trabajo a distancia requiere un acuerdo firmado separado que regule las condiciones. Si solo se menciona en el contrato sin ese acuerdo, la situación es irregular.',
    keywords: ['trabajo a distancia', 'teletrabajo', 'modalidad híbrida'],
  },
  {
    id: 'S3', severity: 'weak',
    title: 'Funciones o tareas no descritas',
    explanation: 'El contrato debería describir las tareas concretas que realizarás. Sin una descripción de funciones, la empresa puede asignarte trabajo no relacionado con tu titulación o formación, lo que desvirtúa el contrato.',
    keywords: ['funciones', 'tareas', 'actividades a realizar', 'descripción del puesto', 'objeto del contrato'],
    absent: true,
  },
];

// ─── REGLAS CONTRATOS LABORALES POST-2022 ───────────────────────────────────

const CONTRATO_POST2022_RULES: RulePattern[] = [
  {
    id: 'R1', severity: 'red',
    title: 'Período de prueba posiblemente excesivo',
    explanation: 'En el contrato formativo para la obtención de práctica profesional (post-reforma 2022), el período de prueba máximo es de 1 mes en todos los casos, independientemente de la titulación.',
    legalRef: 'ET art. 11.3 (Ley 32/2021)',
    keywords: ['se establece un período de prueba', 'período de prueba de', 'periodo de prueba de', 'se fija un período de prueba'],
  },
  {
    id: 'R2', severity: 'red',
    title: 'Duración que puede superar el máximo legal',
    explanation: 'El contrato formativo para la obtención de práctica profesional tiene una duración máxima de 1 año, incluyendo prórrogas. Si se supera, el contrato se convierte en indefinido automáticamente.',
    legalRef: 'ET art. 11.3 (Ley 32/2021)',
    keywords: ['duración del presente contrato', 'se extenderá desde', 'la duración será de'],
  },
  {
    id: 'R3', severity: 'red',
    title: 'Retribución que puede estar por debajo del mínimo legal',
    explanation: 'La retribución no puede ser inferior al SMI (1.134 €/mes en 2025) ni al salario fijado en convenio para el grupo profesional correspondiente. No existe el 60/75% del contrato antiguo — aquí el mínimo es el SMI completo.',
    legalRef: 'ET art. 11.3 (Ley 32/2021)',
    keywords: ['retribución', 'salario base', 'euros brutos', 'remuneración'],
  },
  {
    id: 'R4', severity: 'red',
    title: 'Posible cláusula de exclusividad o no competencia',
    explanation: 'Las cláusulas de exclusividad o no competencia en contratos formativos son nulas si no incluyen una compensación económica explícita y proporcional.',
    legalRef: 'ET art. 21.1',
    keywords: ['dedicación exclusiva', 'no podrá prestar servicios', 'exclusividad', 'no competencia'],
  },
  {
    id: 'R5', severity: 'red',
    title: 'Horas extraordinarias mencionadas — ilegales en este contrato',
    explanation: 'Los contratos formativos post-2022 prohíben expresamente las horas extraordinarias. Si el contrato las menciona o las prevé, esa cláusula es nula de pleno derecho.',
    legalRef: 'ET art. 11.3 y art. 35.1',
    keywords: ['horas extraordinarias', 'horas extra', 'horas adicionales', 'trabajo suplementario'],
  },
  {
    id: 'A1', severity: 'yellow',
    title: 'Convenio colectivo no especificado',
    explanation: 'Si el contrato no indica qué convenio colectivo aplica, no es posible verificar si el salario y las condiciones son correctos. Pide que se concrete.',
    keywords: ['convenio colectivo', 'según convenio'],
  },
  {
    id: 'A2', severity: 'yellow',
    title: 'Jornada no concretada',
    explanation: 'El contrato debe especificar el número exacto de horas semanales. Una jornada ambigua permite a la empresa exigir más horas de las pactadas.',
    keywords: ['jornada de trabajo', 'horas semanales', 'distribución del tiempo'],
  },
  {
    id: 'A3', severity: 'yellow',
    title: 'Vacaciones que pueden estar por debajo del mínimo',
    explanation: 'El mínimo legal son 30 días naturales de vacaciones anuales.',
    legalRef: 'ET art. 38',
    keywords: ['vacaciones anuales', 'días naturales', 'días hábiles'],
  },
  {
    id: 'A4', severity: 'yellow',
    title: 'Prórroga automática sin límite definido',
    explanation: 'Si el contrato se prorroga automáticamente sin indicar un límite máximo, se puede superar el tope legal de 1 año sin que el trabajador lo advierta.',
    keywords: ['prórroga automática', 'se prorrogará', 'renovación automática'],
  },
  {
    id: 'A5', severity: 'yellow',
    title: 'Confidencialidad con penalización económica',
    explanation: 'Es habitual incluir cláusulas de confidencialidad, pero son problemáticas si incluyen multas económicas o tienen duración indefinida.',
    keywords: ['confidencialidad', 'penalización de', 'indemnización por incumplimiento'],
  },
  {
    id: 'A6', severity: 'yellow',
    title: 'Plan Formativo Individual no mencionado',
    explanation: 'La Ley 32/2021 obliga a que este contrato incluya un Plan Formativo Individual con un tutor identificado. Si no aparece es un incumplimiento legal.',
    legalRef: 'ET art. 11.3 (Ley 32/2021)',
    keywords: ['plan formativo', 'actividades de tutoría', 'tutor asignado', 'tutor en la empresa'],
    absent: true,
  },
  {
    id: 'A7', severity: 'yellow',
    title: 'Cotización a la Seguridad Social no mencionada',
    explanation: 'Los contratos formativos post-2022 incluyen cotización obligatoria a la Seguridad Social. Si el contrato no lo refleja, puede ser que esté desactualizado o que la empresa no esté cumpliendo con esta obligación.',
    legalRef: 'RD-ley 2/2023, DA 52ª LGSS',
    keywords: ['seguridad social', 'cotización', 'contingencias', 'afiliación'],
    absent: true,
  },
  {
    id: 'S1', severity: 'weak',
    title: 'Certificado de prácticas no mencionado',
    explanation: 'Tienes derecho a recibir un certificado al finalizar que acredite el puesto, las tareas y las competencias adquiridas.',
    keywords: ['certificado', 'acreditación', 'informe de prácticas'],
    absent: true,
  },
  {
    id: 'S2', severity: 'weak',
    title: 'Teletrabajo mencionado sin acuerdo específico',
    explanation: 'El trabajo a distancia requiere un acuerdo firmado separado. Si solo se menciona en el contrato sin ese acuerdo, la situación es irregular.',
    keywords: ['trabajo a distancia', 'teletrabajo', 'modalidad híbrida'],
  },
  {
    id: 'S3', severity: 'weak',
    title: 'Funciones o tareas no descritas',
    explanation: 'El contrato debería describir las tareas concretas vinculadas a tu titulación. Sin descripción de funciones, la empresa puede asignarte trabajo no relacionado con tu formación.',
    keywords: ['funciones', 'tareas', 'actividades a realizar', 'descripción del puesto', 'objeto del contrato'],
    absent: true,
  },
];

// ─── REGLAS CONVENIOS NO LABORALES ──────────────────────────────────────────

const CONVENIO_NO_LABORAL_RULES: RulePattern[] = [
  {
    id: 'C1', severity: 'red',
    title: 'Jornada que puede superar el máximo legal',
    explanation: 'Aunque no es un contrato laboral, la jornada de las prácticas no puede superar las 40 horas semanales ni el horario del resto de trabajadores de la empresa.',
    legalRef: 'RD 592/2014, art. 9',
    keywords: ['jornada de', 'horas semanales', 'horario de prácticas'],
  },
  {
    id: 'C2', severity: 'red',
    title: 'Duración excesiva o sin límite claro',
    explanation: 'Las prácticas curriculares no pueden superar lo establecido en el plan de estudios. Las extracurriculares no pueden superar el 50% de la duración de los estudios.',
    legalRef: 'RD 592/2014, art. 9',
    keywords: ['duración de las prácticas', 'período de prácticas', 'se extenderá'],
  },
  {
    id: 'C3', severity: 'red',
    title: 'Posible renuncia a derechos básicos del becario',
    explanation: 'El convenio no puede eliminar tu derecho a tener tutor asignado, a recibir un certificado al finalizar ni a estar cubierto por un seguro de accidentes.',
    keywords: ['renuncia a', 'no tendrá derecho', 'queda excluido'],
  },
  {
    id: 'V1', severity: 'yellow',
    title: 'Tutores no identificados',
    explanation: 'El RD 592/2014 obliga a identificar un tutor académico y un tutor en la empresa. Si no aparecen nombrados en el convenio, es un incumplimiento.',
    legalRef: 'RD 592/2014, art. 10',
    keywords: ['tutor académico', 'tutor en la empresa', 'responsable de seguimiento', 'tutor laboral'],
  },
  {
    id: 'V2', severity: 'yellow',
    title: 'Compensación económica no especificada',
    explanation: 'Si existe compensación económica, debe estar claramente definida en el convenio (importe, forma de pago, periodicidad).',
    keywords: ['compensación económica', 'ayuda al estudio', 'bolsa de prácticas', 'remuneración'],
  },
  {
    id: 'V3', severity: 'yellow',
    title: 'Seguro de accidentes no mencionado',
    explanation: 'La empresa está obligada a tener al becario cubierto por un seguro de accidentes durante toda la duración de las prácticas. Si no aparece en el convenio, exige que se incluya.',
    legalRef: 'RD 592/2014, art. 9',
    keywords: ['seguro de accidentes', 'póliza de accidentes', 'cobertura de accidentes', 'seguro escolar'],
    absent: true,
  },
  {
    id: 'V4', severity: 'yellow',
    title: 'Propiedad intelectual de los trabajos a favor de la empresa',
    explanation: 'Muy habitual en diseño, marketing y desarrollo. Si el convenio dice que todo lo que crees durante las prácticas es propiedad de la empresa, es una cesión de derechos que puede perjudicarte.',
    keywords: ['propiedad intelectual', 'derechos de autor', 'cesión de derechos', 'los trabajos realizados serán propiedad'],
  },
  {
    id: 'A7', severity: 'yellow',
    title: 'Cotización a la Seguridad Social no mencionada',
    explanation: 'Desde el RD-ley 2/2023, los becarios en prácticas —incluso sin remuneración— cotizan obligatoriamente a la Seguridad Social. Si el convenio no lo menciona, verifica que la empresa esté cumpliendo esta obligación.',
    legalRef: 'RD-ley 2/2023, DA 52ª LGSS',
    keywords: ['seguridad social', 'cotización', 'contingencias', 'afiliación'],
    absent: true,
  },
  {
    id: 'S1', severity: 'weak',
    title: 'Certificado de prácticas no mencionado',
    explanation: 'Tienes derecho a recibir un certificado al finalizar que acredite las tareas realizadas y las competencias adquiridas. Si no aparece en el convenio, pídelo expresamente antes de firmar.',
    keywords: ['certificado', 'acreditación', 'informe final', 'informes que marca la normativa'],
    absent: true,
  },
  {
    id: 'S2', severity: 'weak',
    title: 'Teletrabajo mencionado sin acuerdo específico',
    explanation: 'Si el convenio menciona trabajo a distancia sin un acuerdo firmado que lo regule, la situación puede ser irregular.',
    keywords: ['trabajo a distancia', 'teletrabajo', 'modalidad híbrida'],
  },
  {
    id: 'S3', severity: 'weak',
    title: 'Funciones o tareas no descritas',
    explanation: 'El convenio debería indicar las actividades concretas que realizarás, vinculadas a tu titulación. Si no aparece ninguna descripción de tareas, la empresa puede asignarte cualquier trabajo sin relación con tus estudios.',
    keywords: ['funciones', 'tareas', 'actividades a realizar', 'descripción de las prácticas', 'proyecto formativo'],
    absent: true,
  },
];

// ─── FUNCIÓN PRINCIPAL ───────────────────────────────────────────────────────

export function classifyPages(pages: string[], documentType: DocumentType): RiskItem[] {
  const rules =
    documentType === 'convenio_no_laboral'
      ? CONVENIO_NO_LABORAL_RULES
      : documentType === 'contrato_pre2022'
        ? CONTRATO_PRE2022_RULES
        : CONTRATO_POST2022_RULES;

  const allItems: RiskItem[] = [];
  const seenIds = new Set<string>();

  // Reglas de presencia (por página)
  pages.forEach((pageText, pageIndex) => {
    const matches = findMatchesInPage(pageText, rules);
    for (const item of matches) {
      if (!seenIds.has(item.id)) {
        seenIds.add(item.id);
        allItems.push({ ...item, page: pageIndex + 1 });
      }
    }
  });

  // Reglas de ausencia (sobre el documento completo)
  const fullText = pages.join('\n');
  const absenceMatches = findAbsenceMatches(fullText, rules);
  for (const item of absenceMatches) {
    if (!seenIds.has(item.id)) {
      seenIds.add(item.id);
      allItems.push(item);
    }
  }

  // Orden: rojo → amarillo → azul
  const order = { red: 0, yellow: 1, weak: 2 };
  return allItems.sort((a, b) => order[a.severity] - order[b.severity]);
}