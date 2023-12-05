import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ACC_ACCIONES_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los riesgos asociados");
      table.increments("ACC_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("ACC_CODIGO_PAI")
      .notNullable()
      .unsigned()
      .references("PAI_CODIGO")
      .inTable("PAI_PLAN_ACCION_INSTITUCIONAL")
      .comment("codigo del PAI");
      table
      .text("ACC_DESCRIPCION")
      .comment("");
      table
      .integer("ACC_ACCION")
      .comment("");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
