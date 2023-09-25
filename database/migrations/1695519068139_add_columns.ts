import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ARI_AGREGAR_RIESGO'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table.comment("Tabla que contiene los riesgos MGA");
      table
      .integer("ARI_CODPRY_PROYECTO")
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
