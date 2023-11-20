import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ScheduleStatuses extends BaseModel {
    public static table = "SCS_ESTADOS_CRONOGRAMAS";

    @column({ isPrimary: true, columnName: "SCS_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "SCS_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "SCS_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "SCS_ORDEN", serializeAs: "order" })
    public order: number;
}