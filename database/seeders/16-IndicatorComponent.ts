import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IndicatorsComponent from 'App/Models/IndicatorsComponent';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await IndicatorsComponent.createMany([
      {
        id: 1,
        description: '1.1. Talento humano y empleo',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: '2.2. Transformación curricular para la cuarta revolución industrial',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: '2.3. Educación para todos y todas',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: '2.5. Infraestructura y ambientes de aprendizaje',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: '2.6. Investigación, creación y apropiación de saberes',
        active: true,
        order: 5
      }
    ]);
  }
}