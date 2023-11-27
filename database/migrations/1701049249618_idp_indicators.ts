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
      .references("IDC_CODIGO")
      .inTable("IDC_INDICADORES")
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
      .integer("IDP_PRIMER_BIMESTRE")
      .notNullable()
      .comment("primer bimestre");
      table
      .integer("IDP_SEGUNDO_BIMESTRE")
      .notNullable()
      .comment("segundo bimestre");
      table
      .integer("IDP_TERCER_BIMESTRE")
      .notNullable()
      .comment("tercer bimestre");
      table
      .integer("IDP_CUARTO_BIMESTRE")
      .notNullable()
      .comment("cuarto bimestre");
      table
      .integer("IDP_QUINTO_BIMESTRE")
      .notNullable()
      .comment("quinto bimestre");
      table
      .integer("IDP_SEXTO_BIMESTRE")
      .notNullable()
      .comment("sexto bimestre");
      table
      .integer("IDP_META_TOTAL")
      .nullable()
      .comment("Meta total planeada");
      table
      .integer("IDP_CODPAI_PAI")
      .notNullable()
      .unsigned()
      .references("PAI_CODIGO")
      .inTable("PAI_PLANEACION")
      .comment("llave foranea Tabla  (FK PAI_PLANEACION)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
