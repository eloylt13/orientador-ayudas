CONTEXT.md — Revisor de Contratos de Prácticas
Última actualización: 12 marzo 2026
Descripción del proyecto
Herramienta web que analiza contratos y convenios de prácticas en PDF y detecta cláusulas abusivas o ilegales. Dirigida a estudiantes universitarios, FP y recién titulados en España.
Stack: Next.js + TypeScript + Tailwind + unpdf + Vercel
Diferencia clave: Los contratos de prácticas SÍ están regulados por ley. Se puede decir "esto es ilegal" cuando corresponda.

URLs y repositorio

Producción: https://revisor-contrato-practicas.vercel.app
GitHub: https://github.com/eloylt13/revisor-contrato-practicas.git
Ruta local: C:\Users\eloyl\OneDrive\Escritorio\Revisor-Contrato-Practicas\web
Comando dev: cd web && npm.cmd run dev

⚠️ El git repo raíz está en C:\Users\eloyl\OneDrive\Escritorio (nivel Escritorio).
Los push siempre desde ahí:
powershellcd C:\Users\eloyl\OneDrive\Escritorio
git add Revisor-Contrato-Practicas/web/...
git commit -m "mensaje"
git push

Tres tipos de documento detectados
TipoLabel en UINormativaconvenio_no_laboralConvenio de prácticas no laboralesRD 592/2014 / RD 1493/2011contrato_pre2022Contrato en prácticas · anterior a la Ley 32/2021ET art. 11.1 anteriorcontrato_post2022Contrato formativo · Ley 32/2021ET art. 11.3, Ley 32/2021documento_informativoDocumento informativo— detectado y descartado sin analizar

Estructura de archivos
web/
  app/
    layout.tsx
    page.tsx
    api/analyze/route.ts
    globals.css
    robots.ts / sitemap.ts
  components/
    ResultsPanel.tsx
  lib/
    pdf/extract.ts
    analysis/detect.ts
    analysis/classify.ts       ← motor de reglas principal
  types/
    risk.ts
  next.config.mjs              ← serverExternalPackages en raíz, NO en experimental

Diseño visual (rediseño v2)

Header degradado oscuro #12112A → #2A1F3D
Fondo crema cálido #F2EDE3
Tipografía: Playfair Display (serif) para títulos y contadores + DM Sans para texto
Todo con style={{}} inline para evitar conflictos con Tailwind
Emojis en badges: 🔴 rojo / 🟡 amarillo / 🔵 azul
Panel naranja especial para documento_informativo


Motor de reglas — estado actual (classify.ts)
Arquitectura

RulePattern con propiedad absent?: boolean
Reglas normales: disparan cuando la keyword aparece (por página)
Reglas absent: true: disparan cuando la keyword no aparece (sobre documento completo)
findMatchesInPage() — reglas de presencia
findAbsenceMatches() — reglas de ausencia
Orden final: rojo → amarillo → azul

Reglas implementadas — CONTRATO_PRE2022
IDSevTipoDescripciónR1🔴presenciaPeríodo de prueba posiblemente excesivoR2🔴presenciaDuración que puede superar el máximo legalR3🔴presenciaRetribución por debajo del mínimo (60/75% convenio)R4🔴presenciaCláusula de exclusividad sin compensaciónR5🔴presenciaHoras extraordinarias mencionadas (ilegales)A1🟡presenciaConvenio colectivo no especificadoA2🟡presenciaJornada no concretadaA3🟡presenciaVacaciones por debajo del mínimoA4🟡presenciaPrórroga automática sin límiteA5🟡presenciaConfidencialidad con penalización económicaA7🟡ausenciaCotización a la SS no mencionada (RD-ley 2/2023)S1🔵ausenciaCertificado de prácticas no mencionadoS2🔵presenciaTeletrabajo sin acuerdo específicoS3🔵ausenciaFunciones o tareas no descritas
Reglas implementadas — CONTRATO_POST2022
Igual que PRE2022 más:
| A6 | 🟡 | ausencia | Plan Formativo Individual no mencionado (Ley 32/2021) |
Reglas implementadas — CONVENIO_NO_LABORAL
IDSevTipoDescripciónC1🔴presenciaJornada superior a 40h semanalesC2🔴presenciaDuración excesiva o sin límite claroC3🔴presenciaRenuncia a derechos básicos del becarioV1🟡presenciaTutores no identificadosV2🟡presenciaCompensación económica no especificadaV3🟡ausenciaSeguro de accidentes no mencionadoV4🟡presenciaPropiedad intelectual a favor de la empresaA7🟡ausenciaCotización a la SS no mencionadaS1🔵ausenciaCertificado de prácticas no mencionadoS2🔵presenciaTeletrabajo sin acuerdo específicoS3🔵ausenciaFunciones o tareas no descritas

Keywords clave — notas técnicas
R1 (período de prueba) — keywords específicas para evitar falsos positivos con notas al pie del SEPE:
'se establece un período de prueba', 'período de prueba de', 'periodo de prueba de', 'se fija un período de prueba'
⚠️ NO usar 'periodo de prueba' solo — coincide con notas legales del reverso de la plantilla Mod. PE-176.
R2 (duración) — keywords específicas:
'duración del presente contrato', 'se extenderá desde', 'la duración será de'
⚠️ NO usar 'duración del contrato' solo — coincide con nota al pie (11) del SEPE.

Pruebas realizadas con PDFs reales ✅
PDFTipo detectadoResultadoConvenio UPV (plantilla vacía)convenio_no_laboral0 rojos + 2 amarillos (V1 tutores, V2 compensación) ✅Mod. PE-176 SEPE (plantilla vacía)contrato_pre20223 rojos (R1, R2, R3) + 3 amarillos (A1, A2, A3) ✅Folleto SEPE sept. 2019documento_informativoPanel naranja, sin falsos positivos ✅

Commits relevantes
HashDescripción821a0d4Rediseño v2: header oscuro, emojis, Playfair Display, inline styles1604af7Rediseño: estética editorial19ac008Fix: serverExternalPackages fuera de experimentalfad0f15Fix: next.config.ts → next.config.mjs723403dMotor: añadir R5 horas extra, A7 cotización SS, S3 funciones no descritas723403dMotor: añadir R5 horas extra, A7 cotización SS, S3 funciones no descritas2e8981dFix: keywords R1/R2 más específicas para evitar falsos positivos en notas al pie68938a9SEO: metadata Open Graph, JSON-LD, FAQ y sección de contenidoe6a4877SEO: añadir verificación Google Search ConsoleúltimoAnalytics: añadir Vercel Analytics

SEO — estado actual ✅

layout.tsx con metadata completa: title, description, keywords, Open Graph, Twitter card, canonical URL, robots, verificación Google
sitemap.ts corregido apuntando a URL correcta
page.tsx con sección "¿Qué detecta?" + FAQ de 5 preguntas + JSON-LD schema.org WebApplication
Google Search Console verificado y sitemap enviado
Vercel Analytics activado (plan Hobby, gratis, 50k eventos/mes)


Próximos pasos

 Difusión manual: compartir en Reddit (r/Estudiantes, r/trabajoES, r/FP), foros universitarios, grupos Telegram
 Página de resultados: botón "¿Qué hago ahora?" con recursos (ITSS, sindicatos) cuando salen rojos
 Ampliar Analytics al resto de proyectos (revisor-lau, revisor-habitacion, analizador-alquiler) — mismo proceso: npm install + layout.tsx + Enable en Vercel
 Ampliar motor con más reglas si llega feedback de usuarios


Notas técnicas

Windows: usar npm.cmd en lugar de npm en PowerShell
Warnings LF will be replaced by CRLF en git son inofensivos
Warnings Unknown at rule @tailwind en VSCode son inofensivos
serverExternalPackages: ["unpdf"] va en la raíz de next.config.mjs, NO dentro de experimental
El push desde Revisor-Contrato-Practicas/ NO sube a GitHub — siempre desde Escritorio