import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PER_PERIODO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los periodos");
      table.increments("PER_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("PER_PERIODO")
      .notNullable()
      .comment("periodo");
      table
      .integer("PER_CANTIDAD")
      .notNullable()
      .comment("cantidad");
      table
      .double("PER_VALOR_UNITARIO")
      .notNullable()
      .comment("valor unitario");
      table
      .double("PER_VALOR_FINANCIERO")
      .notNullable()
      .comment("valor financiero");
      table
      .integer("PER_CODPER_BENEFICIO")
      .notNullable()
      .unsigned()
      .references("AIB_CODIGO")
      .inTable("AIB_AGREGAR_INGRESO_BENEFICIO")
      .comment("llave foranea de la tabla periodo (FK Agregar riesgo)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
