import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Pai from "./ActionPlan";

export default class RiskAsociate extends BaseModel {
  public static table = "RIA_RIESGO_ASOCIADO";

  @column({ isPrimary: true, columnName: "RIA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "RIA_RIESGO_ASOCIADO", serializeAs: "risk" })
  public risk: string;

  @column({ columnName: "RIA_CODIGO_PAI", serializeAs: "idPai" })
  public idPai: number;


  @belongsTo(() => Pai, {
    localKey: 'id',
    foreignKey: 'idPai',
  })
  public pai: BelongsTo<typeof Pai>;
}
