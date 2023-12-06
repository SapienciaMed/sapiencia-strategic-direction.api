import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class ActionPlanStates extends BaseModel {
    public static table = "PAI_PLAN_ESTADOS";

    @column({ isPrimary: true, columnName: "PAI_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "PAI_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({
        columnName: "PAI_ACTIVO",
        serializeAs: "active",
        prepare: (val) => String(val) === "true" ? 1 : 0,
        serialize: (val) => Boolean(val)
    })
    public active: boolean;

    @column({ columnName: "PAI_ORDEN", serializeAs: "order" })
    public order: number;

}