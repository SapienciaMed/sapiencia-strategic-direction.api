import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class StrategicLine extends BaseModel {
    public static table = "LNE_LINEA_ESTRATEGICA";

    @column({ isPrimary: true, columnName: "LNE_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LNE_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "LNE_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "LNE_ORDEN", serializeAs: "order" })
    public order: number;
}