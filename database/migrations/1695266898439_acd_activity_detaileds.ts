import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ACD_ACTIVIDAD_DETALLADA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene la actividad detallada");
      table.increments("ACD_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("ACD_AMG_ACTIVIDAD_MGA")
      .notNullable()
      .unsigned()
      .references("AMG_CODIGO")
      .inTable("AMG_ACTIVIDAD_MGA")
      .comment("Codigo de la actividad MGA (FK AMG)");
      table
      .datetime("ACD_VIGENCIA")
      .notNullable()
      .comment("Fecha de vigencia");
      table
      .string("ACD_AÑO",4)
      .notNullable()
      .comment("un año representado en 4 caracteres");
      table
      .string("ACD_NUMERO",10)
      .notNullable()
      .comment("numero de la actividad ");
      table
      .text("ACD_DESCRIPCION")
      .notNullable()
      .comment("Descripcion detallada de la actividad");
      table
      .string("ACD_COMPONENTE",30)
      .notNullable()
      .comment("componente se carga de la tabla maestra");
      table
      .string("ACD_UNIDAD_MEDIDA",30)
      .notNullable()
      .comment("se carga de la tabla maestra UNIDAD_MEDIDA");
      table
      .integer("ACD_CANTIDAD")
      .notNullable()
      .comment("cantidad");
      table
      .integer("ACD_COSTO_UNITARIO")
      .notNullable()
      .comment("costo unitario");
      table
      .integer("ACD_COSTO_TOTAL")
      .notNullable()
      .comment("es el resultado de multiplicar cantidad * costo unitario");
      table
      .integer("ACD_OBJETIVO_GASTO_POSPRE")
      .notNullable()
      .comment("se carga de la tabla maestra POSPRE");
      table
      .string("ACD_VALIDADOR_CPC",2)
      .notNullable()
      .comment("solo dos posibles valores si ó no ");
      table
      .integer("ACD_CLASIFICADOR_CPC")
      .notNullable()
      .comment("se carga de la tabla maestra  CPC");
      table
      .string("ACD_VALIDADOR_SECCION_CPC",3)
      .notNullable()
      .comment("se carga de la tabla maestra  CPC");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
