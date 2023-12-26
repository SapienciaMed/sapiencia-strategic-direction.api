import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CPAC_COMPONENTE_PLAN_ANTICORRUPCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los campos de los componentes de los planes anticorrupcion");
      table.increments("CPAC_CODIGO")
      .primary()
      .comment("Llave primaria");

      table
      .string("CPAC_DESCRIPCION")
      .nullable()
      .comment("Descripcion del componente del plan anticorrupcion");

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
