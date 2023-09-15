import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import RisksTypes from "App/Models/RisksTypes";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await RisksTypes.createMany([
        {
          id: 1,
          description: 'Administrativos',
          active: true,
          order: 1
        },
        {
          id: 2,
          description: 'Legales',
          active: true,
          order: 2
        },
        {
          id: 3,
          description: 'Operacionales',
          active: true,
          order: 3
        },
        {
          id: 4,
          description: 'De calendario',
          active: true,
          order: 4
        },
        {
          id: 5,
          description: 'De costos',
          active: true,
          order: 5
        },
        {
          id: 6,
          description: 'De mercado',
          active: true,
          order: 6
        },
        {
          id: 7,
          description: 'Financieros',
          active: true,
          order: 7
        },
        {
          id: 8,
          description: 'Asociados a fenómenos tecnológicos',
          active: true,
          order: 8
        },
        {
          id: 9,
          description: 'Naturales',
          active: true,
          order: 9
        },
        {
          id: 10,
          description: 'Biológicos',
          active: true,
          order: 10
        },
        {
          id: 11,
          description: 'Humanos',
          active: true,
          order: 11
        }
    ]);
  }
}
