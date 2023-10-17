import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MLO_MARCO_LOGICO'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table
      .text("PRY_VERSION")
      .notNullable()
      .comment("Versiones del proyecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
