import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class VulnerablePopulation extends BaseModel {
    public static table = "POV_POBLACION_VULNERABLE";

    @column({ isPrimary: true, columnName: "POV_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "POV_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "POV_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "POV_ORDEN", serializeAs: "order" })
    public order: number;
}