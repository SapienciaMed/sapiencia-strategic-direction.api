import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'LEA_EFECTOS_AMBIENTALES'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que lista los efectos ambientales");
      table.increments("LEA_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .integer("LEA_CODTMP_TIPO_IMPACTO")
      .unsigned()
      .references("TMP_CODIGO")
      .inTable("TMP_TIPO_IMPACTO")
      .comment("llave foranea a la tabla tipo de impacto (FK TMP_TIPO_IMPACTO)");
      table
      .text("LEA_IMPACTO")
      .comment("Descripcion del impacto campo alfa numerico de 300caracteres");
      table
      .integer("LEA_CODNMP_NIVEL_IMPACTO")
      .unsigned()
      .references("NMP_CODIGO")
      .inTable("NMP_NIVEL_IMPACTO")
      .comment("llave foranea a la tabla nivel impacto(FK NMP_NIVEL_IMPACTO)");
      table
      .integer("LEA_CODCPM_CLASIFICACION_IMPACTO")
      .unsigned()
      .references("CMP_CODIGO")
      .inTable("CMP_CALIFICACION_IMPACTO")
      .comment("llave foranea a la tabla clasificación impacto(FK CMP_CLASIFICACION_IMPACTO)");
      table
      .text("LEA_MEDIDAS_MITIGACION")
      .comment("descripcion de la medidad de mitigacion, campo alfa numerico 500 caracteres");
      table
      .integer("LEA_CODPRY_PRY_PROYECTO")
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
