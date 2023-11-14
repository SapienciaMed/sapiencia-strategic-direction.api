import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ProjectStates from 'App/Models/ProjectStates';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ProjectStates.createMany([
      {
        id: 1,
        description: 'En formulación',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Formulado',
        active: true,
        order: 2
      },
      {
        id: 3,
        description:'En actualización', 
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Finalizado',
        active: true,
        order: 4
      }
    ]);
  }
}