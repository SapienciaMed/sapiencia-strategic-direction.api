import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RCS_RECURSO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los recursos");
      table.increments("RCS_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("RCS_DESCRIPCION",50)
      .notNullable()
      .comment("tipos de recursos");
      table
      .boolean("RCS_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("RCS_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
