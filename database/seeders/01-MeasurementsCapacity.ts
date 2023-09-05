import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import GenericList from "App/Models/MeasurentCapacity";

export default class extends BaseSeeder {
  public async run() {
    //Write your database queries inside the run method
    await GenericList.createMany([
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
        order: 1
      },
      {
        id: 3,
        description: 'Horas',
        active: true,
        order: 1
      },
      {
        id: 4,
        description: 'Semanas',
        active: true,
        order: 1
      },
      {
        id: 5,
        description: 'Unidad',
        active: true,
        order: 1
      },
      {
        id: 6,
        description: 'Pesos',
        active: true,
        order: 1
      },
    ]);
  }
}
