import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LED_LISTADO_EFECTOS_DIRECTOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena el listado de efectos directos");
      table.increments("LED_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("LED_NUMERO", 5)
      .notNullable()
      .comment("Numero que identifica la Efecto");
      table
      .string("LED_DESCRIPCION")
      .notNullable()
      .comment("Descripcion del efecto");
      table
      .integer("LED_CODPRY_PRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRY_CODIGO	")
      .inTable("PRY_PROYECTOS")
      .comment("codigo del proyecto , llave foranea de la tabla proyecto PRY_PROYECTOS (PRY_CODIGO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
