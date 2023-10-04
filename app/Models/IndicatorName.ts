import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class IndicatorName extends BaseModel {
    public static table = "NID_NOMBRE_INDICADOR";

    @column({ isPrimary: true, columnName: "NID_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "NID_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "NID_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "NID_ORDEN", serializeAs: "order" })
    public order: number;
}