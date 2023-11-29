import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CRP_CORRESPONSABLES_PAI'
  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los coresponsables de Indicadores PAI")
      table.increments("CRP_COD")
      .primary()
      .comment("Llave primaria");
      table
      .string("CRP_CORRESPONSABLE",100)
      .notNullable()
      .comment("Descripción del corresponsable");
      table
      .integer("CRP_CODIDP_PAI")
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
