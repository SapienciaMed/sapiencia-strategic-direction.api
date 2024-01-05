import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ImpactLevel extends BaseModel {
    public static table = "LDPAC_LISTA_DESCRIPCIONES_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "LDPAC_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "LDPAC_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "LDPAC_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "LDPAC_ORDEN", serializeAs: "order" })
    public order: number;
}
