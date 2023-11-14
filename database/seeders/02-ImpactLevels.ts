import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import GenericList from "App/Models/ImpactType";

export default class extends BaseSeeder {
  public async run() {
    //Write your database queries inside the run method
    await GenericList.createMany([
      {
        id: 1,
        description: 'Local',
        active: true,
        order: 1
      },
      {
        id: 2,
        description: 'Regional',
        active: true,
        order: 1
      },
      {
        id: 3,
        description: 'Nacional',
        active: true,
        order: 1
      },
    ]);
  }
}
