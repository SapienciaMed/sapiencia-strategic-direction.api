import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Probability extends BaseModel {
    public static table = "PRO_PROBABILIDAD";

    @column({ isPrimary: true, columnName: "PRO_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PRO_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "PRO_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "PRO_ORDEN", serializeAs: "order" })
    public order: number;
}