import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LRE_REGION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene las 5 regiones colombianas, hace parte de la tabla generica");
      table.increments("LRE_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LRE_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción del proceso");
      table
      .boolean("LRE_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("LRE_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
