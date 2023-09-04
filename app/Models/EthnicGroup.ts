import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class EthnicGroup extends BaseModel {
    public static table = "GRP_GRUPO_ETNICO";

    @column({ isPrimary: true, columnName: "GPR_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "GPR_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "GPR_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "GPR_ORDEN", serializeAs: "order" })
    public order: number;
}