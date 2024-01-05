import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AntiCorruptionPlanComponent extends BaseModel {
    public static table = "ACPA_ACTIVIDAD_COMPONENTE_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "ACPA_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "ACPA_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ columnName: "ACPA_UUID", serializeAs: "uuid" })
    public uuid: string;

    @column({ columnName: "CPAC_UUID", serializeAs: "cpac_uuid" })
    public cpac_uuid: string;

    @column({ columnName: "PAC_CODIGO", serializeAs: "pac_id" })
    public pac_id: number;
}
