import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Impacto extends BaseModel {
    public static table = "FFI_FUENTE_FINANCIACION";

    @column({ isPrimary: true, columnName: "FFI_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "FFI_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "FFI_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "FFI_ORDEN", serializeAs: "order" })
    public order: number;
}
