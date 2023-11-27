import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Projects from "./Projects";

export default class HistoricalProjects extends BaseModel {
    public static table = "HPR_HISTORICO_PROYECTOS";

    @column({ isPrimary: true, columnName: "HPR_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "HPR_CODPRY_PROYECTO", serializeAs: "idProject" })
    public idProject: number;

    @column({ columnName: "HPR_VERSION", serializeAs: "version" })
    public version: string;

    @column({ columnName: "HPR_JSON", serializeAs: "json" })
    public json: string;

    @column({ columnName: "HPR_USUARIO", serializeAs: "userCreate" })
    public userCreate: string;

    @column.dateTime({
        autoCreate: true,
        columnName: "HPR_FECHA_CREO",
        serializeAs: "dateCreate",
    })
    public dateCreate: DateTime;

    @belongsTo(() => Projects, {
        localKey: 'id',
        foreignKey: 'idProject',
      })
    public project: BelongsTo<typeof Projects>;
}
