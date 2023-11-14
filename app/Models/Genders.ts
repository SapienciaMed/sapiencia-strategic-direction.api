import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Genders extends BaseModel {
    public static table = "GEN_GENEROS";

    @column({ isPrimary: true, columnName: "GEN_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "GEN_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "GEN_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "GEN_ORDEN", serializeAs: "order" })
    public order: number;
}