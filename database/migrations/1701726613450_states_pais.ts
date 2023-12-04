import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PAI_PLAN_ESTADOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los estados del pai");
      table.increments("PAI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("PAI_DESCRIPCION",50)
      .notNullable()
      .comment("Nombre de la fuente del pai");
      table
      .boolean("PAI_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("PAI_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
