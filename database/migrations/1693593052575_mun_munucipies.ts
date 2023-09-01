import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'MUN_MUNICIPIO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra generica que contiene los departamentos");
      table.increments("MUN_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("MUN_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de los municipios");
      table
      .boolean("MUN_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("MUN_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
