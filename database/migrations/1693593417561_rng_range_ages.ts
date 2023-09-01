import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RNG_RANGO_DE_EDAD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los rangos de edad, Pertenece a la tabla generica");
      table.increments("RNG_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("RNG_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción del rango de edad");
      table
      .boolean("RNG_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("RNG_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
