import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import ProcessPAI from 'App/Models/ProcessPAI';

export default class extends BaseSeeder {
  public async run() {
    await ProcessPAI.createMany([
      {
        id: 1,
        description: 'Direccionamiento estratégico',
        active: true,
        order: 1,
      },
      {
        id: 2,
        description: 'Gestión de comunicaciones',
        active: true,
        order: 2,
      },
      {
        id: 3,
        description: 'Gestión y mejora de la calidad',
        active: true,
        order: 3,
      },
      {
        id: 4,
        description: 'Gestión de sistemas de información',
        active: true,
        order: 4,
      },
      {
        id: 5,
        description: 'Gestión contractual',
        active: true,
        order: 5,
      },
      {
        id: 6,
        description: 'Gestión administrativa',
        active: true,
        order: 6,
      },
      {
        id: 7,
        description: 'Gestión jurídica',
        active: true,
        order: 7,
      },
      {
        id: 8,
        description: 'Gestión documental',
        active: true,
        order: 8,
      },
      {
        id: 9,
        description: 'Gestión financiera',
        active: true,
        order: 9,
      },
      {
        id: 10,
        description: 'Gestión del talento humano',
        active: true,
        order: 10,
      },
      {
        id: 11,
        description: 'Gestión de la educación postsecundaria',
        active: true,
        order: 11,
      },
      {
        id: 12,
        description: 'Acceso y permanencia',
        active: true,
        order: 12,
      },
      {
        id: 13,
        description: 'Atención a la ciudadanía',
        active: true,
        order: 13,
      },
      {
        id: 14,
        description: 'Auditoría interna',
        active: true,
        order: 14,
      },
    ]);
  }
}