import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PAIIndicatorType from 'App/Models/PAIIndicatorType';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await PAIIndicatorType.createMany([
      {
        id: 1,
        description: 'Número',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Porcentaje',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'A demanda',
        active: true,
        order: 3
      }
    ]);
  }
}