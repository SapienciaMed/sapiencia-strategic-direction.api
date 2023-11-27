import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class PAIIndicatorType extends BaseModel {
    public static table = "TDI_TIPO_INDICADOR_PAI";

    @column({ isPrimary: true, columnName: "TDI_CODIGO_PAI", serializeAs: "id" })
    public id: number;

    @column({ columnName: "TDI_DESCRIPCION_PAI", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "TDI_ACTIVO_PAI",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "TDI_ORDEN_PAI", serializeAs: "order" })
    public order: number;
}