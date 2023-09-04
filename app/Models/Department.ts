import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Department extends BaseModel {
    public static table = "DPA_DEPARTAMENTO";

    @column({ isPrimary: true, columnName: "DPA_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "DPA_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "DPA_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "DPA_ORDEN", serializeAs: "order" })
    public order: number;
}