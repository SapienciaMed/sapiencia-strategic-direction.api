import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'GRP_GRUPO_ETNICO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene los grupos etnicos, pertenece a la tabla generica");
      table.increments("GPR_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("GPR_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción del grupo etnico");
      table
      .boolean("GPR_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("GPR_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
