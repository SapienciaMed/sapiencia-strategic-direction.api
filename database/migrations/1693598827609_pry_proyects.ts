import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'PRY_PROYECTOS'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.comment("Tabla que almacena las entidades de los fondos");
      table.increments("PRY_CODIGO")
      .primary()
      .comment("Llave primaria");
      table
      .string("PRY_CODIGO_BPIN", 20)
      .nullable()
      .comment("Código de 20 dígitos que identifica el banco de proyectos de inversión nacional");
      table
      .string("PRY_NOMBRE_PROYECTO", 200)
      .nullable()
      .comment("Nombre del proyecto");
      table
      .integer("PRY_PERIODO_INICIAL", 4)
      .nullable()
      .comment("Año en el cual se crea el proyecto (4 dígitos)");
      table
      .integer("PRY_PERIODO_FINAL", 4)
      .nullable()
      .comment("Año en el cual se finaliza el proyecto (4 dígitos)");
      table
      .integer("PRY_CODPRC_PROCESO")
      .nullable()
      .unsigned()
      .references("PRC_CODIGO")
      .inTable("PRC_PROCESOS")
      .comment("codigo del Proceso (FK PRC_PROCESOS)");
      table
      .integer("PRY_CODDEP_DEPENDENCIA")
      .nullable()
      .unsigned()
      .references("DEP_CODIGO")
      .inTable("DEP_DEPENDENCIA")
      .comment("codigo de la Dependencia (FK DEP_DEPENDENCIA)");
      table
      .text("PRY_PACTO_PLAN_NACIONAL")
      .nullable()
      .comment("Descripción del pacto plan nacional");
      table
      .text("PRY_LINEA_PLAN_NACIONAL")
      .nullable()
      .comment("Descripción de la linea plan nacional");
      table
      .text("PRY_PROGRAMA_PLAN_NACIONAL")
      .nullable()
      .comment("Descripción del programa plan nacional");
      table
      .text("PRY_LINEA_PLAN_DEPARTAMENTAL")
      .nullable()
      .comment("Descripción de la linea plan departamental");
      table
      .text("PRY_COMPONENTES_PLAN_DEPARTAMENTAL")
      .nullable()
      .comment("Descripción de los componentes plan departamental");
      table
      .text("PRY_PROGRAMA_PLAN_DEPARTAMENTAL")
      .nullable()
      .comment("Descripción del programa plan departamental");
      table
      .text("PRY_LINEA_PLAN_DISTRITAL")
      .nullable()
      .comment("Descripción de la linea plan distrital");
      table
      .text("PRY_COMPONENTES_PLAN_DISTRITAL")
      .nullable()
      .comment("Descripción de los componentes plan distrital");
      table
      .text("PRY_PROGRAMA_PLAN_DISTRITAL")
      .nullable()
      .comment("Descripción del programa plan distrital");
      table
      .text("PYR_DETALLE_PROBLEMA")
      .nullable()
      .comment("Descripción detallada del problema");
      table
      .text("PRY_MAGNITUD")
      .nullable()
      .comment("Magnitud del problema");
      table
      .text("PRY_PROBLEMA_CENTRAL")
      .nullable()
      .comment("Descripción del problema central");
      table
      .text("PRY_INDICADORES")
      .nullable()
      .comment("Descripcion indicadores");
      table
      .integer("PRY_CODMED_MED_MEDIDAS")
      .nullable()
      .comment("unidad de medida (Listados Genericos)");
      table
      .decimal("PRY_META",10,2)
      .nullable()
      .comment("campo de tipo moneda ");
      table
      .text("PRY_OBJETIVO")
      .nullable()
      .comment("objetivo del proyecto");
      table
      .string("PRY_USUARIO",20)
      .nullable()
      .comment("objetivo del proyecto");
      table
      .integer("PRY_ESTADO_PROYECTO")
      .notNullable()
      .unsigned()
      .references("PRS_CODIGO")
      .inTable("PRS_PROYECTO_ESTADOS")
      .comment("codigo de los estados del proyecto ");
      table
      .integer("PRY_CODPRM_PRM_PARAMETROS")
      .nullable()
      .comment("localización");
      table
      .text("PRY_NOMBRE_ALTERNATIVA")
      .nullable()
      .comment("Nombre de la alternativa");
      table
      .text("PRY_RESUMEN_TECNICO_ALTERNATIVA")
      .nullable()
      .comment("Resumen tecnico de la alternativa");
      table
      .text("PRY_DESCRIPCION_CAPACIDAD")
      .nullable()
      .comment("Descripción de la capacidad");
      table
      .integer("PRY_CODUMC_UNIDAD_MEDIDA_CAPACIDAD")
      .nullable()
      .comment("llava foranea a la tabla unidad medida capacidad(FK UMC_UNIDAD_MEDIDA_CAPACIDAD");
      table
      .integer("PRY_CAPACIDAD_GENERADA")
      .nullable()
      .comment("");
      table
      .text("PRY_DIAGNOSTICO_AMBIENTAL")
      .nullable()
      .comment("");
      table
      .integer("PRY_NUMERO_PERSONA_OBJETIVO")
      .nullable()
      .comment("");
      table
      .string("PRY_FUENTE_INFORMACION", 300)
      .nullable()
      .comment("Descripcion de la fuente de información");
      table
      .integer("PRY_REGION")
      .nullable()
      .comment("campo perteneciente a la tabla generica");
      table
      .integer("PRY_DEPARTAMENTO")
      .nullable()
      .comment("campo perteneciente a la tabla generica");
      table
      .integer("PRY_MUNICIPIO")
      .nullable()
      .comment("campo perteneciente a la tabla generica");
      table
      .string("PRY_RESGUARDO", 100)
      .nullable()
      .comment("campo perteneciente a la tabla generica");
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
      .nullable()
      .comment("booleano con posibles valores True o False.");
      table
      .boolean("PRY_AMBIENTAL")
      .nullable()
      .comment("booleano con posibles valores True o False.");
      table
      .boolean("PRY_SOCIOCULTURAL")
      .nullable()
      .comment("booleano con posibles valores True o False.");
      table
      .text("PRY_OBSERVACIONES")
      .nullable()
      .comment("observaciones proyecto");
      table
      .timestamp("PRY_FECHA_CREO")
      .notNullable()
      .comment("Fecha y hora de creación del proyecto");
      table
      .timestamp("PRY_FECHA_MODIFICO")
      .nullable()
      .comment("Fecha y hora de la última modificación");
      table
      .text("PRY_VERSION")
      .nullable()
      .comment("Versiones del proyecto");
      table
      .text("PRY_TEMPTAB")
      .nullable()
      .comment("Ultima tab visitada en guardado temporal");
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
