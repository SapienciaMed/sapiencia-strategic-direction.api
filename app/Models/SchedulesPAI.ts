import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";

export default class SchedulesPAI extends BaseModel {
    public static table = "SHP_CRONOGRAMAS_PAI";

    @column({ isPrimary: true, columnName: "SHP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "SHP_ROL", serializeAs: "idRol" })
    public idRol: number;

    @column({ columnName: "SHP_CODSCS_ESTADO", serializeAs: "idStatus" })
    public idStatus: number;

    @column({ columnName: "SHP_BIMESTRE", serializeAs: "bimester" })
    public bimester: number;

    @column.date({
        columnName: "SHP_FECHA_INICIO",
        serializeAs: "startDate",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
        serialize: (value: DateTime) => {
            return value ? value.setLocale("zh").toFormat("yyyy/MM/dd") : value;
        },
    })
    public startDate: DateTime;

    @column.date({
        columnName: "SHP_FECHA_FINAL",
        serializeAs: "endDate",
        prepare: (value: DateTime) => new Date(value?.toJSDate()),
        serialize: (value: DateTime) => {
            return value ? value.setLocale("zh").toFormat("yyyy/MM/dd") : value;
        },
    })
    public endDate: DateTime;

    @column({ columnName: "SHP_USUARIO", serializeAs: "userCreate" })
    public userCreate: string;

    @column.dateTime({
        autoCreate: true,
        columnName: "SHP_FECHA_CREO",
        serializeAs: "dateCreate",
    })
    public dateCreate: DateTime;
}