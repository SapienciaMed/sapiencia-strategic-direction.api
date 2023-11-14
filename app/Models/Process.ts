import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Process extends BaseModel {
    public static table = "PRC_PROCESOS";

    @column({ isPrimary: true, columnName: "PRC_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PRC_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "PRC_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "PRC_ORDEN", serializeAs: "order" })
    public order: number;
}