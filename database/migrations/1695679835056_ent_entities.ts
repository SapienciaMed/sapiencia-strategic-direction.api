import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ENT_ENTIDAD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene las entidades");
      table.increments("ENT_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("ENT_ETAPA")
      .notNullable()
      .unsigned()
      .references("LET_CODIGO")
      .inTable("LET_ETAPA")
      .comment("llave foranea de la tabla etapas(FK LET_ETAPA)");
      table
      .integer("ENT_TIPO_ENTIDAD")
      .notNullable()
      .unsigned()
      .references("FFI_CODIGO")
      .inTable("FFI_FUENTE_FINANCIACION")
      .comment("llav foranea fk FFI_FUENTE_FINANCIACION");
      table
      .integer("ENT_TIPO_RECURSO")
      .notNullable()
      .unsigned()
      .references("RCS_CODIGO")
      .inTable("RCS_RECURSO")
      .comment("Tabla maestra (FK RCS_RECURSO)");
      table
      .text("ENT_ENTIDAD")
      .notNullable()
      .comment("descripcion del riesgo");
      table
      .string("ENT_AÑO_0")
      .notNullable()
      .comment("Año 0");
      table
      .string("ENT_AÑO_1")
      .notNullable()
      .comment("Año 0");
      table
      .string("ENT_AÑO_2")
      .notNullable()
      .comment("Año 2");
      table
      .string("ENT_AÑO_3")
      .notNullable()
      .comment("Año 3");
      table
      .string("ENT_AÑO_4")
      .notNullable()
      .comment("Año 4");
      table
      .integer("ENT_CODPRY_PROYECTO")
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
