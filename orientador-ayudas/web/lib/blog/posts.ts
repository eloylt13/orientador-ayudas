export interface BlogPost {
  slug: string
  titulo: string
  descripcion: string
  fecha: string
  ultimaRevision: string
  contenido: string
}

const imv2026Contenido = String.raw`
  <p>El Ingreso Mínimo Vital, conocido como IMV, sigue siendo en 2026 una de las prestaciones estatales más relevantes para hogares con rentas bajas. Su finalidad es garantizar un suelo mínimo de ingresos cuando una persona que vive sola o una unidad de convivencia no alcanza unos recursos suficientes para cubrir necesidades básicas. No es una ayuda puntual, sino una prestación económica de la Seguridad Social regulada por la <strong>Ley 19/2021, de 20 de diciembre</strong>, y se mantiene mientras persistan los requisitos.</p>
  <p>En la práctica, el IMV funciona como una prestación diferencial: la Seguridad Social compara la renta garantizada que corresponde a tu hogar con los ingresos computables del ejercicio de referencia y, si existe diferencia a tu favor, abona esa cuantía. Por eso no hay un importe único para todas las personas. La cuantía depende del tamaño y composición del hogar, de si existe discapacidad reconocida y de si ya entran otros ingresos o prestaciones. Entender bien los requisitos es importante, porque muchos expedientes se retrasan por errores en la documentación, dudas sobre la unidad de convivencia o por no revisar correctamente ingresos y patrimonio.</p>

  <h2>Qué es el IMV</h2>
  <p>El IMV es una prestación no contributiva integrada en la acción protectora de la Seguridad Social. Está pensada para prevenir el riesgo de pobreza y exclusión social. A diferencia del paro contributivo, no exige haber cotizado un periodo mínimo por desempleo, sino acreditar vulnerabilidad económica y cumplir condiciones personales y de residencia.</p>
  <p>La norma de referencia es la Ley 19/2021. Esa ley define quién puede ser beneficiario, cómo se calcula la unidad de convivencia, qué rentas se computan, cómo se analiza el patrimonio y cuáles son las obligaciones posteriores al reconocimiento. También deja claro que el IMV puede convivir con trabajo por cuenta ajena o por cuenta propia en determinados supuestos, siempre dentro de los límites y reglas de compatibilidad fijados por la Seguridad Social.</p>
  <p>Además, el IMV puede incluir el complemento de ayuda para la infancia cuando en la unidad de convivencia hay menores y se cumplen sus requisitos específicos. Aunque muchas personas hablan del IMV como una ayuda cerrada, en realidad es una estructura de protección más amplia en la que la composición familiar y los ingresos reales del hogar son determinantes.</p>

  <h2>Quién puede solicitarlo en 2026</h2>
  <p>Puede solicitarlo una persona sola o una unidad de convivencia que resida legal y efectivamente en España y se encuentre en situación de vulnerabilidad económica. En 2026 conviene revisar cuatro bloques: edad, residencia, ingresos y patrimonio.</p>
  <h3>Requisitos de edad</h3>
  <p>Con carácter general, la persona beneficiaria individual debe tener al menos 23 años y menos de la edad ordinaria de jubilación, salvo que tenga menores a cargo o concurran supuestos específicos contemplados por la ley. Cuando se solicita como unidad de convivencia, la persona titular debe ser mayor de edad o menor emancipado, y debe poder acreditar la composición del hogar conforme a los criterios legales.</p>
  <h3>Residencia legal y efectiva</h3>
  <p>La regla general es haber residido legalmente y de forma efectiva en España de manera continuada durante al menos un año antes de la solicitud. Hay excepciones legales para víctimas de violencia de género, trata de seres humanos y explotación sexual, entre otros supuestos protegidos. Además, la Seguridad Social revisa el empadronamiento y la composición de la unidad de convivencia, por lo que es clave que los datos del padrón estén actualizados.</p>
  <h3>Requisito de ingresos</h3>
  <p>La Seguridad Social considera que existe vulnerabilidad económica cuando el promedio mensual de ingresos computables del ejercicio anterior es inferior, al menos en 10 euros, a la renta garantizada que corresponda. En 2026, las referencias más consultadas son estas:</p>
  <ul>
    <li><strong>733,60 euros al mes</strong> para una persona adulta sola.</li>
    <li><strong>953,68 euros al mes</strong> para una unidad formada por dos adultos o por un adulto y un menor.</li>
    <li><strong>1.173,76 euros al mes</strong> para una unidad formada por dos adultos y un menor, por un adulto y dos menores o por tres adultos.</li>
  </ul>
  <p>Es importante detenerse aquí porque en internet circulan tablas redondeadas o desactualizadas. Para marzo de 2026, la referencia oficial de la Seguridad Social para el tercer supuesto es <strong>1.173,76 euros</strong>, no 1.174,20 euros. El derecho se calcula siempre comparando esa renta garantizada con las rentas efectivamente computables de la persona o del hogar.</p>
  <h3>Requisito de patrimonio</h3>
  <p>No basta con tener ingresos bajos. También hay que respetar los límites de patrimonio neto, excluida la vivienda habitual. Para una persona beneficiaria individual, en 2026 la Seguridad Social sitúa el umbral de exclusión en <strong>26.409,60 euros</strong>. En unidades de convivencia el límite aumenta según el número y la configuración de miembros, aplicando la escala legal prevista en los anexos de la Ley 19/2021. Además, existen límites específicos sobre activos no societarios y también quedan excluidos ciertos supuestos, como la presencia de administradores de derecho de sociedades mercantiles no cesadas en la actividad.</p>

  <h2>Cuánto se cobra</h2>
  <p>La cuantía del IMV no es fija. Se cobra la diferencia entre la renta garantizada del hogar y los ingresos computables. Si una persona sola tiene derecho a una renta garantizada de 733,60 euros al mes y acredita ingresos mensuales computables por valor de 300 euros, la prestación teórica sería de 433,60 euros mensuales. Si la diferencia resultante es inferior al mínimo legal exigido, no se reconoce prestación.</p>
  <p>En unidades de convivencia el mecanismo es el mismo. Por ejemplo, si una pareja con un menor tiene como referencia 1.173,76 euros y el conjunto de ingresos computables asciende a 700 euros, la cuantía teórica del IMV sería de 473,76 euros al mes. Esta cifra puede variar si existen rentas no periódicas, prestaciones compatibles o revisiones posteriores de datos fiscales y patrimoniales.</p>
  <p>También hay que recordar que la cuantía puede modificarse durante la vida de la prestación si cambia el número de convivientes, el domicilio, la composición familiar, los ingresos o el patrimonio. La obligación de comunicar cambios dentro de plazo es esencial para evitar cobros indebidos, suspensiones o reintegros.</p>

  <h2>Qué documentación se pide</h2>
  <p>La Seguridad Social cruza una parte relevante de la información de oficio, pero sigue siendo habitual que solicite documentación complementaria. Lo normal es preparar con antelación:</p>
  <ul>
    <li>Documento de identidad en vigor de la persona solicitante y, en su caso, de los demás miembros de la unidad de convivencia.</li>
    <li>Certificado o volante de empadronamiento colectivo actualizado.</li>
    <li>Libro de familia, certificación registral o documentación equivalente para acreditar vínculos familiares.</li>
    <li>Documentos que acrediten separación, guarda, custodia o convivencia cuando proceda.</li>
    <li>Información bancaria para el abono de la prestación.</li>
    <li>En supuestos específicos, certificados de servicios sociales o de entidades mediadoras, especialmente cuando la situación personal encaja en una excepción legal.</li>
  </ul>
  <p>La propia solicitud oficial del IMV recuerda que el DNI o NIE debe estar en vigor y que determinados extremos pueden requerir prueba adicional. Si la Administración ya dispone de los datos, no siempre exige aportarlos de nuevo, pero conviene tenerlos localizados para responder rápidamente a cualquier requerimiento.</p>

  <h2>Cómo solicitarlo</h2>
  <p>La vía más directa es la plataforma oficial del IMV en <a href="https://imv.seg-social.es" target="_blank" rel="noreferrer">imv.seg-social.es</a>. Desde ahí puede iniciarse la solicitud con identificación electrónica o, en determinados casos, mediante formularios habilitados por la Seguridad Social. También existe la posibilidad de descargar el formulario oficial y presentarlo por otros canales admitidos, como CAISS o correo ordinario, cuando la normativa y el procedimiento vigente lo permiten.</p>
  <p>Antes de enviar la solicitud, revisa especialmente estos puntos: datos de empadronamiento, número de miembros del hogar, fecha desde la que conviven, ingresos del ejercicio de referencia, cuenta bancaria y coincidencia entre la documentación adjunta y lo declarado. Buena parte de los retrasos vienen de inconsistencias entre padrón, libro de familia y la composición de la unidad de convivencia reflejada en la solicitud.</p>
  <p>Una vez presentada, la Seguridad Social puede pedir subsanación o documentación adicional. Si recibes un requerimiento, conviene responder dentro del plazo indicado y guardar justificante. Aunque el procedimiento sea telemático, es recomendable descargar o conservar copia de la solicitud presentada y de todos los anexos.</p>

  <h2>Preguntas frecuentes</h2>
  <h3>¿Se puede cobrar el IMV y trabajar?</h3>
  <p>Sí, en determinados supuestos el IMV es compatible con rentas del trabajo o de actividad económica. La compatibilidad no significa que no cuenten esos ingresos, sino que la Seguridad Social aplica sus reglas y límites para evitar que la incorporación al empleo suponga una pérdida automática de protección.</p>
  <h3>¿Cuenta la vivienda habitual como patrimonio?</h3>
  <p>No, la vivienda habitual queda excluida del cómputo del patrimonio neto a estos efectos. Lo que sí se analiza son otros bienes, saldos, activos e inversiones, además de los límites especiales sobre activos no societarios.</p>
  <h3>¿Hace falta haber cotizado para pedir el IMV?</h3>
  <p>No. A diferencia de la prestación contributiva por desempleo, el IMV no exige un periodo mínimo de cotización por desempleo. Lo esencial es acreditar residencia, composición familiar y vulnerabilidad económica conforme a la Ley 19/2021.</p>
  <h3>¿Qué pasa si cambia mi situación familiar o económica?</h3>
  <p>Debes comunicar el cambio a la Seguridad Social. Las variaciones en ingresos, patrimonio, domicilio o composición de la unidad de convivencia pueden afectar a la cuantía o incluso al mantenimiento del derecho.</p>
  <h3>¿Dónde se solicita oficialmente?</h3>
  <p>En la vía oficial de la Seguridad Social, especialmente a través de <a href="https://imv.seg-social.es" target="_blank" rel="noreferrer">imv.seg-social.es</a> y del portal de prestaciones de la Seguridad Social. Conviene desconfiar de gestores no oficiales que prometen concesiones rápidas o pagos garantizados.</p>
`
const contributivaContenido = String.raw`
  <p>La prestación contributiva por desempleo es la ayuda que protege a quienes pierden su trabajo de forma involuntaria después de haber cotizado lo suficiente. En lenguaje cotidiano se la sigue llamando paro, pero jurídicamente es una prestación de nivel contributivo regulada en la <strong>Ley General de la Seguridad Social, artículos 263 a 278</strong>. En 2026 continúa siendo la cobertura principal para personas que se quedan en desempleo tras un despido, un fin de contrato temporal o determinadas situaciones equiparadas.</p>
  <p>Muchas personas buscan una respuesta rápida a tres preguntas: si tienen derecho, cuánto van a cobrar y cómo deben pedirla en el SEPE. Sin embargo, el análisis real exige revisar varios elementos a la vez: las cotizaciones por desempleo acumuladas, la causa de la extinción del contrato, la inscripción como demandante de empleo, la base reguladora y el plazo de solicitud. Entender cada paso es importante porque una diferencia aparentemente pequeña, como una baja voluntaria previa o un certificado de empresa incorrecto, puede cambiar por completo el resultado.</p>

  <h2>Qué es la prestación contributiva por desempleo</h2>
  <p>La prestación contributiva por desempleo es una ayuda económica temporal financiada con las cotizaciones efectuadas por la persona trabajadora y por la empresa durante la relación laboral. No se concede por simple necesidad económica, sino porque existe una protección construida a partir de cotizaciones previas. Por eso se llama contributiva. A diferencia de los subsidios asistenciales, aquí el eje central no es la carencia de rentas, sino haber generado derecho a través de la cotización y encontrarse en situación legal de desempleo.</p>
  <p>Su finalidad es sustituir de forma parcial el salario perdido cuando el empleo termina por una causa involuntaria. Esa sustitución no es indefinida y tampoco mantiene el 100 % del sueldo previo. El sistema toma como referencia las bases de cotización recientes y aplica porcentajes legales durante un tiempo determinado. Mientras se percibe la prestación, además, el SEPE ingresa determinadas cotizaciones a la Seguridad Social, lo que explica por qué esta ayuda tiene una importancia muy superior a la de otras coberturas asistenciales.</p>
  <p>La base legal principal está en los <strong>artículos 263 a 278 de la LGSS</strong>. Ahí se regulan los requisitos de acceso, las situaciones legales de desempleo, la duración, la cuantía, la solicitud, la suspensión y la extinción del derecho. Aunque en muchos portales privados se simplifique el tema, conviene recordar que el reconocimiento oficial siempre depende del SEPE y de la información que conste en sus bases de datos y en la documentación aportada.</p>

  <h2>Requisitos para cobrarla en 2026</h2>
  <p>En 2026, los tres requisitos que más se consultan siguen siendo los mismos: tener al menos <strong>360 días cotizados en los últimos 6 años</strong>, haber perdido el empleo de forma involuntaria y estar inscrito o inscrita como demandante de empleo. Pero junto a ellos hay otros matices que conviene revisar.</p>
  <ul>
    <li><strong>Haber cotizado 360 días o más</strong> por desempleo dentro de los seis años anteriores a la situación legal de desempleo o al momento en que cesó la obligación de cotizar.</li>
    <li><strong>Estar en situación legal de desempleo</strong>, lo que normalmente implica despido, fin de contrato temporal o extinciones válidas a efectos del SEPE.</li>
    <li><strong>No haber cesado voluntariamente</strong> sin una causa posterior que genere una nueva situación legal de desempleo.</li>
    <li><strong>Inscribirse como demandante de empleo</strong> y mantener esa inscripción.</li>
    <li><strong>No haber alcanzado la edad ordinaria de jubilación</strong>, salvo que no se tenga derecho a pensión contributiva.</li>
    <li><strong>No realizar una actividad incompatible</strong> con el cobro de la prestación.</li>
  </ul>
  <p>El requisito de los 360 días genera muchas confusiones. No basta con haber trabajado durante un año natural si parte de ese tiempo no cotizó por desempleo o si ya se consumieron cotizaciones en una prestación anterior. Lo que cuenta es el número de días efectivamente cotizados y disponibles para generar este derecho concreto.</p>
  <p>También es fundamental la <strong>situación legal de desempleo</strong>. La prestación no nace por cualquier salida del trabajo. Si la relación terminó por baja voluntaria, el derecho no surge de inmediato. El ejemplo típico es el de una persona que renuncia y, días después, descubre que no puede pedir el paro aunque tuviera años cotizados. Para reactivar la protección suele ser necesario que exista una nueva situación legal de desempleo posterior y válida.</p>
  <p>La inscripción como demandante de empleo es el tercer pilar. Aunque muchas personas hablan de “apuntarse al paro”, jurídicamente significa inscribirse y cumplir el compromiso de actividad. Si no se hace ese paso, la solicitud puede quedar incompleta o ser denegada. Por eso conviene revisar siempre primero el trámite autonómico de demanda de empleo y luego la prestación estatal del SEPE.</p>

  <h2>Cómo se calcula el importe</h2>
  <p>La cuantía de la prestación contributiva se calcula sobre la <strong>base reguladora</strong>, que deriva de las bases de cotización por desempleo de los últimos 180 días cotizados. Una vez obtenida esa base reguladora, se aplican los porcentajes fijados por la ley. La regla oficial que publica el SEPE para marzo de 2026 es esta: <strong>70 % de la base reguladora durante los primeros 180 días y 60 % a partir del día 181</strong>.</p>
  <p>Aquí conviene hacer una precisión importante: en tu instrucción aparecía un 50 % para el periodo posterior, pero la documentación oficial consultada del SEPE sigue indicando <strong>60 %</strong>. Por eso he dejado el artículo ajustado al criterio oficial vigente y no a la cifra del 50 %, para evitar un contenido SEO materialmente incorrecto.</p>
  <p>Un ejemplo sencillo ayuda a entenderlo. Si la base reguladora mensual equivalente fuera de 1.200 euros, durante los primeros 180 días la cuantía teórica sería 840 euros. Desde el día 181, la cuantía teórica pasaría a 720 euros. Aun así, el importe final puede verse afectado por los topes mínimos y máximos legales, por la existencia o no de hijos a cargo y por la parcialidad del último empleo.</p>
  <p>Esto significa que dos personas con el mismo número de días cotizados no necesariamente cobran lo mismo. Una puede haber cotizado sobre bases más altas y otra sobre bases más bajas. Además, el SEPE toma en cuenta si el desempleo procede de un trabajo a tiempo parcial, porque eso puede influir en los límites aplicables. La prestación se abona por mensualidades de 30 días, normalmente a mes vencido.</p>

  <h2>Duración según días cotizados</h2>
  <p>La duración no es libre ni fija. Depende de una escala legal vinculada al total de días cotizados no consumidos. Los tramos más importantes son los siguientes:</p>
  <ul>
    <li>De 360 a 539 días cotizados: <strong>120 días</strong> de prestación.</li>
    <li>De 540 a 719 días: <strong>180 días</strong>.</li>
    <li>De 720 a 899 días: <strong>240 días</strong>.</li>
    <li>De 900 a 1.079 días: <strong>300 días</strong>.</li>
    <li>De 1.080 a 1.259 días: <strong>360 días</strong>.</li>
    <li>De 1.260 a 1.439 días: <strong>420 días</strong>.</li>
    <li>De 1.440 a 1.619 días: <strong>480 días</strong>.</li>
    <li>De 1.620 a 1.799 días: <strong>540 días</strong>.</li>
    <li>De 1.800 a 1.979 días: <strong>600 días</strong>.</li>
    <li>De 1.980 a 2.159 días: <strong>660 días</strong>.</li>
    <li>Desde 2.160 días o más: <strong>720 días</strong>, que es el máximo.</li>
  </ul>
  <p>Antes de solicitar, conviene revisar bien la vida laboral y comprobar si ya se gastó una parte de esas cotizaciones en una prestación anterior. Si ya fueron utilizadas para generar otro derecho, no vuelven a contar. Este detalle explica muchas diferencias entre el cálculo que hace una persona “a ojo” y el resultado real del SEPE.</p>

  <h2>Documentación necesaria</h2>
  <p>La documentación puede variar según el caso, pero la base suele incluir estos elementos:</p>
  <ul>
    <li>Modelo oficial de solicitud de la prestación contributiva.</li>
    <li>DNI, NIE o documento identificativo equivalente en vigor.</li>
    <li>Libro de familia o documento equivalente si se declaran hijos a cargo.</li>
    <li>Certificado de empresa, cuando no conste correctamente transmitido al SEPE.</li>
    <li>Documentación adicional en supuestos especiales: resoluciones judiciales, comunicaciones empresariales, acreditación de pérdida de empleo parcial o incidencias en cotizaciones.</li>
  </ul>
  <p>En muchos casos la empresa remite el certificado de empresa por vía telemática, pero no conviene darlo por supuesto. Si ese dato no llega bien, la solicitud puede quedar bloqueada. También es recomendable guardar justificante de inscripción como demandante de empleo y copia del trámite presentado.</p>

  <h2>Cómo solicitarla</h2>
  <p>La vía oficial es la <a href="https://sede.sepe.gob.es" target="_blank" rel="noreferrer">sede electrónica del SEPE</a>. Desde allí puede iniciarse la solicitud con certificado digital, DNI electrónico o Cl@ve, además de otras vías que el organismo habilite en cada momento. También puede presentarse en oficina de prestaciones con cita previa o por otros registros admitidos, pero la sede electrónica suele ser el canal más rápido si la persona ya está identificada digitalmente.</p>
  <p>Lo ideal es no esperar al último día. La solicitud debe presentarse dentro del plazo legal y es importante que antes se haya producido la inscripción como demandante de empleo. Un error frecuente es intentar tramitar la prestación sin revisar si el despido consta bien, si el contrato figura extinguido o si el certificado de empresa ya está cargado en el sistema.</p>
  <p>Tras la presentación, el SEPE puede reconocer directamente el derecho o requerir subsanación. Si llega un requerimiento, conviene responder dentro del plazo indicado y con documentación legible. Guardar justificantes es esencial, sobre todo si más adelante hay que acreditar la fecha de presentación o combatir una denegación.</p>

  <h2>Preguntas frecuentes</h2>
  <h3>¿Hace falta un año exacto trabajado?</h3>
  <p>No exactamente. Lo que exige la LGSS son 360 días cotizados por desempleo en el periodo de referencia. Puede haber contratos parciales, interrupciones o periodos no computables.</p>
  <h3>¿Si me despiden después de una baja voluntaria anterior puedo cobrar?</h3>
  <p>Depende del caso. El SEPE analizará si existe una nueva situación legal de desempleo real y suficiente para abrir el derecho. No siempre basta con cualquier contrato muy breve posterior.</p>
  <h3>¿Qué porcentaje se cobra después del día 180?</h3>
  <p>Según la información oficial del SEPE consultada en marzo de 2026, el porcentaje es el <strong>60 %</strong> de la base reguladora desde el día 181, no el 50 %.</p>
  <h3>¿Dónde se tramita oficialmente?</h3>
  <p>En la <a href="https://sede.sepe.gob.es" target="_blank" rel="noreferrer">sede.sepe.gob.es</a> y por los canales oficiales del SEPE.</p>
`
const subsidioCotizacionesInsuficientesContenido = String.raw`
  <p>El subsidio por desempleo con cotizaciones insuficientes está pensado para personas que han trabajado menos de lo necesario para acceder a la prestación contributiva, pero aun así han cotizado un mínimo que les permite acceder a una ayuda asistencial. En 2026 sigue siendo una cobertura muy relevante para quienes han encadenado contratos temporales, trabajos estacionales o periodos cortos de empleo y, al quedarse en paro, descubren que no llegan a los 360 días exigidos para cobrar la prestación contributiva.</p>
  <p>La idea central es sencilla: si te han despedido o tu contrato ha terminado de forma involuntaria y has cotizado <strong>entre 90 y 359 días</strong>, puedes estar dentro del supuesto legal del subsidio por cotizaciones insuficientes. Sin embargo, en la práctica el SEPE no solo mira esos días cotizados. También revisa la situación legal de desempleo, la inscripción como demandante de empleo, las rentas y, en algunos casos, si existen responsabilidades familiares. Por eso conviene entender bien la diferencia con el paro contributivo y los requisitos concretos antes de iniciar el trámite.</p>

  <h2>Qué es el subsidio por cotizaciones insuficientes</h2>
  <p>Es un subsidio asistencial regulado en la <strong>Ley General de la Seguridad Social, artículos 274 a 277 bis</strong>, para personas desempleadas que no alcanzan el periodo mínimo de cotización exigido para la prestación contributiva. Su finalidad es ofrecer una cobertura temporal a quien ha generado cierta vinculación con el mercado laboral, pero no la suficiente para entrar en el nivel contributivo.</p>
  <p>No debe confundirse con una ayuda automática por haber trabajado unos meses. El subsidio exige, además de cotización, que exista situación legal de desempleo y que la persona solicitante mantenga la inscripción como demandante de empleo. También se revisa la carencia de rentas según el límite legal vigente. Por tanto, no es un mero cálculo matemático de días trabajados, sino una ayuda asistencial condicionada.</p>

  <h2>Diferencia con la prestación contributiva</h2>
  <p>La diferencia principal con la prestación contributiva está en el origen del derecho. En el paro contributivo se exige haber cotizado al menos 360 días y la cuantía se calcula sobre la base reguladora. En el subsidio por cotizaciones insuficientes, en cambio, la persona no llega a ese mínimo y por eso accede a una ayuda asistencial con cuantía fija o cuasi fija, no ligada directamente a su base de cotización.</p>
  <p>Otra diferencia importante es la duración. Mientras la prestación contributiva puede llegar hasta 720 días si existen suficientes cotizaciones, este subsidio tiene una duración mucho más limitada. Además, el análisis de rentas adquiere mayor relevancia en el subsidio. Por eso dos personas con el mismo número de días trabajados pueden acabar en regímenes completamente distintos según lleguen o no al umbral de 360 días y según cumplan el resto de requisitos.</p>

  <h2>Requisitos para pedirlo en 2026</h2>
  <p>Los requisitos que más se consultan en 2026 son estos:</p>
  <ul>
    <li>Haber cotizado por desempleo <strong>entre 90 y 359 días</strong> y no tener cubierto el mínimo de 360 días para acceder a la prestación contributiva.</li>
    <li>Estar en <strong>situación legal de desempleo</strong>, normalmente por despido, fin de contrato temporal o causa involuntaria equivalente.</li>
    <li>Estar <strong>inscrito o inscrita como demandante de empleo</strong> y mantener esa inscripción.</li>
    <li>No rechazar ofertas de empleo adecuadas ni incumplir el compromiso de actividad.</li>
    <li>Tener <strong>ingresos inferiores al 75 % del SMI</strong>. Si se toma como referencia el dato que me has pedido para 2026, ese límite sería <strong>915,75 euros al mes</strong>.</li>
  </ul>
  <p>Aquí hay una matización importante de actualidad. La página oficial del SEPE consultada recientemente sigue mostrando importes y referencias previas en algunos apartados, por lo que en el artículo he incorporado el umbral de <strong>915,75 euros al mes</strong> porque es el que me has pedido expresamente para 2026, pero conviene comprobar en la sede oficial qué cifra aplica exactamente el día de la solicitud si el SEPE todavía no hubiera actualizado todos sus materiales públicos.</p>
  <p>También es importante recordar que la causa del desempleo debe ser involuntaria. Igual que ocurre con la prestación contributiva, una baja voluntaria no abre por sí sola el derecho. El SEPE revisará que exista una verdadera situación legal de desempleo y que las cotizaciones utilizadas no hayan sido ya consumidas para generar otro derecho anterior.</p>

  <h2>Importe</h2>
  <p>Conforme a la cifra que me has pedido para este contenido SEO, el subsidio se presenta con un importe de <strong>480 euros al mes</strong>. En la práctica, el subsidio por desempleo se vincula legalmente a un porcentaje del IPREM, por lo que el importe exacto puede depender del dato anual vigente y de reformas recientes. Por eso, al igual que con el límite de rentas, conviene usar siempre la sede oficial como contraste final antes de presentar la solicitud.</p>
  <p>La ventaja de esta ayuda es su previsibilidad: la persona no necesita calcular una base reguladora como ocurre con el paro contributivo. La desventaja es que la cuantía es significativamente más baja y la duración más corta. Aun así, para alguien que ha trabajado pocos meses y se queda sin ingresos, estos importes pueden ser una cobertura puente muy relevante hasta encontrar un nuevo empleo o generar más cotización.</p>

  <h2>Duración</h2>
  <p>La duración depende del tiempo cotizado y de la situación concreta. En la versión simplificada que me has pedido, el artículo se centra en la idea de <strong>3 o 6 meses según los casos</strong>, que es la forma más directa de explicarlo a nivel divulgativo. En términos prácticos, el subsidio puede reconocerse por periodos diferentes según los días cotizados y la existencia de responsabilidades familiares, por lo que conviene revisar el detalle exacto del expediente cuando se prepare la solicitud.</p>
  <p>Como orientación clara, muchas personas se encuentran en dos escenarios: o bien acceden a un periodo corto de tres meses cuando la cotización es la mínima que abre la puerta al subsidio, o bien alcanzan una duración de seis meses cuando han cotizado más o concurren circunstancias que amplían el tiempo de cobertura. Si el objetivo del artículo es resolver búsquedas rápidas, esa distinción de 3 o 6 meses cumple bien esa función, aunque jurídicamente el cuadro completo del SEPE puede ser más detallado.</p>

  <h2>Documentación</h2>
  <p>La documentación habitual gira en torno a la identificación, la acreditación de la situación legal de desempleo y la solicitud oficial. Lo normal es preparar:</p>
  <ul>
    <li>Modelo oficial de solicitud del subsidio.</li>
    <li>DNI, NIE o documento identificativo en vigor.</li>
    <li>Libro de familia o documento equivalente si el caso requiere acreditar responsabilidades familiares.</li>
    <li>Certificado de empresa o comprobación de que ya consta correctamente en los sistemas del SEPE.</li>
    <li>Documentación relativa a rentas, cuando el organismo la solicite o sea necesaria para verificar el requisito económico.</li>
  </ul>
  <p>Es habitual que el certificado de empresa se remita por vía telemática, pero si hay incidencias o faltan datos, el expediente puede quedar paralizado. También es recomendable guardar justificante de la demanda de empleo y del registro de la solicitud. Una presentación limpia y bien documentada reduce mucho los requerimientos posteriores.</p>

  <h2>Cómo solicitarlo</h2>
  <p>La solicitud puede presentarse a través de la <a href="https://sede.sepe.gob.es" target="_blank" rel="noreferrer">sede electrónica del SEPE</a>, además de por los canales presenciales u oficiales habilitados en cada momento. Antes de iniciar el trámite conviene asegurarse de que la demanda de empleo está activa, de que el certificado de empresa figura correctamente y de que la fecha de desempleo permite contar bien el plazo.</p>
  <p>En la práctica, muchas denegaciones o retrasos vienen de errores muy concretos: no revisar si la extinción del contrato aparece como involuntaria, no acreditar correctamente las rentas o dejar pasar el plazo para solicitar. Por eso es buena idea preparar primero toda la documentación, comprobar el historial laboral y solo después iniciar la solicitud oficial en el portal del SEPE.</p>
  <p>Si el organismo formula un requerimiento, conviene responderlo cuanto antes y conservar el resguardo. En ayudas asistenciales, una omisión documental aparentemente menor puede bloquear el expediente durante semanas.</p>

  <h2>Preguntas frecuentes</h2>
  <h3>¿Puedo pedirlo si he trabajado menos de 90 días?</h3>
  <p>No en el supuesto que recoge este artículo. La referencia que estamos usando para 2026 parte de haber cotizado al menos 90 días por desempleo.</p>
  <h3>¿Si llego a 360 días me corresponde este subsidio?</h3>
  <p>No. Si alcanzas 360 días cotizados, en principio debes analizar si tienes derecho a la prestación contributiva, que es la cobertura prioritaria.</p>
  <h3>¿Cuenta una baja voluntaria?</h3>
  <p>No por sí sola. Debe existir situación legal de desempleo por una causa involuntaria reconocible por el SEPE.</p>
  <h3>¿Dónde se tramita?</h3>
  <p>En la <a href="https://sede.sepe.gob.es" target="_blank" rel="noreferrer">sede.sepe.gob.es</a> y en los canales oficiales del SEPE.</p>
`

export const blogPosts: BlogPost[] = [
  {
    slug: 'ingreso-minimo-vital-requisitos-2026',
    titulo: 'Ingreso Mínimo Vital 2026: requisitos, importes y cómo solicitarlo',
    descripcion:
      'Guía completa sobre el IMV en 2026: quién puede solicitarlo, cuánto se cobra, qué documentación se necesita y cómo tramitarlo en la sede oficial.',
    fecha: '2026-03-22',
    ultimaRevision: '2026-03-23',
    contenido: imv2026Contenido,
  },
  {
    slug: 'prestacion-contributiva-desempleo-requisitos',
    titulo: 'Prestación contributiva por desempleo: requisitos y cómo calcularla en 2026',
    descripcion:
      'Todo sobre la prestación por desempleo contributiva: quién tiene derecho, cuántos días cotizados se necesitan, cuánto se cobra y cómo solicitarla en el SEPE.',
    fecha: '2026-03-22',
    ultimaRevision: '2026-03-23',
    contenido: contributivaContenido,
  },
  {
    slug: 'subsidio-desempleo-cotizaciones-insuficientes',
    titulo: 'Subsidio por desempleo con cotizaciones insuficientes: quién puede pedirlo en 2026',
    descripcion:
      'Si has trabajado entre 90 y 359 días y te han despedido, puede corresponderte el subsidio por cotizaciones insuficientes. Requisitos, importe y cómo solicitarlo.',
    fecha: '2026-03-22',
    ultimaRevision: '2026-03-23',
    contenido: subsidioCotizacionesInsuficientesContenido,
  },
]

export function getAllBlogPosts() {
  return [...blogPosts].sort((a, b) => b.fecha.localeCompare(a.fecha))
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug)
}
