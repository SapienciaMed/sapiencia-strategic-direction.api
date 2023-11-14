import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'FFI_FUENTE_FINANCIACION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene las fuentes de financiacion");
      table.increments("FFI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("FFI_DESCRIPCION",50)
      .notNullable()
      .comment("Nombre de la fuente de financiacion");
      table
      .boolean("FFI_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("FFI_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
