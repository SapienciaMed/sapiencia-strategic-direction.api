import { BaseModel, HasOne, column, hasOne } from "@ioc:Adonis/Lucid/Orm";
import Causes from "./Causes";
import Effects from "./Effects";

export default class Projects extends BaseModel {
  public static table = "PRY_PROYECTOS";

  @column({ isPrimary: true, columnName: "PRY_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PRY_CODIGO_BPIN", serializeAs: "bpin" })
  public bpin: number;

  @column({ columnName: "PRY_NOMBRE_PROYECTO", serializeAs: "project" })
  public project: string;
  
  @column({ columnName: "PRY_PERIODO_INICIAL", serializeAs: "dateFrom" })
  public dateFrom: string;
  
  @column({ columnName: "PRY_PERIODO_FINAL", serializeAs: "dateTo" })
  public dateTo: string;

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

  @column({ columnName: "PRY_UNIDAD_MEDIDA", serializeAs: "measurement" })
  public measurement: string;

  @column({ columnName: "PRY_META", serializeAs: "goal" })
  public goal: number;

  @column({ columnName: "PRY_CODLCD_LISTA_CAUSA_DIRECTA", serializeAs: "cause" })
  public causeId: number;

  @column({ columnName: "PRY_CODLED_LISTA_EFECTOS_DIRECTOS", serializeAs: "effect" })
  public effectId: number;

  @hasOne(() => Causes, {
    localKey: "causeId",
    foreignKey: "id",
    serializeAs: "causes",
  })
  public causes: HasOne<typeof Causes>;

  @hasOne(() => Effects, {
    localKey: "effectId",
    foreignKey: "id",
    serializeAs: "effects",
  })
  public effects: HasOne<typeof Effects>;
}
