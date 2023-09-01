import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LCD_LISTADO_CAUSA_DIRECTA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena el listado de causas directas");
      table.increments("LCD_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LCD_NUMERO", 5)
      .notNullable()
      .comment("numero que identifica la causa");
      table
      .string("LCD_DESCRIPCION")
      .notNullable()
      .comment("Descripcion de la causa");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
