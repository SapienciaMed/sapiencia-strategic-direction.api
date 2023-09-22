import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Stage from "App/Models/Components";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Stage.createMany([
      {
        id: 1,
        description: 'Talento humano',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Comunicaciones',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Soporte log y admin',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Misional',
        active: true,
        order: 4
      }
    ]);
  }
}
