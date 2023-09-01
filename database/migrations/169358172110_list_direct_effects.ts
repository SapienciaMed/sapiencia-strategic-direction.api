import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LED_LISTADO_EFECTOS_DIRECTOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena el listado de efectos directos");
      table.increments("LED_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LED_TIPO", 20)
      .notNullable()
      .comment("Tipó de efecto puede ser directo o indirecto");
      table
      .string("LED_DESCRIPCION")
      .notNullable()
      .comment("Descripcion del efecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
