import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import IndicatorDNP from 'App/Models/IndicatorDNP';

export default class extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await IndicatorDNP.createMany([
      {
        id: 1,
        description: 'Estrategias divulgación implementadas.',
        active: true,
        order: 1 
      },
      {
        id: 2,
        description: 'Beneficiarios de estrategias o programas de apoyo financiero para el acceso a la educación superior o terciaria.',
        active: true,
        order: 2
      },
      {
        id: 3,
        description: 'Programas y proyectos de educación o investigación articulados con el sector productivo.',
        active: true,
        order: 3
      },
      {
        id: 4,
        description: 'Beneficiarios de estrategias o programas de fomento para el acceso a la educación superior o terciaria.',
        active: true,
        order: 4
      },
      {
        id: 5,
        description: 'Beneficiarios de programas o estrategias de permanencia en la educación superior o terciaria.',
        active: true,
        order: 5
      },
      {
        id: 6,
        description: 'Programas y proyectos de educación o investigación articulados con el sector productivo.',
        active: true,
        order: 6
      },
      {
        id: 7,
        description: 'Contenidos educativos para la educación superior o terciaria producidos.',
        active: true,
        order: 7
      },
      {
        id: 8,
        description: 'Documentos de lineamientos de política en educación universitaria.',
        active: true,
        order: 8
      },
      {
        id: 9,
        description: 'Ambientes de aprendizaje dotados.',
        active: true,
        order: 9
      },
      {
        id: 10,
        description: 'Índice de capacidad en la prestación de servicios de tecnología.',
        active: true,
        order: 10
      },
      {
        id: 11,
        description: 'Sistema de Gestión implementado.',
        active: true,
        order: 11
      },
      {
        id: 12,
        description: 'Sistema de gestión documental implementado.',
        active: true,
        order: 12
      },
      {
        id: 13,
        description: 'Estrategias de comunicación con enfoque en ciencia, tecnología y sociedad implementadas.',
        active: true,
        order: 13
      },
      {
        id: 14,
        description: 'Proyectos financiados para el desarrollo tecnológico y la innovación.',
        active: true,
        order: 14
      },
      {
        id: 15,
        description: 'Organizaciones beneficiadas a través de la estrategia de gestión de la I+D+i .',
        active: true,
        order: 15
      },
      {
        id: 16,
        description: 'Documentos de estudios e investigación en educación superior o terciaria realizados.',
        active: true,
        order: 16
      },
      {
        id: 17,
        description: 'Documentos realizados.',
        active: true,
        order: 17
      }
    ]);
  }
}