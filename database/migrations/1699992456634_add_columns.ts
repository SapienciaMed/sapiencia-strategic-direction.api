import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'AMG_ACTIVIDAD_MGA'

  public async up () {
    // Agregando las nuevas columnas
    this.schema.table(this.tableName, (table) => {
      table
      .integer("AMG_VIGENCIA_MGA")
      .comment("");
      table
      .integer("AMG_ANIO_MGA")
      .comment("");
    });
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
