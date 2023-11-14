import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LOE_OBJETIVO_ESPECIFICO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla para los objetivos especificos del proyecto");
      table.increments("LOE_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("LOE_CODPRY_PRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRY_CODIGO")
      .inTable("PRY_PROYECTOS")
      .comment("llave foranea de la tabla proyecto(FK PRY_PROYECTOS)");
      table
      .integer("LOE_OBJETIVO")
      .notNullable()
      .comment("");
      table
      .text("LOE_ACCIONES_INTERVENCION")
      .notNullable()
      .comment("");
      table
      .integer("LOE_CUANTIFICACION")
      .notNullable()
      .comment("");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
