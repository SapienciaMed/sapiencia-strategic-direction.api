import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'AMG_ACTIVIDAD_MGA'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene las actividades MGA");
      table.increments("AMG_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("AMG_CODLOE_OBJETIVO_ESPECIFICO")
      .notNullable()
      .unsigned()
      .references("LOE_CODIGO")
      .inTable("LOE_OBJETIVO_ESPECIFICO")
      .comment("llave foranea tabla objetivo especifico(FK LOE_OBJETIVO_ESPECIFICO)");
      table
      .integer("AMG_CODLET_ETAPA")
      .notNullable()
      .unsigned()
      .references("LET_CODIGO")
      .inTable("LET_ETAPA")
      .comment("llave foranea de la tabla etapas(FK LET_ETAPA)");
      table
      .string("AMG_NUMERO_PRODUCTO_MGA",10)
      .notNullable()
      .comment("numero producto MGA");
      table
      .string("AMG_NUMERO_ACTIVIDAD_MGA",10)
      .notNullable()
      .comment("numero actividad MGA");
      table
      .text("AMG_PRODUCTO_MGA")
      .comment("Descripcion producto MGA");
      table
      .text("AMG_DESCRIPCION_MGA")
      .comment("Descripcion actividad MGA");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
