import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'BMP_BIMESTRES_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los bimestres de cada indicador pai");
      table.increments("BMP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("BMP_CODIDP_PAI")
      .notNullable()
      .unsigned()
      .references("IDP_CODIGO")
      .inTable("IDP_INDICADORES")
      .comment("codigo del indicador PAI");
      table
      .text("BMP_BIMESTRE")
      .notNullable()
      .comment("nombre del bimestre");
      table
      .integer("BMP_VALOR")
      .notNullable()
      .defaultTo(0)
      .comment("valor del bimestre");
      table
      .integer("BMP_DESAGREGAR")
      .notNullable()
      .defaultTo(0)
      .comment("1 para mostrar desagregación 0 para no mostrar");
      table
      .integer("BMP_TOTAL_PORCENTAJE")
      .nullable()
      .defaultTo(0)
      .comment("total porcentaje de desagregación");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
