import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'AIB_AGREGAR_INGRESO_BENEFICIO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla ingreso beneficios");
      table.increments("AIB_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("AIB_TIPO")
      .notNullable()
      .comment("tipo");
      table
      .text("AIB_DESCRIPCION")
      .notNullable()
      .comment("descripcion");
      table
      .integer("AIB_NUMERO")
      .notNullable()
      .comment("numero");
      table
      .integer("AIB_CODPRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRY_CODIGO")
      .inTable("PRY_PROYECTOS")
      .comment("codigo del proyecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
