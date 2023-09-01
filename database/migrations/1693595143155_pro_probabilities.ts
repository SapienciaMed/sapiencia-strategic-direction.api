import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRO_PROBABILIDAD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestro que contiene la probabilidad del riesgo");
      table.increments("PRO_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("PRO_DESCRIPCION",50)
      .notNullable()
      .comment("descripcion de  la probabilidad ");
      table
      .boolean("PRO_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("PRO_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
