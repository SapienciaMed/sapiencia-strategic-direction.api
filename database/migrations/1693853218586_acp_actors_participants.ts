import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'ACP_ACTORES_PARTICIPANTES'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que contiene los campos de los actores participantes");
      table.increments("ACP_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .text("ACP_ACTOR")
      .notNullable()
      .comment("Descripción del actor");
      table
      .text("ACP_INTERES_EXPECTATIVA", 'longtext')
      .notNullable()
      .comment("interes o espectativa");
      table
      .integer("ACP_CODPOS_POSICION")
      .nullable()
      .unsigned()
      .references("POS_CODIGO")
      .inTable("POS_POSICION")
      .comment("llave foranea de la tabla Posicion(FK POS_POSICION)");
      table
      .text("ACP_CONTRIBUICION", 'longtext')
      .notNullable()
      .comment("Campo que almacena la informacion relacionanda con la contribucion");
      table
      .integer("ACP_CODPRY_PRY_PROYECTO")
      .nullable()
      .unsigned()
      .references("PRY_CODIGO")
      .inTable("PRY_PROYECTOS")
      .comment("llave foranea de la tabla pry proyecto (FK PRY_CODIGO)");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
