import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'SHP_CRONOGRAMAS_PAI'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena los cronogramas de un PAI");
      table.increments("SHP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("SHP_CODPAI_PLANEACION")
      .notNullable()
      .unsigned()
      .references("PAI_CODIGO")
      .inTable("PAI_PLANEACION")
      .comment("codigo de la planeacion");
      table
      .integer("SHP_ROL")
      .nullable()
      .comment("rol");
      table
      .integer("SHP_CODSCS_ESTADO")
      .notNullable()
      .unsigned()
      .references("SCS_CODIGO")
      .inTable("SCS_ESTADOS_CRONOGRAMAS")
      .comment("codigo del estado");
      table
      .integer("SHP_BIMESTRE")
      .nullable()
      .comment("bimestre");
      table
      .timestamp("PRY_FECHA_INICIO")
      .notNullable()
      .comment("Fecha de inicio");
      table
      .timestamp("PRY_FECHA_FINAL")
      .notNullable()
      .comment("Fecha de final");
      table
      .string("PRY_USUARIO",20)
      .nullable()
      .comment("objetivo del proyecto");
      table
      .timestamp("PRY_FECHA_CREO")
      .notNullable()
      .comment("Fecha y hora de creación del cronograma");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
