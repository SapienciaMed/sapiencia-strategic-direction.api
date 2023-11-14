import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Probability from "App/Models/Probability";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Probability.createMany([
      {
        id: 1,
        description: 'Moderado',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Improbable',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Raro',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Probable',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Casi seguro',
        active: true,
        order: 5
      }
    ]);
  }
}
