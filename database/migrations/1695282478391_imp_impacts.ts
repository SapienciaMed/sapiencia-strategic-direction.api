import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'IMP_IMPACTO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los impactos");
      table.increments("IMP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("IMP_DESCRIPCION",50)
      .notNullable()
      .comment("tipos de impactos");
      table
      .boolean("IMP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("IMP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
