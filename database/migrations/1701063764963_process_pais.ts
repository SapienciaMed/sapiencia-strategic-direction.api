import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LDP_LISTADO_PROCESOS_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena la Lista de procesos ");
      table.increments("LDP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("LDP_DESCRIPCION")
      .notNullable()
      .comment("Descripcion del Proceso");
      table
      .boolean("LDP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("LDP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
