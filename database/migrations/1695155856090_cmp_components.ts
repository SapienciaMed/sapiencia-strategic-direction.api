import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'CMP_COMPONENTE'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los componentes");
      table.increments("CMP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("CMP_DESCRIPCION",50)
      .notNullable()
      .comment("descripcion");
      table
      .boolean("CMP_ACTIVO")
      .notNullable()
      .comment("estado del componente");
      table
      .integer("CMP_ORDEN")
      .notNullable()
      .comment("orden del componente");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
