import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import RiskAsociate from "./RiskAsociatePAI";
import { DateTime } from "luxon";
import ArticulationEstrategicPAi from "./ArticulationEstrategicPAI";

export default class ActionPlan extends BaseModel {
  public static table = "PAI_PLAN_ACCION_INSTITUCIONAL";

  @column({ isPrimary: true, columnName: "PAI_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PAI_AÑO", serializeAs: "yearPAI" })
  public yearPAI: number;

  @column({ columnName: "PAI_PRESUPUESTO", serializeAs: "budgetPAI" })
  public budgetPAI: number;

  @column({ columnName: "PAI_TIPO", serializeAs: "typePAI" })
  public typePAI: number;

  @column({ columnName: "PAI_NOMBRE_PROYECTO_PROCESO", serializeAs: "namePAI" })
  public namePAI: number;

  @column({ columnName: "PAI_OBJETIVO", serializeAs: "objectivePAI" })
  public objectivePAI: string;

  @column({ columnName: "PAI_ARTICULACION_PLAN_DESARROLLO_DISTRITAL", serializeAs: "articulationPAI" })
  public articulationPAI: string;

 
  @column({ columnName: "PAI_USUARIO", serializeAs: "user" })
  public user: string;

  @column.dateTime({
    autoCreate: true,
    columnName: "PAI_FECHA_CREO",
    serializeAs: "dateCreate",
  })
  public dateCreate: DateTime;

  @column({ columnName: "PAI_FECHA_MODIFICO", serializeAs: "dateModify" })
  public dateModify: Date;

  @column({ columnName: "PAI_VERSION", serializeAs: "version" })
  public version: string;

//RELACIONES

  @hasMany(() => ArticulationEstrategicPAi, {
    localKey: 'id',
    foreignKey: 'idPai',
  })
  public articulationPAi: HasMany<typeof ArticulationEstrategicPAi>;
  
  @hasMany(() => RiskAsociate, {
    localKey: 'id',
    foreignKey: 'idPai',
  })
  public riskAsociate: HasMany<typeof RiskAsociate>;

}
