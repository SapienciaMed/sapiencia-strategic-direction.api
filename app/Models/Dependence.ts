import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Dependence extends BaseModel {
    public static table = "DEP_DEPENDENCIA";

    @column({ isPrimary: true, columnName: "DEP_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "DEP_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "DEP_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "DEP_ORDEN", serializeAs: "order" })
    public order: number;
}