import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'EPA_ESTADOS_PLAN_ANTICORRUPCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que describe  el estado del plan anticorrupción");
      table.increments("EPA_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("EPA_DESCRIPCION",50)
      .notNullable()
      .comment("Descripcion del estado del plan anticorrupción");
      table
      .boolean("EPA_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("EPA_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
