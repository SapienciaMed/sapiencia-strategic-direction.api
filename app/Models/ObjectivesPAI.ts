import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Impacto extends BaseModel {
    public static table = "LDO_LISTADO_OBJETIVOS_PAI";

    @column({ isPrimary: true, columnName: "LDO_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LDO_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "LDO_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "LDO_ORDEN", serializeAs: "order" })
    public order: number;
}
