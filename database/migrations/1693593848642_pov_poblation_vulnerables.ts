import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'POV_POBLACION_VULNERABLE'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene las poblaciones vulnerables");
      table.increments("POV_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("POV_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de la población vulnerable");
      table
      .boolean("POV_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("POV_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
