import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LDO_LISTADO_OBJETIVOS_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena la Lista de objetivos ");
      table.increments("LDO_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("LDO_DESCRIPCION")
      .notNullable()
      .comment("Descripcion del objetivo");
      table
      .boolean("LDO_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("LDO_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
