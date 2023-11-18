import { BaseModel, BelongsTo, HasMany, belongsTo, column, hasMany } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";
import { ICause } from "App/Interfaces/ProjectInterfaces";
import Budgets from "./Budgets";
import DetailActivities from "./DetailsActivities";

export default class Activities extends BaseModel {
  public static table = "AMG_ACTIVIDAD_MGA";

  @column({ isPrimary: true, columnName: "AMG_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "AMG_CODLOE_OBJETIVO_ESPECIFICO", serializeAs: "objetiveActivity" })
  public objetiveActivity: ICause | number;

  @column({ columnName: "AMG_CODLET_ETAPA", serializeAs: "stageActivity" })
  public stageActivity: number;

  @column({ columnName: "AMG_NUMERO_PRODUCTO_MGA", serializeAs: "productMGA" })
  public productMGA: string;

  @column({ columnName: "AMG_NUMERO_ACTIVIDAD_MGA", serializeAs: "activityMGA" })
  public activityMGA: string;

  @column({ columnName: "AMG_PRODUCTO_MGA", serializeAs: "productDescriptionMGA" })
  public productDescriptionMGA: string;

  @column({ columnName: "AMG_DESCRIPCION_MGA", serializeAs: "activityDescriptionMGA" })
  public activityDescriptionMGA: string;

  @column({ columnName: "AMG_CODPRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;

  @hasMany(() => Budgets, {
    localKey: 'id',
    foreignKey: 'activityId',
  })
  public budgetsMGA: HasMany<typeof Budgets>;

  @hasMany(() => DetailActivities, {
    localKey: 'id',
    foreignKey: 'activityId',
  })
  public detailActivities: HasMany<typeof DetailActivities>;
}
