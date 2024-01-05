import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RPA_RESPONSABLE_PLAN_ANTICORRUPCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los campos de los indicadores de los planes anticorrupcion");
      table.string("RPA_UUID").notNullable().comment("_id unico");
      table.increments("RPA_CODIGO")
      .primary()
      .comment("Llave primaria");

      table
      .string("RPA_DESCRIPCION")
      .nullable()
      .comment("Descripcion del componente del plan anticorrupcion");

      table
      .string("IPA_UUID")
      .nullable()
      .references("IPA_UUID")
      .inTable("IPA_INDICADOR_PLAN_ANTICORRUPCION")
      .comment("llave foranea de la tabla de actividades de plan anticorrupcion (FK IPA_UUID)");

      table
      .integer("PAC_CODIGO")
      .nullable()
      .unsigned()
      .references("PAC_CODIGO")
      .inTable("PAC_PLAN_ANTICORRUPCION")
      .comment("llave foranea de la tabla de plan anticorrupcion (FK PAC_CODIGO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
