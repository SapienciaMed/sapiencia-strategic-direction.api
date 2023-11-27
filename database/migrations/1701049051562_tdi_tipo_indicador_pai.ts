import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tdi_tipo_indicador_pais'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los tipos de indicadores para PAI");
      table.increments("TDI_CODIGO_PAI")
      .primary()
      .comment("Llave primaria");
      table
      .text("TDI_DESCRIPCION_PAI")
      .notNullable()
      .comment("descripcion del indicador");
      table
      .boolean("TDI_ACTIVO_PAI")
      .notNullable()
      .comment("booleano con posibles valores True o False");
      table
      .integer("TDI_ORDEN_PAI")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
