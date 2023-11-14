import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MLO_MARCO_LOGICO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene el marco logico");
      table.increments("MLO_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("MLO_RESUMEN_NARRATIVO")
      .notNullable()
      .comment("resumen lista de valores");
      table
      .text("MLO_DESCRIPCION")
      .notNullable()
      .comment("descripcion relacionada con el campo anterior");
      table
      .text("MLO_CODIDC_NOMBRE_INDICADOR")
      .notNullable()
      .comment("descripcion relacionada con el campo anterior indicadores");
      table
      .text("MLO_META_INDICADOR")
      .notNullable()
      .comment("Meta indicador, se carga de indicadores meta global");
      table
      .text("MLO_FUENTE_VERIFICACION")
      .nullable()
      .comment("fuenta de verificacion 500 caracteres");
      table
      .text("MLO_SUPUESTO")
      .nullable()
      .comment("supuestos 500 caracteres");
      table
      .integer("MLO_CODPRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRY_CODIGO")
      .inTable("PRY_PROYECTOS")
      .comment("codigo del proyecto");
      table
      .integer("MLO_TIPO_INDICADOR")
      .notNullable()
      .comment("tipo de indicador seleccionado en indicadores");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
