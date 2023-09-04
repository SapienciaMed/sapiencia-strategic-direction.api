import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class IndicatorType extends BaseModel {
    public static table = "TDI_TIPO_DE_INDICADOR";

    @column({ isPrimary: true, columnName: "TDI_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "TDI_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "TDI_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "TDI_ORDEN", serializeAs: "order" })
    public order: number;
}