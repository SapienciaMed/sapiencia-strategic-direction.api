import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Municipality extends BaseModel {
    public static table = "MUN_MUNICIPIO";

    @column({ isPrimary: true, columnName: "MUN_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "MUN_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "MUN_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "MUN_ORDEN", serializeAs: "order" })
    public order: number;
}