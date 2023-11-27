import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'HPR_HISTORICO_PROYECTOS'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las diferentes versiones para un proyecto");
      table.increments("HPR_CODIGO")
        .primary()
        .comment("Llave primaria");
      table
        .integer("HPR_CODPRY_PROYECTO")
        .notNullable()
        .unsigned()
        .references("PRY_CODIGO")
        .inTable("PRY_PROYECTOS")
        .comment("codigo del proyecto");
      table
        .string("HPR_VERSION", 20)
        .nullable()
        .comment("version del historico");
      table
        .json("HPR_JSON")
        .nullable()
        .comment("json que contiene la informacion del historico");
      table
        .string("HPR_USUARIO", 20)
        .nullable()
        .comment("usuario que creo el historico");
      table
        .timestamp("HPR_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creación del historico");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
