import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ACL_AÑADIR_CLASIFICACION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene la clasificacion");
      table.increments("ACL_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("ACL_CODPRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRY_CODIGO")
      .inTable("PRY_PROYECTOS")
      .comment("codigo del proyecto");
      table
      .integer("ACL_CLASIFICASION")
      .notNullable()
      .comment("campo hubicado en la tabla generica");
      table
      .integer("ACL_DETALLE")
      .notNullable()
      .comment("campo hubicado en la tabla generica");
      table
      .integer("ACL_NUMERO_PERSONAS")
      .comment("Numero de personas");
      table
      .text("ACL_INFORMACION")
      .comment("");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
