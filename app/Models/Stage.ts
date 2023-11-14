import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Stage extends BaseModel {
    public static table = "LET_ETAPA";

    @column({ isPrimary: true, columnName: "LET_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LET_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "LET_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "LET_ORDEN", serializeAs: "order" })
    public order: number;
}