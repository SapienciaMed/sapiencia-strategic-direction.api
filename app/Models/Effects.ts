import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import EffectsIndirect from "./EffectsIndirect";
import Projects from "./Projects";

export default class Effects extends BaseModel {
  public static table = "LED_LISTADO_EFECTOS_DIRECTOS";

  @column({ isPrimary: true, columnName: "LED_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LED_NUMERO", serializeAs: "consecutive" })
  public consecutive: string;

  @column({ columnName: "LED_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "LED_CODPRY_PRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @hasMany(() => EffectsIndirect, {
    foreignKey: 'effectId',
  })
  public childrens: HasMany<typeof EffectsIndirect>;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;
}
