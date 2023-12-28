import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PAC_PLAN_ANTICORRUPCION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los campos de los planes anticorrupcion");
      table.increments("PAC_CODIGO")
      .primary()
      .comment("Llave primaria");

      table
      .string("PAC_NOMBRE")
      .notNullable()
      .comment("Nombre del planr");

      table
      .string("PAC_FECHA", 20)
      .nullable()
      .comment("Fecha creacion");

      table
      .integer("PAC_STATUS")
      .nullable()
      .unsigned()
      .references("EPA_CODIGO")
      .inTable("EPA_ESTADOS_PLAN_ANTICORRUPCION")
      .comment("llave foranea de la tabla estados de plan anticorrupcion (FK EPA_CODIGO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
