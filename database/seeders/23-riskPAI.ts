import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RiskPAI from "App/Models/RisksPAI";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await RiskPAI.createMany([
      {
        id: 1,
        description: 'Probabilidad de afectación económica y reputacional por déficit o excedente presupuestal, debido a debilidades o deficiencias en la planeación del Presupuesto, a la inadecuada planeación de necesidades, a cambios en la ejecución de actividades o factores externos a la planeación presupuestal (variación de la TRM, incremento de las tasas de interés, sobrecostos por retrasos en la cadena de suministros)',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Beneficiar a un tercero que tiene una reclamación ante la agencia (RC)',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Celebración de contratos sin la totalidad de los requisitos legales (RC)',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Conflicto de intereses (RC)',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Falsedad de documentos aportados con la propuesta en los procesos de contratación (precontractual y contractual) (RC)',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: 'Favorecer a los usuarios en las respuestas de las PQRSDF por fuera de los parámetros técnicos institucionales (RC)',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: 'Hurto de bienes muebles (RC)',
        active: true,
        order: 7
      },
      {
        id: 8,
        description: 'Inconsistencias en la aplicación de pagos en las obligaciones (RC)',
        active: true,
        order: 8
      },
      {
        id: 9,
        description: 'Malversación o desvío de fondos (RC)',
        active: true,
        order: 9
      },
      {
        id: 10,
        description: 'Manipulación de la información del proceso (RC)',
        active: true,
        order: 10
      },
      {
        id: 11,
        description: 'Posibilidad de acciones legales e incumplimiento de los términos de respuesta en las PQRSDF debido a la falta de efectividad en la aplicación de controles automatizados al no contar con un sistema centralizado de atención y gestión',
        active: true,
        order: 11
      },
      {
        id: 12,
        description: 'Posibilidad de acciones legales por suministrar información errónea o incompleta a los ciudadanos debido a fallas de comunicación interna sobre los programas y proyectos de la Agencia',
        active: true,
        order: 12
      },
      {
        id: 13,
        description: 'Posibilidad de afectación de la infraestructura física, como consecuencia de un evento sísmico significativo o por carga interna de la estructura, derivada del uso y/o resistencia de la misma, cuya afectación pueda generar pérdidas humanas y fiscales',
        active: true,
        order: 13
      },
      {
        id: 14,
        description: 'Posibilidad de afectación económica y reputacional por incumplimiento de pactos, acuerdos, convenios y/o contratos por parte de aliados u operadores debido a la adquisición de servicios financieros, logísticos o de alianzas sin el mínimo de requisitos técnicos necesarios para la administración de los programas y recursos económicos destinados a los fondos que generan oportunidades de acceso y permanencia en la Educación Postsecundaria',
        active: true,
        order: 14
      },
      {
        id: 15,
        description: 'Posibilidad de afectación en la prestación de servicios por inadecuada y/o insuficiente infraestructura, debido a las limitaciones relacionadas con los recursos físicos y la alta demanda de espacios para el desarrollo de las actividades requeridas por los diferentes proyectos que lidera la Agencia',
        active: true,
        order: 15
      },
      {
        id: 16,
        description: 'Posibilidad de afectar la prestación de servicio de la Agencia, debido a la inobservancia normativa sobre la política de derechos de autor, generado por la falta de licencias activas que apoyan la gestión administrativa y misional de la Entidad',
        active: true,
        order: 16
      },
      {
        id: 17,
        description: 'Posibilidad de Baja inscripción a los programas ofertados por la Agencia, desinformación de la oferta de la Agencia, percepción negativa frente a la Agencia por estrategias de comunicación para la realización de campañas no efectivas, debido a tiempos no adecuados para la planeación y ejecución de la estrategia, inadecuada identificación de los públicos objetivos, insuficiente presupuesto para la ejecución de las acciones planeadas, falta de exactitud frente a los objetivos y resultados esperados',
        active: true,
        order: 17
      },
      {
        id: 18,
        description: 'Posibilidad de Celebración de contratos sin la aplicación adecuada de cada una de las modalidades de contratación definidas en la Ley',
        active: true,
        order: 18
      },
      {
        id: 19,
        description: 'Posibilidad de desarticulación e ineficiencia en la gestión por procesos por incumplimiento en los objetivos de los procesos de primer nivel, reprocesos y gestión funcional debido a la falta de una cultura de gestión basada en procesos con foco en el mejoramiento continuo, satisfacción social y valor público.',
        active: true,
        order: 19
      },
      {
        id: 20,
        description: 'Posibilidad de deserción de los beneficiarios en los programas y proyectos (estrategias) afectando el objetivo supremo de promover la educación postsecundaria por la NO continuidad y/o NO graduación asociadas a factores psicosociales, económicos, sociológicos y/o Institucionales que inciden en los procesos académicos de los estudiantes beneficiarios (Fondos, Becas)',
        active: true,
        order: 20
      },
      {
        id: 21,
        description: 'Posibilidad de disminución del desempeño institucional, debido a la falta en la implementación del plan estratégico de Talento Humano, por deficiencia en la planeación y poco presupuesto',
        active: true,
        order: 21
      },
      {
        id: 22,
        description: 'Posibilidad de disminución en la priorización de los recursos de PL y PP, a causa de la desarticulación con actores del territorio (JAL, Organizaciones sociales y CCCP) debido a la falta de comunicación y acercamiento permanente con los líderes territoriales',
        active: true,
        order: 22
      },
      {
        id: 23,
        description: 'Posibilidad de entrega de estados financieros con información incompleta e inexacta, por el reporte inoportuno o erróneo de los hechos económicos generados en los diferentes procesos, debido a que estos dependen de la información de entes externos que no guarda correspondencia con las fechas de corte establecidas',
        active: true,
        order: 23
      },
      {
        id: 24,
        description: 'Posibilidad de generarse fallas en los valores liquidados de los créditos en el aplicativo Minotauro',
        active: true,
        order: 24
      },
      {
        id: 25,
        description: 'Posibilidad de hallazgos administrativos e investigaciones disciplinarias por desconocimiento de la normatividad archivística e incumplimiento de la misma debido a la constante y alta emisión de normas',
        active: true,
        order: 25
      },
      {
        id: 26,
        description: 'Posibilidad de hallazgos por omisión de controles en las necesidades debido a la falta de articulación y reporte de las mismas',
        active: true,
        order: 26
      },
      {
        id: 27,
        description: 'Posibilidad de incumplimiento en la forma de pago de los compromisos contraídos producto de la suscripción de contratos por no contar con los recursos disponibles debido a una inadecuada programación y ejecución del Plan anualizado de caja (PAC)',
        active: true,
        order: 27
      },
      {
        id: 28,
        description: 'Posibilidad de incumplimiento en la meta de indicadores institucionales POR la baja asistencia de beneficiarios en las estrategias de permanencia, debido a deficiencias en el proceso de convocatoria y difusión',
        active: true,
        order: 28
      },
      {
        id: 29,
        description: 'Posibilidad de incurrir en investigaciones disciplinarias a causa de realizar giros por mayor valor a lo establecido en los reglamentos debido a una desestabilización del sistema de información',
        active: true,
        order: 29
      },
      {
        id: 30,
        description: 'Posibilidad de investigación y/o sanciones disciplinarias de parte de los entes reguladores por revisión de planes anuales de auditoria en control interno debido al no cumplimiento de control y seguimiento del Plan Estratégico de las tecnologías de la información y comunicaciones',
        active: true,
        order: 30
      },
      {
        id: 31,
        description: 'Posibilidad de investigaciones de entes de control y seguimiento político del Concejo de Medellín por incumplimiento del Acuerdo 060 de 2005 debido a la inadecuada planificación y ejecución de la selección del operador idóneo',
        active: true,
        order: 31
      },
      {
        id: 32,
        description: 'Posibilidad de investigaciones disciplinarias de tipo grave o gravísimo debido a la inadecuada programación, ejecución y seguimiento del Plan de Auditorías Internas de Control Interno',
        active: true,
        order: 32
      },
      {
        id: 33,
        description: 'Posibilidad de la aprobación de solicitudes inconsistentes por ausencia de criterios unificados y complejidad de la operación de los programas, afectando la permanencia de los estudiantes y efectos administrativos adversos a ellos, debido a la inadecuada aplicación y adaptación de la normatividad de los programas',
        active: true,
        order: 33
      },
      {
        id: 34,
        description: 'Posibilidad de materializar el daño antijurídico por una PQRSD, actuación administrativa, tutela o proceso judicial o extrajudicial debido a la aplicación e interpretación errónea de una norma u omisión de un deber legal',
        active: true,
        order: 34
      },
      {
        id: 35,
        description: 'Posibilidad de materializar el daño antijurídico, por conocimiento de una queja o investigación con incidencia disciplinaria, debido a la omisión de un deber legal o incumplimiento en los plazos determinados',
        active: true,
        order: 35
      },
      {
        id: 36,
        description: 'Posibilidad de no cumplir con las metas a causa de la reducción de los aspirantes en la inscripción de las convocatorias, debido a un corto tiempo en el cronograma de inscripción y no contar con el recurso humano y tecnológico para la difusión',
        active: true,
        order: 36
      },
      {
        id: 37,
        description: 'Posibilidad de ocurrencia del daño antijurídico por imposibilidad material de ejercer la defensa técnica, debido a falta de experiencia del abogado que adelante las actuaciones judiciales, omita el deber legal e inobserve los términos judiciales y extrajudiciales',
        active: true,
        order: 37
      },
      {
        id: 38,
        description: 'Posibilidad de pago de sanciones e intereses de mora por la omisión, inexactitud o presentación inoportuna, en la presentación y pago de las obligaciones tributarias de la Agencia, debido a desconocimiento de la normatividad tributaria o incumplimiento del calendario tributario establecido',
        active: true,
        order: 38
      },
      {
        id: 39,
        description: 'Posibilidad de perder los soportes y trazabilidad de la información relacionada con la gestión por la no disponibilidad de la data que limita la pronta respuesta o solución a requerimientos de usuarios debido a fallas o insuficiencia de la seguridad informática',
        active: true,
        order: 39
      },
      {
        id: 40,
        description: 'Posibilidad de perder operatividad con todos los servicios activos de infraestructura física y lógica por desconexión e inactividad de aplicativos o dispositivos locales y/o externos debido a fallas en los dispositivos tecnológicos',
        active: true,
        order: 40
      },
      {
        id: 41,
        description: 'Posibilidad de pérdida de aliados estratégicos por falta de articulación institucional debido a la inadecuada planificación de la gestión interinstitucional',
        active: true,
        order: 41
      },
      {
        id: 42,
        description: 'Posibilidad de pérdida de confianza de las IES y Beneficiarios por aumento de las PQRSDF respecto al no giro oportuno debido a falencias en la automatización del módulo de giros',
        active: true,
        order: 42
      },
      {
        id: 43,
        description: 'Posibilidad de pérdida de credibilidad por comunicaciones equivocadas, incompletas e inoportunas debido a insuficiente control y verificación de los datos, información, cifras y noticias en general recibidas por los demás procesos',
        active: true,
        order: 43
      },
      {
        id: 44,
        description: 'Posibilidad de pérdida del conocimiento o memoria institucional por la alta rotación del personal vinculado y contratista debido a la limitada estructura o arquitectura organizacional.',
        active: true,
        order: 44
      },
      {
        id: 45,
        description: 'Posibilidad de pérdida o deterioro de documentación debido inadecuado manejo y conservación de los documento por la falta de implementación y difusión del Sistema Integrado de Conservación SIC',
        active: true,
        order: 45
      },
      {
        id: 46,
        description: 'Posibilidad de pérdida reputacional por No lograr cumplir con las actividades planteadas en el PIC debido a a la desarticulación entre la identificación de necesidades y el plan Institucional de capacitación (PIC)',
        active: true,
        order: 46
      },
      {
        id: 47,
        description: 'Posibilidad de pérdida reputacional por no lograr cumplir con las actividades planteadas en el programa de bienestar debido a la desarticulación entre la identificación de necesidades y el plan de actividades en el programa de bienestar',
        active: true,
        order: 47
      },
      {
        id: 48,
        description: 'Posibilidad de preseleccionar y seleccionar aspirantes que no cumplen con los requisitos habilitantes y de puntuación establecidos en los reglamentos, por una indebida parametrización de los criterios en los desarrollos y herramientas asociados a la operatividad y manualidad en el manejo de la información',
        active: true,
        order: 48
      },
      {
        id: 49,
        description: 'Posibilidad de que la ciudad no cuente con el marco normativo y lineamientos que generen articulación, transformación y consolidación del ecosistema de educación postsecundaria POR la no aprobación del proyecto de acuerdo en el Concejo de Medellín DEBIDO a las voluntades, prioridades y agenda de los entes de deliberación y decisión',
        active: true,
        order: 49
      },
      {
        id: 50,
        description: 'Posibilidad de que los estudiantes no puedan realizar procesos de renovación y/o legalización ante la entidad, a causa de la demora en el tramite o la falta de información requerida para realizar dichos procesos, debido a la falta de comunicación articulada entre la agencia y las IES',
        active: true,
        order: 50
      },
      {
        id: 51,
        description: 'Posibilidad de que se generen sanciones onerosas por la disminución en el nivel de aceptabilidad en el cumplimiento de los estándares mínimos y del SGSST debido al incumplimiento normativo que rigen dicho sistema',
        active: true,
        order: 51
      },
      {
        id: 52,
        description: 'Posibilidad de reclamaciones de los beneficiarios e inconsistencias en la información financiera reportada a Contabilidad por la conciliación mensual debido a errores en la facturación',
        active: true,
        order: 52
      },
      {
        id: 53,
        description: 'Posibilidad de riesgo reputacional por los grupos de valor, debido a la falta de identificación de trámites y procedimientos administrativos dispuestos para la gestión del ciudadano',
        active: true,
        order: 53
      },
      {
        id: 54,
        description: 'Posibilidad de sanciones disciplinarias por el incumplimiento a la ejecución de las actividades propuestas en los planes de mejoramiento derivados de las auditorías internas y externas',
        active: true,
        order: 54
      },
      {
        id: 55,
        description: 'Posibilidad de sanciones disciplinarias por no garantizar la trazabilidad y constancia de la información generada por la no disponibilidad e inconsistencia de la data en el proceso debido a fallas de conectividad y/o por la no correcta funcionalidad de los aplicativos en sus respectivos módulos',
        active: true,
        order: 55
      },
      {
        id: 56,
        description: 'Posibilidad de sanciones o investigaciones disciplinarias al Ordenador del Gasto POR incumplimiento de las metas del Plan de Desarrollo de Medellín, Plan Estratégico institucional o requerimientos de entes de control o demás entidades debido a la gestión insuficiente relacionado con la distribución y ejecución de los recursos y la gestión de los líderes de los procesos.',
        active: true,
        order: 56
      },
      {
        id: 57,
        description: 'Posibilidad de sanciones pecuniarias al Representante Legal por la omisión en los requerimientos de Contraloría debido al incumplimiento en la entrega de la información solicitada a la Entidad',
        active: true,
        order: 57
      },
      {
        id: 58,
        description: 'Posibilidad de sanciones por parte de los entes de control, por acceso insuficiente a la información y falta de inclusión a grupos de valor debido a incumplimiento en las publicaciones y características en la página web según la normatividad vigente',
        active: true,
        order: 58
      },
      {
        id: 59,
        description: 'Posibilidad de sanciones y requerimientos legales por procesos archivísticos que no se aplican articuladamente debido a la pérdida de información y memoria institucional',
        active: true,
        order: 59
      },
      {
        id: 60,
        description: 'Posibilidad de Violación al régimen constitucional y/o legal de inhabilidades e incompatibilidades y conflicto de intereses - No información de la inhabilidad por parte del contratista',
        active: true,
        order: 60
      },
      {
        id: 61,
        description: 'Posible direccionamiento mal intencionado en la estructuración de pliegos de condiciones y/o la Evaluación de Ofertas contraria al principio de Selección Objetiva para beneficio propio o de terceros; puede conllevar a la posibilidad de celebración de contratos violando el principio de Selección Objetiva para beneficio propio o de terceros y por consiguiente, incurrir en sanciones disciplinarias y/o penales',
        active: true,
        order: 61
      },
      {
        id: 62,
        description: 'Posibilidad de incumplimiento contractual por inacción del asociado en el desarrollo de las obligaciones debido a inadecuada planificación de los aspectos técnicos, económicos, jurídicos y legales',
        active: true,
        order: 62
      },
      {
        id: 63,
        description: 'Probabilidad de afectación económica por procesos disciplinarios por hallazgos de los entes de control; debido a baja ejecución presupuestal por debilidades, deficiencias o insuficiente seguimiento y control en la ejecución presupuestal',
        active: true,
        order: 63
      },
      {
        id: 64,
        description: 'Probabilidad de afectación económica por sanciones o procesos disciplinarios, fiscales o penales por hallazgos de los entes de control; debido a inexactitud en la información presupuestal por administración de bases de datos e información en Excel (Suministro de información no confiable)',
        active: true,
        order: 64
      },
      {
        id: 65,
        description: 'Probabilidad de afectación económica y reputacional por sanciones, procesos disciplinarios, fiscales o penales por hallazgos de los entes de control; debido a desconocimiento o desactualización normativa en temas presupuestales',
        active: true,
        order: 65
      },
      {
        id: 66,
        description: 'Probabilidad de afectación reputacional, por procesos disciplinarios por hallazgos de los entes de control, debido a la pérdida de información por falta de soportes que respaldan los registros presupuestales',
        active: true,
        order: 66
      },
      {
        id: 67,
        description: 'Recibir dádivas o beneficios a nombre propio o de terceros por realizar trámites (RC)',
        active: true,
        order: 67
      },
      {
        id: 68,
        description: 'Tráfico de influencias (RC)',
        active: true,
        order: 68
      },
      {
        id: 69,
        description: 'Uso inadecuado de las herramientas de correos y mensajes de texto masivos ("MailChimp" y "Háblame"); en beneficio propio, particular o de terceros (RC)',
        active: true,
        order: 69
      },
      {
        id: 70,
        description: 'Utilización indebida de las bases de datos personales para beneficio propio o de un tercero (RC)',
        active: true,
        order: 70
      },
    ]);
  }
}