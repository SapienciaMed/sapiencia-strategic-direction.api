import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class IndicatorsComponent extends BaseModel {
    public static table = "COM_COMPONENTE";

    @column({ isPrimary: true, columnName: "COM_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "COM_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "COM_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "COM_ORDEN", serializeAs: "order" })
    public order: number;
}