import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import GenericList from "App/Models/ImpactRating";

export default class extends BaseSeeder {
  public async run() {
    //Write your database queries inside the run method
    await GenericList.createMany([
      {
        id: 1,
        description: 'Alto',
        active: true,
        order: 1
      },
      {
        id: 2,
        description: 'Medio',
        active: true,
        order: 1
      },
      {
        id: 3,
        description: 'Bajo',
        active: true,
        order: 1
      },
    ]);
  }
}
