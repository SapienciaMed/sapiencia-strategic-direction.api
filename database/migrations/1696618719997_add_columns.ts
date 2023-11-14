import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRY_PROYECTOS'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table
      .timestamp("PRY_FECHA_CREO")
      .notNullable()
      .comment("Fecha y hora de creación del proyecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}

