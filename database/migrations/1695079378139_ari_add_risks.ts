import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ARI_AGREGAR_RIESGO'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene las actividades MGA");
      table.increments("ARI_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("ARI_NIVEL")
      .notNullable()
      .comment("nivel asociado al riesgo");
      table
      .string("ARI_RIESGO_RELACIONADO")
      .notNullable()
      .comment("Riesgo relacionado");
      table
      .integer("ARI_TIPO_RIESGO")
      .notNullable()
      .unsigned()
      .references("TRI_CODIGO")
      .inTable("TRI_TIPO_RIESGOS")
      .comment("Tabla maestra (FK TRI_TIPO_RIESGOS)");
      table
      .text("ARI_DESCRIPCION_RIESGO")
      .notNullable()
      .comment("descripcion del riesgo");
      table
      .integer("ARI_PROBABILIDAD")
      .notNullable()
      .unsigned()
      .references("PRO_CODIGO")
      .inTable("PRO_PROBABILIDAD")
      .comment("Tabla maestra (FK PRO_PROBABILIDAD)");
      table
      .integer("ARI_IMPACTO")
      .notNullable()
      .comment("impacto");
      table
      .text("ARI_EFECTOS")
      .notNullable()
      .comment("efectos");
      table
      .text("ARI_MEDIDAS_MITIGACION")
      .notNullable()
      .comment("medidas de mitacion de la amenaza descripcion 500 caracteres");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
