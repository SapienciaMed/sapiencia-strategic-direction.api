import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";



export default class EntitysFinancing extends BaseModel {
  public static table = "ENT_ENTIDAD";

  @column({ isPrimary: true, columnName: "ENT_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ENT_ETAPA", serializeAs: "stage" })
  public stage: number;

  @column({ columnName: "ENT_TIPO_ENTIDAD", serializeAs: "typeEntity" })
  public typeEntity: number;

  @column({ columnName: "ENT_TIPO_RECURSO", serializeAs: "resource" })
  public resource: number;

  @column({ columnName: "ENT_ENTIDAD", serializeAs: "entity" })
  public entity: string;

  @column({ columnName: "ENT_AÑO_0", serializeAs: "year0" })
  public year0: number;

  @column({ columnName: "ENT_AÑO_1", serializeAs: "year1" })
  public year1: number;

  @column({ columnName: "ENT_AÑO_2", serializeAs: "year2" })
  public year2: number;

  @column({ columnName: "ENT_AÑO_3", serializeAs: "year3" })
  public year3: number;

  @column({ columnName: "ENT_AÑO_4", serializeAs: "year4" })
  public year4: number;

  @column({ columnName: "ENT_CODPRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;

}
