import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import StrategicLine from 'App/Models/StrategicLine';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await StrategicLine.createMany([
      {
        id: 1,
        description: '1. Reactivación Económica y Valle del Software',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: '2. Transformación educativa y cultural',
        active: true,
        order: 2
      }
    ]);
  }
}