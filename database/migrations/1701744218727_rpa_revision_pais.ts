import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RPA_REVISION_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las revisiones de un PAI");
      table.increments("RPA_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("RPA_CODPAI_PAI_PLANEACION")
      .notNullable()
      .unsigned()
      .references("PAI_PLAN_ACCION_INSTITUCIONAL")
      .inTable("PAI_CODIGO")
      .comment("codigo del proyecto , llave foranea de la tabla proyecto PRY_PROYECTOS (PRY_CODIGO)");

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
