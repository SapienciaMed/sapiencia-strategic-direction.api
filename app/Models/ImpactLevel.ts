import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ImpactLevel extends BaseModel {
    public static table = "NMP_NIVEL_IMPACTO";

    @column({ isPrimary: true, columnName: "NMP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "NMP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "NMP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "NMP_ORDEN", serializeAs: "order" })
    public order: number;
}
