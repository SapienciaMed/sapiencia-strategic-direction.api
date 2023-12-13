import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'IDP_INDICADORES'
  public async up () {
      this.schema.createTable(this.tableName, (table) => {
        table.comment("Tabla que contiene los indicadores PAI");
        table.increments("IDP_CODIGO")
        .primary()
        .comment("Llave primaria");
        table
        .integer("IDP_CODIDC_INDICADOR_PROYECTO")
        .nullable()
        .unsigned()
        .comment("llave foranea Tabla  (FK IDC_INDICADORES)");
        table
        .integer("IDP_CODTDI_TIPO_INDICADOR")
        .notNullable()
        .unsigned()
        .references("TDI_CODIGO_PAI")
        .inTable("TDI_TIPO_INDICADOR_PAI")
        .comment("llave foranea Tabla  (FK TDI_CODIGO_PAI)");
        table
        .string("IDP_DESCRIPCION_INDICADOR", 400)
        .nullable()
        .comment("Descripción del indicador PAI");
        table
        .integer("IDP_META_TOTAL")
        .nullable()
        .comment("Meta total planeada");
        table
        .integer("IDP_CODACC_PAI")
        .notNullable()
        .unsigned()
        .references("ACC_CODIGO")
        .inTable("ACC_ACCIONES_PAI")
        .comment("llave foranea Tabla PAI_PLAN_ACCION_INSTITUCIONAL(FK ACC_ACCIONES_PAI)");
      })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
