import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LCI_LISTADO_CAUSA_INDIRECTA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena el listado de causas indirectas");
      table.increments("LCI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LCI_NUMERO", 5)
      .notNullable()
      .comment("numero que identifica la causa");
      table
      .string("LCI_DESCRIPCION")
      .notNullable()
      .comment("Descripcion de la causa");
      table
      .integer("LCI_CODLCD_CAUSA_DIRECTA")
      .notNullable()
      .unsigned()
      .references("LCD_CODIGO")
      .inTable("LCD_LISTADO_CAUSA_DIRECTA")
      .comment("codigo de la causa directa , llave foreanea de la tabla cuasa directa (LCD_CODIGO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
