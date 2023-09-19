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
      .integer("AIB_CODPER_PERIODO")
      .notNullable()
      .unsigned()
      .references("PER_CODIGO")
      .inTable("PER_PERIODO")
      .comment("llave foranea de la tabla periodo (FK PER)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
