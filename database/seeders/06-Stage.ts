import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Stage from "App/Models/Stage";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Stage.createMany([
      {
        id: 1,
        description: 'Preinversión',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Operación',
        active: true,
        order: 3
      },
      {
        id: 3,
        description: 'Inversión',
        active: true,
        order: 3
      }
    ]);
  }
}
