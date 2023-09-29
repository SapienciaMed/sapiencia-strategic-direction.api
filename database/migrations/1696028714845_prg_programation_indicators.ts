import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRG_PROGRAMACION'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que describe los programas de indicadores");
      table.increments("PRG_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("PRG_DESCRIPCION")
      .notNullable()
      .comment("Nombre de los programas de indicadores");
      table
      .boolean("PRG_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("PRG_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
