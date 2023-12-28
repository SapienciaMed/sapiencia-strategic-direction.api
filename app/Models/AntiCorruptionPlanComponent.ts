import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AntiCorruptionPlanComponent extends BaseModel {
    public static table = "CPAC_COMPONENTE_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "CPAC_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "CPAC_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ isPrimary: true, columnName: "PAC_CODIGO", serializeAs: "pac_id" })
    public pac_id: number;
}
