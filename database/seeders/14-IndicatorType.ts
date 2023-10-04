import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IndicatorType from 'App/Models/IndicatorType';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await IndicatorType.createMany([
      {
        id: 1,
        description: 'Producto (Plan Indicativo)',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Resultado (Plan Indicativo)',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Valor Estadístico (Plan Acción)',
        active: true,
        order: 3
      }
    ]);
  }
}