import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'DSG_DESAGREGAR_PAI'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene la desagregación de cada bimestre pai");
      table.increments("DSG_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("DSG_CODBMP_PAI")
      .notNullable()
      .unsigned()
      .references("BMP_CODIGO")
      .inTable("BMP_BIMESTRES_PAI")
      .comment("codigo del bimestre");
      table
      .integer("DSG_PORCENTAJE")
      .notNullable()
      .defaultTo(0)
      .comment("porcentaje");
      table
      .text("DSG_DESCRIPCION")
      .nullable()
      .comment("descripción de desagregación");
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
