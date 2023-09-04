import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Causes from "./Causes";

export default class CausesIndirect extends BaseModel {
  public static table = "LCI_LISTADO_CAUSA_INDIRECTA";

  @column({ isPrimary: true, columnName: "LCI_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LCI_NUMERO", serializeAs: "consecutive" })
  public consecutive: string;

  @column({ columnName: "LCI_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "LCI_CODLCD_CAUSA_DIRECTA", serializeAs: "causeId" })
  public causeId: number;

  @belongsTo(() => Causes, {
    foreignKey: 'causeId',
  })
  public cause: BelongsTo<typeof Causes>;
}
