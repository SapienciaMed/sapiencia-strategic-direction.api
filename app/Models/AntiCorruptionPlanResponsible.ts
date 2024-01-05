import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class AntiCorruptionPlanComponent extends BaseModel {
    public static table = "RPA_RESPONSABLE_PLAN_ANTICORRUPCION";

    @column({ isPrimary: true, columnName: "RPA_CODIGO", serializeAs: "id" })
    public id: number;

    @column({ columnName: "RPA_DESCRIPCION", serializeAs: "description" })
    public description: string;

    @column({ columnName: "RPA_UUID", serializeAs: "uuid" })
    public uuid: string;

    @column({ columnName: "IPA_UUID", serializeAs: "ipa_uuid" })
    public ipa_uuid: string;

    @column({ columnName: "PAC_CODIGO", serializeAs: "pac_id" })
    public pac_id: number;
}