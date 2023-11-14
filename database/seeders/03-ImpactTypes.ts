import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import GenericList from "App/Models/ImpactLevel";

export default class extends BaseSeeder {
  public async run() {
    //Write your database queries inside the run method
    await GenericList.createMany([
      {
        id: 1,
        description: 'Positivo',
        active: true,
        order: 1
      },
      {
        id: 2,
        description: 'Negativo',
        active: true,
        order: 1
      },
    ]);
  }
}
