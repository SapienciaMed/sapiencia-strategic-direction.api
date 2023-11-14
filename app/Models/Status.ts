import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Status extends BaseModel {
    public static table = "PRS_PROYECTO_ESTADOS";

    @column({ isPrimary: true, columnName: "PRS_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PRS_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "PRS_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "PRS_ORDEN", serializeAs: "order" })
    public order: number;
}