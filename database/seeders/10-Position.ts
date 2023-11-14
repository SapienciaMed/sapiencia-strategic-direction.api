import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Position from "App/Models/Position";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Position.createMany([
      {
        id: 1,
        description: 'Beneficiario-a',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Cooperante',
        active: true,
        order: 3
      },
      {
        id: 3,
        description: 'Perjudicado-a',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Oponente',
        active: true,
        order: 4
      }
    ]);
  }
}
