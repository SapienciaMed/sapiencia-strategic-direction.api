import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import CausesIndirect from "./CausesIndirect";
import Projects from "./Projects";

export default class Causes extends BaseModel {
  public static table = "LCD_LISTADO_CAUSA_DIRECTA";

  @column({ isPrimary: true, columnName: "LCD_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LCD_NUMERO", serializeAs: "consecutive" })
  public consecutive: string;

  @column({ columnName: "LCD_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "LCD_CODPRY_PRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @hasMany(() => CausesIndirect, {
    localKey: 'id',
    foreignKey: 'causeId',
  })
  public childrens: HasMany<typeof CausesIndirect>;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;
}
