import { BaseModel, HasMany, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import EffectsIndirect from "./EffectsIndirect";

export default class Effects extends BaseModel {
  public static table = "LED_LISTADO_EFECTOS_DIRECTOS";

  @column({ isPrimary: true, columnName: "LED_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LED_TIPO", serializeAs: "type" })
  public type: string;

  @column({ columnName: "LED_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @hasMany(() => EffectsIndirect, {
    foreignKey: 'effectId',
  })
  public childrens: HasMany<typeof EffectsIndirect>;
}
