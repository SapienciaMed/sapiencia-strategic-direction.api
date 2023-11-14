import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";

export default class Classifications extends BaseModel {
  public static table = "ACL_AÑADIR_CLASIFICACION";

  @column({ isPrimary: true, columnName: "ACL_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ACL_CODPRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @column({ columnName: "ACL_CLASIFICASION", serializeAs: "clasification" })
  public clasification: number;

  @column({ columnName: "ACL_DETALLE", serializeAs: "detail" })
  public detail: number;

  @column({ columnName: "ACL_NUMERO_PERSONAS", serializeAs: "numPerson" })
  public numPerson: number;

  @column({ columnName: "ACL_INFORMACION", serializeAs: "infoSource" })
  public infoSource: string;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;
}
