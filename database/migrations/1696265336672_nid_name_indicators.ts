import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'NID_NOMBRE_INDICADOR'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que describe los nombres de los indicadores");
      table.increments("NID_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("NID_DESCRIPCION")
      .notNullable()
      .comment("descripcion NOMBRE DEL INDICADOR");
      table
      .boolean("NID_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("NID_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
