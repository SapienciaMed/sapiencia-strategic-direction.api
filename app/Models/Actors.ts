import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import Projects from "./Projects";

export default class Actors extends BaseModel {
  public static table = "ACP_ACTORES_PARTICIPANTES";

  @column({ isPrimary: true, columnName: "ACP_CODIGO", serializeAs: "id" })
  public id: number;

  @column({ columnName: "ACP_ACTOR", serializeAs: "actor" })
  public actor: string;

  @column({ columnName: "ACP_INTERES_EXPECTATIVA", serializeAs: "expectation" })
  public expectation: string;

  @column({ columnName: "ACP_CODPOS_POSICION", serializeAs: "position" })
  public position: number;

  @column({ columnName: "ACP_CONTRIBUICION", serializeAs: "contribution" })
  public contribution: string;

  @column({ columnName: "ACP_CODPRY_PRY_PROYECTO", serializeAs: "idProject" })
  public idProject: number;

  @belongsTo(() => Projects, {
    localKey: 'id',
    foreignKey: 'idProject',
  })
  public project: BelongsTo<typeof Projects>;
}
