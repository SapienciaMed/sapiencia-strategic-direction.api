import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRY_PROYECTOS'

  public async up () {
    this.schema.table(this.tableName, (table) => {
      table
      .integer("PRS_CODPRY_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRS_CODIGO")
      .inTable("PRS_PROYECTO_ESTADOS")
      .comment("codigo de los estados del proyecto ");
      table
      .text("PRY_FORMULADOR")
      .nullable()
      .comment("Formulador (nombre completo)");
      table
      .text("PRY_ROL")
      .nullable()
      .comment("rol");
      table
      .text("PRY_ORDEN")
      .nullable()
      .comment("ordenador del gasto");
      table
      .boolean("PRY_TECNICAS")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .boolean("PRY_AMBIENTAL")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .boolean("PRY_SOCIOCULTURAL")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .text("PRY_OBSERVACIONES")
      .nullable()
      .comment("observaciones proyecto");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
