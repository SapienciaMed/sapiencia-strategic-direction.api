import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRP_PRODUCTOS_PAI'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los productos de Indicadores PAI")
      table.increments("PRP_COD")
      .primary()
      .comment("Llave primaria");
      table
      .string("PRP_PRODUCTO",500)
      .notNullable()
      .comment("Descripción del producto");
      table
      .integer("PRP_CODIDP_PAI")
      .notNullable()
      .unsigned()
      .references("IDP_CODIGO")
      .inTable("IDP_INDICADORES")
      .comment("llave foranea Tabla  (FK IDP_INDICADORES)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
