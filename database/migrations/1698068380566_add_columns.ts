import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRY_PROYECTOS'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table
      .text("PRY_OBSERVACIONES_PROYECTO")
      .nullable()
      .comment("observaciones del proyecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
