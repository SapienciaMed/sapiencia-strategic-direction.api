import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LNE_LINEA_ESTRATEGICA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que describe la linea estrategica");
      table.increments("LNE_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("LNE_DESCRIPCION")
      .notNullable()
      .comment("Nombre de la fuente de la linea estrategica");
      table
      .boolean("LNE_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("LNE_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
