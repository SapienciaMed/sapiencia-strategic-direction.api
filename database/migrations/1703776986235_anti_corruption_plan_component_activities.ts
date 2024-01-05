import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ACPA_ACTIVIDAD_COMPONENTE_PLAN_ANTICORRUPCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los campos de las actividades de los planes anticorrupcion");
      table.string("ACPA_UUID").notNullable().comment("_id unico");
      table.increments("ACPA_CODIGO")
      .primary()
      .comment("Llave primaria");

      table
      .string("ACPA_DESCRIPCION")
      .nullable()
      .comment("Descripcion del componente del plan anticorrupcion");

      table
      .string("CPAC_UUID")
      .nullable()
      .references("CPAC_UUID")
      .inTable("CPAC_COMPONENTE_PLAN_ANTICORRUPCION")
      .comment("llave foranea de la tabla de componentes de plan anticorrupcion (FK CPAC_UUID)");

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
