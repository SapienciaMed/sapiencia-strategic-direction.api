import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Effects from "./Effects";

export default class EffectsIndirect extends BaseModel {
  public static table = "LEI_LISTADO_EFECTOS_INDIRECTOS";

  @column({ isPrimary: true, columnName: "LEI_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LEI_TIPO", serializeAs: "type" })
  public type: string;

  @column({ columnName: "LEI_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "LEI_CODLED_EFECTO_DIRECTO", serializeAs: "effectId" })
  public effectId: number;

  @belongsTo(() => Effects, {
    localKey: 'id',
    foreignKey: 'effectId',
  })
  public effect: BelongsTo<typeof Effects>;
}
