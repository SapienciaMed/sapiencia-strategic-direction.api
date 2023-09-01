import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'GEN_GENEROS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los generos disponibles Pertenece a la tabla maestra");
      table.increments("GEN_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("GEN_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de los generos");
      table
      .boolean("GEN_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("GEN_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
