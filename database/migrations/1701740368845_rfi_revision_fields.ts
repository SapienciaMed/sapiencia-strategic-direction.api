import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RFI_REVISION_CAMPOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los campos para la revision del PAI");
      table.increments("RFI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("RFI_DESCRIPCION")
      .notNullable()
      .comment("Campos");
      table
      .boolean("RFI_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("RFI_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
      table
      .integer("RFI_TIPO")
      .notNullable()
      .comment('Tipo "1" para campos generales, tipo "2" para campos de acciones/indicadores.');
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
