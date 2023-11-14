import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AgeRange extends BaseModel {
    public static table = "RNG_RANGO_DE_EDAD";

    @column({ isPrimary: true, columnName: "RNG_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "RNG_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "RNG_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "RNG_ORDEN", serializeAs: "order" })
    public order: number;
}