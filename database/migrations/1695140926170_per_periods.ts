import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PER_PERIODO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene las actividades MGA");
      table.increments("PER_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .double("PER_PERIODO")
      .notNullable()
      .comment("periodo");
      table
      .double("PER_CANTIDAD")
      .notNullable()
      .comment("cantidad");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
