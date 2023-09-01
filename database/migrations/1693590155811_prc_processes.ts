import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRC_PROCESOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los procesos de la aplicacion");
      table.increments("PRC_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("PRC_DESCRIPCION",50)
      .notNullable()
      .comment("Nombre del proceso");
      table
      .boolean("PRC_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("PRC_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
