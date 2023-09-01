import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'TDI_TIPO_DE_INDICADOR'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla Maestro almacena los tipos de indicadores");
      table.increments("TDI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("TDI_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de los tipos de indicadores");
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
