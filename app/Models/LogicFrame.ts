import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";


export default class logicFrame extends BaseModel {

  public static table = "MLO_MARCO_LOGICO";

  @column({ isPrimary: true, columnName: "MLO_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "MLO_RESUMEN_NARRATIVO", serializeAs: "resume" })
  public resume: number;

  @column({ columnName: "MLO_DESCRIPCION", serializeAs: "description" })
  public description: string;

  @column({ columnName: "MLO_CODIDC_NOMBRE_INDICADOR", serializeAs: "indicator" })
  public indicator: number;

  @column({ columnName: "MLO_META_INDICADOR", serializeAs: "meta" })
  public meta: number;

  @column({ columnName: "MLO_FUENTE_VERIFICACION", serializeAs: "sourceVerification" })
  public sourceVerification: string;

  @column({ columnName: "MLO_SUPUESTO", serializeAs: "assumptions" })
  public assumptions: string;

  @column({ columnName: "MLO_CODPRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @column({ columnName: "MLO_TIPO_INDICADOR", serializeAs: "type" })
  public type: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;
}
