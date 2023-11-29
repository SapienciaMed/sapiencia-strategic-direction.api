import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ObjectivePAI from "App/Models/ObjectivesPAI";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ObjectivePAI.createMany([
      {
        id: 1,
        description: 'Orientar la gestión y el desarrollo integral de la Agencia de Educación Postsecundaria de Medellín-Sapiencia en el largo, mediano y corto plazo, mediante la formulación, ejecución, seguimiento y evaluación de políticas, planes, programas y proyectos, con criterios de eficacia, eficiencia, y efectividad para contribuir al fortalecimiento del sistema de educación postsecundario de la ciudad.',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Aportar al posicionamiento de la Agencia de Educación Postsecundaria de Medellín-Sapiencia como entidad pública pionera en Colombia que promueve el acceso a la educación postsecundaria con un enfoque integral y coordinado, a través de estrategias de comunicación 360.',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Implementar y asegurar el sistema de gestión de la calidad en los procesos de la Agencia con el fin de lograr la mejora continua del sistema.',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Administrar de manera integral las tecnologías de la información en la Agencia, prestando servicios acordes a las necesidades de la entidad y los avances en la materia, para contribuir al desarrollo de los procesos estratégicos, misionales y de apoyo a través de la tecnología e innovación.',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Gestionar los procesos contractuales bajo las modalidades de selección que establece la Ley, para la adquisición de los bienes, obras o servicios requeridos por la Agencia conforme a las disposiciones normativas y de manera oportuna y transparente.',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: 'Administrar y mantener de manera eficiente y eficaz los recursos físicos requeridos por los diferentes procesos de la Agencia de Educación Postsecundaria de Medellín –SAPIENCIA, para satisfacer las necesidades y expectativas de los grupos de interés.',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: 'Apoyar jurídicamente los procesos institucionales, brindar asesoría legal, representación judicial y extrajudicial y adelantar actuaciones administrativas que se requieran en la Agencia.',
        active: true,
        order: 7
      },
      {
        id: 8,
        description: 'Realizar las actividades administrativas y técnicas tendientes a la planeación, manejo y organización de la documentación producida y recibida en Sapiencia, desde su origen hasta su destino final, con el objeto de facilitar su utilización y preservación a largo plazo.',
        active: true,
        order: 8
      },
      {
        id: 9,
        description: 'Gestionar los recursos financieros mediante la planificación de los ingresos y gastos, el registro oportuno y consistente de las operaciones contables, financieras y presupuestales y el recaudo efectivo de la cartera; aplicando la normatividad vigente y el uso de las tecnologías de la información y la comunicación, con el fin de asegurar la disponibilidad y utilización de los recursos en forma eficiente y eficaz para el cumplimiento de los objetivos y metas de la Agencia de Educación Postsecundaria de Medellín-Sapiencia.',
        active: true,
        order: 9
      },
      {
        id: 10,
        description: 'Administrar el ciclo de vida laboral (ingreso, permanencia y retiro) del personal de la Agencia; fomentando su desarrollo integral, especialmente en competencias y bienestar; comprometidos con la misión, visión y objetivos de la Agencia para la Educación Postsecundaria –Sapiencia.',
        active: true,
        order: 10
      },
      {
        id: 11,
        description: 'Fortalecer y promover el ecosistema de educación postsecundaria pública del Distrito Especial de Ciencia, Tecnología e Innovación de Medellín por medio de las estrategias relacionadas con las funciones sustantivas de la educación postsecundaria.',
        active: true,
        order: 11
      },
      {
        id: 12,
        description: 'Administrar y ejecutar la operación de los fondos para facilitar el acceso y la permanencia a la educación postsecundaria del Municipio de Medellín, por medio de becas y crédito condonables.',
        active: true,
        order: 12
      },
      {
        id: 13,
        description: 'Brindar atención y entregar información a los ciudadanos de manera eficaz, eficiente y oportuna, proporcionando los mecanismos necesarios para la realización de los trámites y el acceso a la prestación de los servicios con calidad, con el fin de generar niveles de confianza y satisfacción de los ciudadanos en la Agencia.',
        active: true,
        order: 13
      },
      {
        id: 14,
        description: 'Evaluar sistemática, objetiva e independientemente los procesos para medir el nivel de desarrollo del sistema de control interno en la operación y cumplimiento de los objetivos de la entidad.',
        active: true,
        order: 14
      },
    ]);
  }
}
