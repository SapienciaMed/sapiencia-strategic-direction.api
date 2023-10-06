import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'IDC_INDICADORES'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los indicadores");
      table.increments("IDC_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("IDC_CODTDI_TIPO_INDICADOR")
      .notNullable()
      .unsigned()
      .references("TDI_CODIGO")
      .inTable("TDI_TIPO_INDICADOR")
      .comment("llave foranea Tabla  (FK TDI_TIPO_INDICADOR)");
      table
      .string("IDC_CODOBE_OBJETIVO_ESPECIFICO")
      .notNullable()
      .comment("llave foranea tabla objetivo especifico(FK LOE_OBJETIVO_ESPECIFICO)");
      table
      .string("IDC_PRODUCTO_MGA")
      .notNullable()
      .comment("producto mga");
      table
      .integer("IDC_CODIGO_DPN")
      .notNullable()
      .unsigned()
      .references("DNP_CODIGO")
      .inTable("DNP_INDICADOR_DNP")
      .comment("llave foranea de la tabla componentes (FK DNP_INDICADOR_DNP)");
      table
      .integer("IDC_CODDPN_INDICADOR_DPN")
      .notNullable()
      .comment("codigo indicador dnp");
      table
      .text("IDC_CODIGO_VALOR_ESTATICO")
      .notNullable()
      .comment("codigo del valor estadistico");
      table
      .integer("IDC_UNIDAD_MEDIDA")
      .notNullable()
      .comment("unidad de medida");
      table
      .text("IDC_VALOR_ESTATICO")
      .notNullable()
      .comment("Valor estatico");
      table
      .integer("IDC_META_AÑO_0")
      .notNullable()
      .comment("Año 0");
      table
      .integer("IDC_META_AÑO_1")
      .notNullable()
      .comment("Año 0");
      table
      .integer("IDC_META_AÑO_2")
      .notNullable()
      .comment("Año 2");
      table
      .integer("IDC_META_AÑO_3")
      .notNullable()
      .comment("Año 3");
      table
      .integer("IDC_META_AÑO_4")
      .notNullable()
      .comment("Año 4");
      table
      .integer("IDC_META_GLOBAL")
      .nullable()
      .comment("Meta global");
      table
      .integer("IDC_CODPRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRY_CODIGO")
      .inTable("PRY_PROYECTOS")
      .comment("codigo del proyecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
