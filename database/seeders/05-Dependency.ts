import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dependence from "App/Models/Dependence";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Dependence.createMany([
      {
        id: 1,
        description: 'Dirección General – Direccionamiento Estratégico',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Dirección General – Gestión de Comunicaciones',
        active: true,
        order: 3
      },
      {
        id: 3,
        description: 'Dirección Técnica de Fondos',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Subdirección para la Gestión de la Educación Postsecundaria',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Subdirección Administrativa, Financiera y de Apoyo a la Gestión',
        active: true,
        order: 5
      },
    ]);
  }
}
