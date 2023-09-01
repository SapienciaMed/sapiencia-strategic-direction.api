import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'DEP_DEPENDENCIA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Almacena los tipo de dependencias");
      table.increments("DEP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("DEP_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de las dependencias");
      table
      .boolean("DEP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("DEP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
