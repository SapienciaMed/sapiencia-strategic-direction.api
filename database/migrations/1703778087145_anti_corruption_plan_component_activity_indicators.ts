import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'IPA_INDICADOR_PLAN_ANTICORRUPCION'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los campos de los indicadores de los planes anticorrupcion");
      table.string("IPA_UUID").notNullable().comment("_id unico");
      table.increments("IPA_CODIGO")
        .primary()
        .comment("Llave primaria");

      table.integer("IPA_META_CUATRIMESTRE1").notNullable().comment("");
      table.integer("IPA_META_CUATRIMESTRE2").notNullable().comment("");
      table.integer("IPA_META_CUATRIMESTRE3").notNullable().comment("");
      table.string("IPA_UNIDAD_MEDIDA1").notNullable().comment("");
      table.string("IPA_UNIDAD_MEDIDA2").notNullable().comment("");
      table.string("IPA_UNIDAD_MEDIDA3").notNullable().comment("");

      table
        .string("IPA_DESCRIPCION")
        .nullable()
        .comment("Descripcion del componente del plan anticorrupcion");

      table
        .string("ACPA_UUID")
        .nullable()
        .references("ACPA_UUID")
        .inTable("ACPA_ACTIVIDAD_COMPONENTE_PLAN_ANTICORRUPCION")
        .comment("llave foranea de la tabla de actividades de plan anticorrupcion (FK ACPA_UUID)");

      table
        .integer("PAC_CODIGO")
        .nullable()
        .unsigned()
        .references("PAC_CODIGO")
        .inTable("PAC_PLAN_ANTICORRUPCION")
        .comment("llave foranea de la tabla de plan anticorrupcion (FK PAC_CODIGO)");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
