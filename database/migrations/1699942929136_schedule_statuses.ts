import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'SCS_ESTADOS_CRONOGRAMAS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestro que contiene los estados de los cronogramas");
      table.increments("SCS_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("SCS_DESCRIPCION",50)
      .notNullable()
      .comment("descripcion del estado");
      table
      .boolean("SCS_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("SCS_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
