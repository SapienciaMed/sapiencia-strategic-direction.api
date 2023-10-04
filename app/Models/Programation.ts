import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Programation extends BaseModel {
    public static table = "PRG_PROGRAMACION";

    @column({ isPrimary: true, columnName: "PRG_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PRG_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "PRG_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "PRG_ORDEN", serializeAs: "order" })
    public order: number;
}