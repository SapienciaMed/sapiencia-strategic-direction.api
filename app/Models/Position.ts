import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Position extends BaseModel {
    public static table = "POS_POSICION";

    @column({ isPrimary: true, columnName: "POS_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "POS_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "POS_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "POS_ORDEN", serializeAs: "order" })
    public order: number;
}