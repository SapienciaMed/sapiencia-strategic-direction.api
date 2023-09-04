import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class RisksTypes extends BaseModel {
    public static table = "TRI_TIPO_RIESGOS";

    @column({ isPrimary: true, columnName: "TRI_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "TRI_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "TRI_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "TRI_ORDEN", serializeAs: "order" })
    public order: number;
}