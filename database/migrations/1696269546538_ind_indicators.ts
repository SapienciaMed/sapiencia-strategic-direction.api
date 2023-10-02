import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'IND_INDICADORES'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los indicadores");
      table.increments("IND_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("IND_CODTDI_TIPO_INDICADOR")
      .notNullable()
      .unsigned()
      .references("TDI_CODIGO")
      .inTable("TDI_TIPO_INDICADOR")
      .comment("llave foranea Tabla  (FK TDI_TIPO_INDICADOR)");
      table
      .integer("IND_CODLNE_LINEA_ESTRATEGICA")
      .notNullable()
      .unsigned()
      .references("LNE_CODIGO")
      .inTable("LNE_LINEA_ESTRATEGICA")
      .comment("llave foranea de la tabla linea estrategica (FK LNE_LINEA_ESTRATEGICA)");
      table
      .integer("IND_CODCOM_COMPONENTE")
      .notNullable()
      .unsigned()
      .references("COM_CODIGO")
      .inTable("COM_COMPONENTE")
      .comment("llave foranea de la tabla componentes (FK COM_COMPONENTE)");
      table
      .integer("IND_PROGRAMA")
      .notNullable()
      .unsigned()
      .references("PRG_CODIGO")
      .inTable("PRG_PROGRAMACION")
      .comment("llave foranea de la tabla programacion (FK PRG_PROGRAMACION)");
      table
      .integer("IND_NOMBRE_INDICADOR")
      .notNullable()
      .unsigned()
      .references("NID_CODIGO")
      .inTable("NID_NOMBRE_INDICADOR")
      .comment("llave foranea de la tabla nombre indicador (FK NID_NOMBRE_INDICADOR)");
      table
      .integer("IND_UNIDAD_MEDIDA")
      .notNullable()
      .comment("unidad de medida");
      table
      .text("IND_PLAN_DESARROLLO")
      .notNullable()
      .comment("descripcion plan de desarrollo 500 caracteres");
      table
      .string("IND_PRODUCTO_MGA")
      .notNullable()
      .comment("producto mga");
      table
      .integer("IND_META_AÑO_0")
      .notNullable()
      .comment("Año 0");
      table
      .integer("IND_META_AÑO_1")
      .notNullable()
      .comment("Año 0");
      table
      .integer("IND_META_AÑO_2")
      .notNullable()
      .comment("Año 2");
      table
      .integer("IND_META_AÑO_3")
      .notNullable()
      .comment("Año 3");
      table
      .integer("IND_META_AÑO_4")
      .notNullable()
      .comment("Año 4");
      table
      .integer("IND_CODPRY_PROYECTO")
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
