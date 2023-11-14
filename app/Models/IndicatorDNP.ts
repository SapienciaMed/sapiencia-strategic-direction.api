import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class IndicatorDNP extends BaseModel {
    public static table = "DNP_INDICADOR_DNP";

    @column({ isPrimary: true, columnName: "DNP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "DNP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "DNP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "DNP_ORDEN", serializeAs: "order" })
    public order: number;
}