import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'POS_POSICION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestro que almacena las posiciones de los ciudadanos ante Sapiencia");
      table.increments("POS_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("POS_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de la posición");
      table
      .boolean("POS_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("POS_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
