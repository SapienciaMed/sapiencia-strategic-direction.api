import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ImpactLevel extends BaseModel {
    public static table = "NMP_NIVEL_IMPACTO";

    @column({ isPrimary: true, columnName: "TMP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "TMP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "TMP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "TMP_ORDEN", serializeAs: "order" })
    public order: number;
}