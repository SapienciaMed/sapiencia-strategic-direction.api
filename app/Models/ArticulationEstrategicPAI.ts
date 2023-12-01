import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Pai from "./ActionPlan";

export default class ArticulationEstrategicPAi extends BaseModel {
  public static table = "APE_ARTICULACION_PLAN_ESTRATEGICO";

  @column({ isPrimary: true, columnName: "APE_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "APE_LINEA", serializeAs: "description" })
  public description: string;

  @column({ columnName: "APE_CODIGO_PAI", serializeAs: "idPai" })
  public idPai: number;


  @belongsTo(() => Pai, {
    localKey: 'id',
    foreignKey: 'idPai',
  })
  public pai: BelongsTo<typeof Pai>;
}
