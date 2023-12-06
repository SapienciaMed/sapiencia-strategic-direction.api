import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PaiStates from 'App/Models/ActionPlanStates';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await PaiStates.createMany([
      {
        id: 1,
        description: 'En formulación',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'En revisión formulación 1',
        active: true,
        order: 2
      },
      {
        id: 3,
        description:'En formulación devuelto', 
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
    ]);
  }
}