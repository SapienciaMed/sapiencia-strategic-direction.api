import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";
import Period from "./Period";



export default class ProfitsIncome extends BaseModel {
  public static table = "AIB_AGREGAR_INGRESO_BENEFICIO";

  @column({ isPrimary: true, columnName: "AIB_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "AIB_TIPO", serializeAs: "type" })
  public type: string;

  @column({ columnName: "AIB_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "AIB_NUMERO", serializeAs: "unit" })
  public unit: number;

  @column({ columnName: "AIB_CODPRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;

  @hasMany(() => Period, {
    localKey: 'id',
    foreignKey: 'idProfit',
  })
  public period: HasMany<typeof Period>;
}
