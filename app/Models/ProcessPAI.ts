import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Impacto extends BaseModel {
    public static table = "LDP_LISTADO_PROCESOS_PAI";

    @column({ isPrimary: true, columnName: "LDP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LDP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "LDP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "LDP_ORDEN", serializeAs: "order" })
    public order: number;
}
