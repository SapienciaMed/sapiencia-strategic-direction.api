import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Process from "App/Models/Process";

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Process.createMany([
      {
        id: 1,
        description: 'Actualización',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Adecuación',
        active: true,
        order: 3
      },
      {
        id: 3,
        description: 'Administración',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Adquisición',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Ampliación',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: 'Análisis',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: 'Aplicación',
        active: true,
        order: 7
      },
      {
        id: 8,
        description: 'Aportes',
        active: true,
        order: 8
      },
      {
        id: 9,
        description: 'Apoyo',
        active: true,
        order: 9
      },
      {
        id: 10,
        description: 'Asistencia',
        active: true,
        order: 10
      },
      {
        id: 11,
        description: 'Aprovechamiento',
        active: true,
        order: 11
      },
      {
        id: 12,
        description: 'Asesoría',
        active: true,
        order: 12
      },
      {
        id: 13,
        description: 'Caracterización',
        active: true,
        order: 13
      },
      {
        id: 14,
        description: 'Consolidación',
        active: true,
        order: 14
      },
      {
        id: 15,
        description: 'Contribución',
        active: true,
        order: 15
      },
      {
        id: 16,
        description: 'Desarrollo',
        active: true,
        order: 16
      },
      {
        id: 17,
        description: 'Diseño',
        active: true,
        order: 17
      },
      {
        id: 18,
        description: 'Dotación',
        active: true,
        order: 18
      },
      {
        id: 19,
        description: 'Elaboración',
        active: true,
        order: 19
      },
      {
        id: 20,
        description: 'Formulación',
        active: true,
        order: 20
      },
      {
        id: 21,
        description: 'Fortalecimiento',
        active: true,
        order: 21
      },
      {
        id: 22,
        description: 'Identificación',
        active: true,
        order: 22
      },
      {
        id: 23,
        description: 'Instalación',
        active: true,
        order: 23
      },
      {
        id: 24,
        description: 'Investigación',
        active: true,
        order: 24
      },
      {
        id: 25,
        description: 'Mantenimiento',
        active: true,
        order: 25
      },
      {
        id: 26,
        description: 'Mejoramiento',
        active: true,
        order: 26
      },
      {
        id: 27,
        description: 'Optimización',
        active: true,
        order: 27
      },
      {
        id: 28,
        description: 'Prevención',
        active: true,
        order: 28
      },
      {
        id: 29,
        description: 'Servicio',
        active: true,
        order: 29
      }
    ]);
  }
}
