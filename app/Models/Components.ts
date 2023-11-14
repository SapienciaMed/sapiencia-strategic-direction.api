import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Components extends BaseModel {
    public static table = "CMP_COMPONENTE";

    @column({ isPrimary: true, columnName: "CMP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "CMP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "CMP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "CMP_ORDEN", serializeAs: "order" })
    public order: number;
}