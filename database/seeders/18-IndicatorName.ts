import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IndicatorName from 'App/Models/IndicatorName';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await IndicatorName.createMany([
      {
        id: 1,
        description: '1.1.1.1. Personas beneficiadas en programas de formación de talento especializado.',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: '1.1.1.5. Estrategia de difusión y sensibilización para la promoción del acceso de mujeres a programas de educación postsecundaria relacionadas con Valle del Software implementada.',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: '2.2.2.5. Beneficiarios de estrategias que apuntan a la permanencia, calidad y la pertinencia',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: '2.2.2.6. Matrículas en la oferta académica de @Medellín.',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: '2.2.2.7. Política Pública de Educación Postsecundaria diseñada y adoptada.',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: '2.2.2.10. Comité consultivo para la política pública de educación postsecundaria creado e implementado.',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: '2.3.1.3. Becas y créditos condonables otorgados.',
        active: true,
        order: 7
      },
      {
        id: 8,
        description: '2.3.1.8. Estrategia de difusión y sensibilización con enfoque de género, poblacional y diferencial para el acceso a educación postsecundaria implementada.',
        active: true,
        order: 8
      },
      {
        id: 9,
        description: '2.3.1.10. Deserción por semestre académico en Créditos condonables otorgados con recursos del Fondo EPM.',
        active: true,
        order: 9
      },
      {
        id: 10,
        description: '2.3.3.  Continuidad a la educación postsecundaria.',
        active: true,
        order: 10
      },
      {
        id: 11,
        description: '2.5.1.1. Personas formadas en la Ciudadela Occidente.',
        active: true,
        order: 11
      },
      {
        id: 12,
        description: '2.5.1.5. Modelo de funcionamiento y sostenibilidad implementado en la Ciudadela de Occidente.',
        active: true,
        order: 12
      },
      {
        id: 13,
        description: '2.5.2. Satisfacción de la comunidad académica con la ciudad como destino universitario.',
        active: true,
        order: 13
      },
      {
        id: 14,
        description: '2.6.1.5. Proyectos de investigación con posibilidad de transferencia científica y tecnológica de impacto social apoyados.',
        active: true,
        order: 14
      }
    ]);
  }
}