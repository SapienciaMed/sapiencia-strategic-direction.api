import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class MeasurentCapacity extends BaseModel {
    public static table = "UMC_UNIDAD_MEDIDA_CAPACIDAD";

    @column({ isPrimary: true, columnName: "UMC_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "UMC_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "UMC_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "UMC_ORDEN", serializeAs: "order" })
    public order: number;
}