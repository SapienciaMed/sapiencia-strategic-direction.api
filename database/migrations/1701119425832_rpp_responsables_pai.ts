import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RPP_RESPONSABLES_PAI'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los responsables de Indicadores PAI")
      table.increments("RPP_COD")
      .primary()
      .comment("Llave primaria");
      table
      .string("RPP_RESPONSABLE",500)
      .notNullable()
      .comment("Descripción del responsable");
      table
      .integer("RPP_CODIDP_PAI")
      .notNullable()
      .unsigned()
      .references("IDP_CODIGO")
      .inTable("IDP_INDICADORES")
      .comment("llave foranea Tabla  (FK IDP_INDICADORES)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
