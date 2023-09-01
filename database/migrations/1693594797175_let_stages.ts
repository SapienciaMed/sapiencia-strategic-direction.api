import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LET_ETAPA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestro que describe las etapas");
      table.increments("LET_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LET_DESCRIPCION",50)
      .notNullable()
      .comment("descripcion de las etapas ");
      table
      .boolean("LET_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("LET_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
