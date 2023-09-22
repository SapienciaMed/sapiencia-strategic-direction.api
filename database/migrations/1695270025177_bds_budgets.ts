import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PPT_PRESUPUESTO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene las actividades MGA");
      table.increments("PPT_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("PTT_CODAMG_ACTIVIDAD")
      .notNullable()
      .unsigned()
      .references("AMG_CODIGO")
      .inTable("AMG_ACTIVIDAD_MGA")
      .comment("Codigo de la actividad (FK AMG)");
      table
      .integer("PPT_AÑO")
      .notNullable()
      .comment("numerico se acepta 0");
      table
      .integer("PPT_VIGENCIA")
      .notNullable()
      .comment("vigencia campo de 4 caracteres");
      table
      .integer("PPT_PRESUPUESTO")
      .notNullable()
      .comment("numerico");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
