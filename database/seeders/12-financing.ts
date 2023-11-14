import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Entity from "App/Models/Financing";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Entity.createMany([
      {
        id: 1,
        description: 'Departamentos',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Empresas públicas',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Corporaciones SGR',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Entidades presupuesto nacional',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Municipios',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: 'Distritos',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: 'Empresas privadas',
        active: true,
        order: 7
      }

      
    ]);
  }
}