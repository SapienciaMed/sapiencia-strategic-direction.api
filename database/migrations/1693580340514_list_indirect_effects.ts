import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LEI_LISTADO_EFECTOS_INDIRECTOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena el listado de efectos indirectos");
      table.increments("LEI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LEI_TIPO", 20)
      .notNullable()
      .comment("Tipó de efecto puede ser directo o indirecto");
      table
      .string("LEI_DESCRIPCION")
      .notNullable()
      .comment("Descripcion del efecto");
      table
      .integer("LEI_CODLED_EFECTO_DIRECTO")
      .notNullable()
      .unsigned()
      .references("LED_CODIGO")
      .inTable("LED_LISTADO_EFECTOS_DIRECTOS")
      .comment("Codigo del Efecto directo (FK LED_LISTADO_EFECTOS_DIRECTOS)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
