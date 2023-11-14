import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PAI_PLANEACION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los planes de acción institucional");
      table.increments("PAI_CODIGO")
      .primary()
      .comment("Llave primaria");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
