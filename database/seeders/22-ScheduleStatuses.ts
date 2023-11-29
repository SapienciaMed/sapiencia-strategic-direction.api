import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import ScheduleStatuses from "App/Models/ScheduleStatuses";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await ScheduleStatuses.createMany([
      {
        id: 1,
        description: 'En formulación',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Formulación en revisión 1',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'En formulación devuelto',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Formulación en revisión 2',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Formulado v1',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: 'En actualización',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: 'Actualización en revisión',
        active: true,
        order: 7
      },
      {
        id: 8,
        description: 'Formulado v2',
        active: true,
        order: 8
      },
      {
        id: 9,
        description: 'Seguimiento',
        active: true,
        order: 9
      },
      {
        id: 10,
        description: 'Seguimiento en revisión',
        active: true,
        order: 10
      },
      {
        id: 11,
        description: 'Seguimiento devuelto',
        active: true,
        order: 11
      },
      {
        id: 12,
        description: 'Seguimiento en revisión 2',
        active: true,
        order: 12
      },
      {
        id: 13,
        description: 'Cierre bimestre',
        active: true,
        order: 13
      },
      {
        id: 14,
        description: 'Cierre plan',
        active: true,
        order: 14
      },
      {
        id: 15,
        description: 'Todos',
        active: true,
        order: 15
      },
      {
        id: 16,
        description: 'No aplica',
        active: true,
        order: 16
      },
    ]);
  }
}
