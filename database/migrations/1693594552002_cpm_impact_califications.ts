import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CMP_CALIFICACION_IMPACTO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los tipos de impactos");
      table.increments("CMP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("CMP_DESCRIPCION",50)
      .notNullable()
      .comment("Descripcion del tipo de impacto");
      table
      .boolean("CMP_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("CMP_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
