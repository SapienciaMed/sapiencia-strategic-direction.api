import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'UMC_UNIDAD_MEDIDA_CAPACIDAD'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla maestra que contiene la unidad de medidad capacidad Pertenece a la tabla generica");
      table.increments("UMC_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("UMC_DESCRIPCION",50)
      .notNullable()
      .comment("Descripción de la unidad de medidad capacidad");
      table
      .boolean("UMC_ACTIVO")
      .notNullable()
      .comment("booleano con posibles valores True o False.");
      table
      .integer("UMC_ORDEN")
      .notNullable()
      .comment("Valor que indica el orden");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
