import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Impacto extends BaseModel {
    public static table = "LDR_LISTADO_RIESGOS_PAI";

    @column({ isPrimary: true, columnName: "LDR_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LDR_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "LDR_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "LDR_ORDEN", serializeAs: "order" })
    public order: number;
}
