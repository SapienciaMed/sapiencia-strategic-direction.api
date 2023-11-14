import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Programation from 'App/Models/Programation';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Programation.createMany([
      {
        id: 1,
        description: '1.1.1. Reentrenamiento y formación masiva en la industria 4.0',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: '2.2.2. Pertinencia, calidad y habilidades para la educación del futuro',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: '2.3.1. A clase vamos todos y todas',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: '2.3. Educación para todos y todas',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: '2.5.1. Infraestructura y ambientes de aprendizaje',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: '2.5. Infraestructura y ambientes de aprendizaje',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: '2.6.1. Medellín ciudad de la ciencia y el conocimiento',
        active: true,
        order: 7
      }
    ]);
  }
}