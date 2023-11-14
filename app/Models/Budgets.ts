import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Activities from "./Activities";

export default class Budgets extends BaseModel {
  public static table = "PPT_PRESUPUESTO";

  @column({ isPrimary: true, columnName: "PPT_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "PTT_CODAMG_ACTIVIDAD", serializeAs: "activityId" })
  public activityId: number;

  @column({ columnName: "PPT_AÑO", serializeAs: "year" })
  public year: number;

  @column({ columnName: "PPT_VIGENCIA", serializeAs: "validity" })
  public validity: number;

  @column({ columnName: "PPT_PRESUPUESTO", serializeAs: "budget" })
  public budget: number;

  @belongsTo(() => Activities, {
    localKey: 'id',
    foreignKey: 'activityId',
  })
  public activity: BelongsTo<typeof Activities>;
}
