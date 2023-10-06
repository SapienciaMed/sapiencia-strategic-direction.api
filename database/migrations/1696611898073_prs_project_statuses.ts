import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRS_PROYECTO_ESTADOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los estados del proyecto");
      table.increments("PRS_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("PRS_DESCRIPCION",50)
      .notNullable()
      .comment("Nombre de la fuente de financiacion");
      table
      .boolean("PRS_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("PRS_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
