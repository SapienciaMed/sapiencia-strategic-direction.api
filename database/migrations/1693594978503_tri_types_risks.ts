import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TRI_TIPO_RIESGOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestro que contiene el tipo de riesgo");
      table.increments("TRI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("TRI_DESCRIPCION",50)
      .notNullable()
      .comment("descripcion del tipo de riesgo ");
      table
      .boolean("TRI_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("TRI_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
