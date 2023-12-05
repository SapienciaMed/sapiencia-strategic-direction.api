import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RPF_REVISION_PAI_CAMPOS'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que relaciona los campos seleccionados con las revisiones del PAI");
      table.increments("RFI_CODIGO")
        .primary()
        .comment("Llave primaria");
      table
        .integer("RPF_CODRPA_RPA_REVISION_PAI")
        .notNullable()
        .unsigned()
        .references("RPA_CODIGO")
        .inTable("RPA_REVISION_PAI")
        .comment("codigo de la revision , llave foranea de la tabla revision RPA_REVISION_PAI (RPA_CODIGO)");
      table
        .integer("RPF_CODRFI_RFI_REVISION_CAMPOS")
        .notNullable()
        .unsigned()
        .references("RFI_CODIGO")
        .inTable("RFI_REVISION_CAMPOS")
        .comment("codigo del campo , llave foranea de la tabla revision RFI_REVISION_CAMPOS (RFI_CODIGO)");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
