import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";



export default class Risks extends BaseModel {
  public static table = "ARI_AGREGAR_RIESGO";

  @column({ isPrimary: true, columnName: "ARI_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ARI_NIVEL", serializeAs: "level" })
  public level: number;

  @column({ columnName: "ARI_RIESGO_RELACIONADO", serializeAs: "risk" })
  public risk: number;

  @column({ columnName: "ARI_TIPO_RIESGO", serializeAs: "typeRisk" })
  public typeRisk: number;

  @column({ columnName: "ARI_DESCRIPCION_RIESGO", serializeAs: "descriptionRisk" })
  public descriptionRisk: string;

  @column({ columnName: "ARI_PROBABILIDAD", serializeAs: "probability" })
  public probability: number;

  @column({ columnName: "ARI_IMPACTO", serializeAs: "impact" })
  public impact: number;

  @column({ columnName: "ARI_EFECTOS", serializeAs: "effects" })
  public effects: string;

  @column({ columnName: "ARI_MEDIDAS_MITIGACION", serializeAs: "mitigation" })
  public mitigation: string;

  @column({ columnName: "ARI_CODPRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;

}
