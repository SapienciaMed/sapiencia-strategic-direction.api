import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'RPA_REVISION_PAI'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las revisiones de un PAI");
      table.increments("RPA_CODIGO")
        .primary()
        .comment("Llave primaria");
      table
        .integer("RPA_CODPAI_PAI_PLANEACION")
        .notNullable()
        .unsigned()
        .references("PAI_CODIGO")
        .inTable("PAI_PLAN_ACCION_INSTITUCIONAL")
        .comment("codigo del pai , llave foranea de la tabla proyecto PAI_PLAN_ACCION_INSTITUCIONAL (PAI_CODIGO)");
      table
        .json("RPA_JSON")
        .nullable()
        .comment("json que contiene la informacion de los campos con anormalidades");
      table
        .boolean("RFI_COMPLETADO")
        .notNullable()
        .comment("booleano con posibles valores True o False.");
      table
        .integer("RFI_VERSION")
        .notNullable()
        .comment("Version de la revision");
      table
        .string("RFI_USUARIO", 20)
        .notNullable()
        .comment("usuario que crea");
      table
        .datetime("RFI_FECHA_CREO")
        .notNullable()
        .comment("Fecha y hora de creación");
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
