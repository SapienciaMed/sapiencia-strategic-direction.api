import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Pai from "./ActionPlan";
import IndicatorsPAI from "./PAIIndicators";

export default class ActionPAI extends BaseModel {
  public static table = "ACC_ACCIONES_PAI";

  @column({ isPrimary: true, columnName: "ACC_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ACC_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "ACC_CODIGO_PAI", serializeAs: "idPai" })
  public idPai: number;

  @hasMany(() => IndicatorsPAI, {
    localKey: 'id',
    foreignKey: 'actionId',
  })
  public indicators: HasMany<typeof IndicatorsPAI>;

  @belongsTo(() => Pai, {
    localKey: 'id',
    foreignKey: 'idPai',
  })
  public pai: BelongsTo<typeof Pai>;
}

