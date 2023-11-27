import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ObjectivePAI from "App/Models/ObjectivesPAI";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ObjectivePAI.createMany([
      {
        id: 1,
        description: 'Insignificante',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Menor',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Moderado',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Mayor',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Catastrófico',
        active: true,
        order: 5
      }
    ]);
  }
}
