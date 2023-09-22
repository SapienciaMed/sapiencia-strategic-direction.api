import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Activities from "./Activities";

export default class DetailActivities extends BaseModel {
  public static table = "ACD_ACTIVIDAD_DETALLADA";

  @column({ isPrimary: true, columnName: "ACD_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ACD_AMG_ACTIVIDAD_MGA", serializeAs: "activityId" })
  public activityId: number;

  @column({ columnName: "ACD_NUMERO", serializeAs: "consecutive" })
  public consecutive: string;

  @column({ columnName: "ACD_DESCRIPCION", serializeAs: "detailActivity" })
  public detailActivity: string;

  @column({ columnName: "ACD_COMPONENTE", serializeAs: "component" })
  public component: number;

  @column({ columnName: "ACD_UNIDAD_MEDIDA", serializeAs: "measurement" })
  public measurement: number;

  @column({ columnName: "ACD_CANTIDAD", serializeAs: "amount" })
  public amount: number;

  @column({ columnName: "ACD_COSTO_UNITARIO", serializeAs: "unitCost" })
  public unitCost: number;

  @column({ columnName: "ACD_OBJETIVO_GASTO_POSPRE", serializeAs: "pospre" })
  public pospre: number;

  @column({ columnName: "ACD_VALIDADOR_CPC", serializeAs: "validatorCPC" })
  public validatorCPC: string;

  @column({ columnName: "ACD_CLASIFICADOR_CPC", serializeAs: "clasificatorCPC" })
  public clasificatorCPC: number;

  @column({ columnName: "ACD_VALIDADOR_SECCION_CPC", serializeAs: "sectionValidatorCPC" })
  public sectionValidatorCPC: string;

  @belongsTo(() => Activities, {
    localKey: 'id',
    foreignKey: 'activityId',
  })
  public activity: BelongsTo<typeof Activities>;
}
