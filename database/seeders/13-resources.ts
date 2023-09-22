import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Resource from "App/Models/Resources";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Resource.createMany([
      {
        id: 1,
        description: 'Propios',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Propios funcionamiento',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Fondo de Ciencia, Tecnología e Innovación',
        active: true,
        order: 3
      }
    ]);
  }
}