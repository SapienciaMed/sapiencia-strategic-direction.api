import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'NMP_NIVEL_IMPACTO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene el nivel de impacto");
      table.increments("NMP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("NMP_DESCRIPCION",50)
      .notNullable()
      .comment("Descripcion del tipo de impacto, solo puede ser positivo o necativo");
      table
      .boolean("NMP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("NMP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
