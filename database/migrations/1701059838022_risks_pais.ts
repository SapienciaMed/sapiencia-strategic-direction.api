import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LDR_LISTADO_RIESGOS_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los recursos del PAI");
      table.increments("LDR_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("LDR_DESCRIPCION")
      .notNullable()
      .comment("tipos de riesgos");
      table
      .boolean("LDR_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("LDR_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
