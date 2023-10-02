import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'DNP_INDICADOR_DNP'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que describe los tipo de indicador dnp");
      table.increments("DNP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("DNP_DESCRIPCION")
      .notNullable()
      .comment("descripcion de los indicadores DNP");
      table
      .boolean("DNP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("DNP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
