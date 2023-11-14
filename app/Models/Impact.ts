import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Impacto extends BaseModel {
    public static table = "IMP_IMPACTO";

    @column({ isPrimary: true, columnName: "IMP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "IMP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "IMP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "IMP_ORDEN", serializeAs: "order" })
    public order: number;
}
