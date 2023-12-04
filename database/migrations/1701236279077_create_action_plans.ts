import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PAI_PLAN_ACCION_INSTITUCIONAL'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los planes de acción institucional PAI");
      table.increments("PAI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("PAI_AÑO")
      .nullable()
      .comment("Año del plan de acción institucional");
      table
      .decimal("PAI_PRESUPUESTO",10,2)
      .nullable()
      .comment("campo de tipo moneda, presupuesto ");
      table
      .integer("PAI_TIPO")
      .nullable()
      .comment("Tipo de plan de acción institucional");
      table
      .integer("PAI_NOMBRE_PROYECTO_PROCESO")
      .nullable()
      .comment("Nombre proyecto/proceso");
      table
      .text("PAI_OBJETIVO")
      .nullable()
      .comment("Objetivo proyecto/proceso:");
      table
      .text("PAI_ARTICULACION_PLAN_DESARROLLO_DISTRITAL")
      .nullable()
      .comment("Articulación plan de desarrollo distrital");
      table
      .timestamp("PAI_FECHA_CREO")
      .notNullable()
      .comment("Fecha y hora de creación del PAI");
      table
      .timestamp("PAI_FECHA_MODIFICO")
      .nullable()
      .comment("Fecha y hora de la última modificación");
      table
      .text("PAI_VERSION")
      .nullable()
      .comment("Versiones del PAI");
      table
      .string("PAI_USUARIO",20)
      .nullable()
      .comment("Usuario que guarda la formulacion PAI");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
