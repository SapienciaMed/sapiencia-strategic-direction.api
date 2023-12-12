import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AntiCorruptionPlanStatus extends BaseModel {
    public static table = "EPA_ESTADOS_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "EPA_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "EPA_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "EPA_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "EPA_ORDEN", serializeAs: "order" })
    public order: number;

}
