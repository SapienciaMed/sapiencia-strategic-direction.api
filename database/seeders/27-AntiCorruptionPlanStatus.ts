import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AntiCorruptionPlanStatus from 'App/Models/AntiCorruptionPlanStatus';

export default class extends BaseSeeder {
  public async run () {
    await AntiCorruptionPlanStatus.createMany([
      {
        id: 1,
        description: 'En formulación',
        active: true,
        order: 1
      },
    ]);
  }
}
