import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TMP_TIPO_IMPACTO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que describe  el tipo de impacto");
      table.increments("TMP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("TMP_DESCRIPCION",50)
      .notNullable()
      .comment("Descripcion del tipo de impacto, solo puede ser positivo o necativo");
      table
      .boolean("TMP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("TMP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
