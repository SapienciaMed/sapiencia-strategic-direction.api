import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TDI_TIPO_INDICADOR'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que describe los tipo de indicador");
      table.increments("TDI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("TDI_DESCRIPCION")
      .notNullable()
      .comment("descripcion de los indicadores");
      table
      .boolean("TDI_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("TDI_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
