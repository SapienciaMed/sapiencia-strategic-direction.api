import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";

export default class EnvironmentalEffects extends BaseModel {
  public static table = "LEA_EFECTOS_AMBIENTALES";

  @column({ isPrimary: true, columnName: "LEA_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "LEA_CODTMP_TIPO_IMPACTO", serializeAs: "type" })
  public type: number;

  @column({ columnName: "LEA_IMPACTO", serializeAs: "impact" })
  public impact: string;

  @column({ columnName: "LEA_CODNMP_NIVEL_IMPACTO", serializeAs: "level" })
  public level: number;

  @column({ columnName: "LEA_CODCPM_CLASIFICACION_IMPACTO", serializeAs: "classification" })
  public classification: number;

  @column({ columnName: "LEA_MEDIDAS_MITIGACION", serializeAs: "measures" })
  public measures: string;

  @column({ columnName: "LEA_CODPRY_PRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;
}
