import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Impacto extends BaseModel {
    public static table = "RCS_RECURSO";

    @column({ isPrimary: true, columnName: "RCS_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "RCS_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "RCS_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "RCS_ORDEN", serializeAs: "order" })
    public order: number;
}
