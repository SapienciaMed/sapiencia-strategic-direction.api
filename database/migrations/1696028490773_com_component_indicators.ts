import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'COM_COMPONENTE'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que describe los componentes de indicadores");
      table.increments("COM_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("COM_DESCRIPCION")
      .notNullable()
      .comment("Nombre del componente");
      table
      .boolean("COM_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("COM_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
