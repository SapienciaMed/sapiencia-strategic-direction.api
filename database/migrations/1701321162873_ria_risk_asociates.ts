import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RIA_RIESGO_ASOCIADO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los riesgos asociados");
      table.increments("RIA_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("RIA_CODIGO_PAI")
      .notNullable()
      .unsigned()
      .references("PAI_CODIGO")
      .inTable("PAI_PLAN_ACCION_INSTITUCIONAL")
      .comment("codigo del PAI");
      table
      .text("RIA_RIESGO_ASOCIADO")
      .comment("");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
