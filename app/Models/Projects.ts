import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Effects from "./Effects";
import Causes from "./Causes";
import Actors from "./Actors";

export default class Projects extends BaseModel {
  public static table = "PRY_PROYECTOS";

  @column({ isPrimary: true, columnName: "PRY_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PRY_CODIGO_BPIN", serializeAs: "bpin" })
  public bpin: number;

  @column({ columnName: "PRY_NOMBRE_PROYECTO", serializeAs: "project" })
  public project: string;

  @column({ columnName: "PRY_PERIODO_INICIAL", serializeAs: "dateFrom" })
  public dateFrom: number;

  @column({ columnName: "PRY_PERIODO_FINAL", serializeAs: "dateTo" })
  public dateTo: number;

  @column({ columnName: "PRY_CODPRC_PROCESO", serializeAs: "process" })
  public process: number;

  @column({ columnName: "PRY_CODDEP_DEPENDENCIA", serializeAs: "dependency" })
  public dependency: number;

  @column({ columnName: "PRY_PACTO_PLAN_NACIONAL", serializeAs: "pnd_pacto" })
  public pnd_pacto: string;

  @column({ columnName: "PRY_LINEA_PLAN_NACIONAL", serializeAs: "pnd_linea" })
  public pnd_linea: string;

  @column({ columnName: "PRY_PROGRAMA_PLAN_NACIONAL", serializeAs: "pnd_programa" })
  public pnd_programa: string;

  @column({ columnName: "PRY_LINEA_PLAN_DEPARTAMENTAL", serializeAs: "pdd_linea" })
  public pdd_linea: string;

  @column({ columnName: "PRY_COMPONENTES_PLAN_DEPARTAMENTAL", serializeAs: "pdd_componentes" })
  public pdd_componentes: string;

  @column({ columnName: "PRY_PROGRAMA_PLAN_DEPARTAMENTAL", serializeAs: "pdd_programa" })
  public pdd_programa: string;

  @column({ columnName: "PRY_LINEA_PLAN_DISTRITAL", serializeAs: "pdi_linea" })
  public pdi_linea: string;

  @column({ columnName: "PRY_COMPONENTES_PLAN_DISTRITAL", serializeAs: "pdi_componentes" })
  public pdi_componentes: string;

  @column({ columnName: "PRY_PROGRAMA_PLAN_DISTRITAL", serializeAs: "pdi_programa" })
  public pdi_programa: string;

  @column({ columnName: "PYR_DETALLE_PROBLEMA", serializeAs: "problemDescription" })
  public problemDescription: string;

  @column({ columnName: "PRY_MAGNITUD", serializeAs: "magnitude" })
  public magnitude: string;

  @column({ columnName: "PRY_PROBLEMA_CENTRAL", serializeAs: "centerProblem" })
  public centerProblem: string;

  @column({ columnName: "PRY_INDICADORES", serializeAs: "indicators" })
  public indicators: string;

  @column({ columnName: "PRY_CODMED_MED_MEDIDAS", serializeAs: "measurement" })
  public measurement: number;

  @column({ columnName: "PRY_META", serializeAs: "goal" })
  public goal: number;

  @column({ columnName: "PRY_OBJETIVO", serializeAs: "object" })
  public object: string;

  @column({ columnName: "PRY_USUARIO", serializeAs: "user" })
  public user: string;

  @column({
    columnName: "PRY_ESTADO_PROYECTO",
    serializeAs: "state",
    prepare: (val) => String(val) === "true" ? 1 : 0,
    serialize: (val) => Boolean(val)
  })
  public status: boolean;

  @column({ columnName: "PRY_CODPRM_PRM_PARAMETROS", serializeAs: "localitation" })
  public localitation: number;

  @hasMany(() => Causes, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public causes: HasMany<typeof Causes>;
  
  @hasMany(() => Effects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public effects: HasMany<typeof Effects>;

  @hasMany(() => Actors, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public actors: HasMany<typeof Actors>;
}
