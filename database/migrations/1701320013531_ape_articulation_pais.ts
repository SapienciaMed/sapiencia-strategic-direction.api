import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'APE_ARTICULACION_PLAN_ESTRATEGICO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los planes de articulacion estrategicos");
      table.increments("APE_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("APE_CODIGO_PAI")
      .notNullable()
      .unsigned()
      .references("PAI_CODIGO")
      .inTable("PAI_PLAN_ACCION_INSTITUCIONAL")
      .comment("codigo del PAI");
      table
      .text("APE_LINEA")
      .comment("");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
