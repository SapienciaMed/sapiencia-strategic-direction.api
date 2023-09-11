import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'BYS_BIENES_SERVICIOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los bienes y servicios");
      table.increments("BYS_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("BYS_DESCRIPCION")
      .notNullable()
      .comment("Descripcion del bien o servicio");
      table
      .integer("BYS_CODLOE_OBJETIVO_ESPECIFICO")
      .notNullable()
      .unsigned()
      .references("LOE_CODIGO")
      .inTable("LOE_OBJETIVO_ESPECIFICO")
      .comment("llave foranea tabla objetivo especifico(FK LOE_OBJETIVO_ESPECIFICO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
